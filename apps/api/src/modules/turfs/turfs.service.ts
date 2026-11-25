import { prisma } from '../../config/prisma';
import { CreateVenueInput, CreateGroundInput, TurfQueryInput } from '@turf/validation';

export class TurfsService {
  async listVenues(query: TurfQueryInput) {
    const { city, sport, search, page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const where: any = {
      isActive: true,
      approvalStatus: 'APPROVED',
    };

    if (city) {
      where.city = { equals: city, mode: 'insensitive' };
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { address: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (sport) {
      where.grounds = {
        some: {
          sports: { has: sport },
          isActive: true,
        },
      };
    }

    const [total, venues] = await Promise.all([
      prisma.turfVenue.count({ where }),
      prisma.turfVenue.findMany({
        where,
        skip,
        take: limit,
        include: {
          images: {
            orderBy: { order: 'asc' },
            take: 3,
          },
          grounds: {
            where: { isActive: true },
            select: {
              id: true,
              name: true,
              sports: true,
              surfaceType: true,
              hourlyPrice: true,
            },
          },
          facilities: {
            include: { facility: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      venues: venues.map((v) => {
        const prices = v.grounds.map((g) => Number(g.hourlyPrice));
        const startingPrice = prices.length ? Math.min(...prices) : 0;
        return {
          ...v,
          startingPrice,
        };
      }),
      meta: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  }

  async getVenueById(id: string) {
    const venue = await prisma.turfVenue.findUnique({
      where: { id },
      include: {
        images: { orderBy: { order: 'asc' } },
        grounds: { where: { isActive: true } },
        operatingHours: { orderBy: { dayOfWeek: 'asc' } },
        facilities: { include: { facility: true } },
        reviews: {
          take: 5,
          orderBy: { createdAt: 'desc' },
          include: {
            user: { select: { fullName: true, avatarUrl: true } },
          },
        },
      },
    });

    if (!venue) {
      throw { statusCode: 404, message: 'Turf venue not found', code: 'VENUE_NOT_FOUND' };
    }

    return venue;
  }

  async createVenue(userId: string, input: CreateVenueInput) {
    const owner = await prisma.ownerProfile.findUnique({
      where: { userId },
    });

    if (!owner) {
      throw { statusCode: 403, message: 'Only registered owners can create a venue', code: 'NOT_OWNER' };
    }

    const slug = `${input.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString(36)}`;

    return prisma.turfVenue.create({
      data: {
        ownerId: owner.id,
        name: input.name,
        slug,
        description: input.description,
        address: input.address,
        city: input.city,
        state: input.state,
        postalCode: input.postalCode,
        latitude: input.latitude,
        longitude: input.longitude,
        contactPhone: input.contactPhone,
        contactEmail: input.contactEmail,
        rules: input.rules,
        approvalStatus: 'PENDING',
      },
    });
  }

  async addGround(userId: string, input: CreateGroundInput) {
    const venue = await prisma.turfVenue.findUnique({
      where: { id: input.venueId },
      include: { owner: true },
    });

    if (!venue) {
      throw { statusCode: 404, message: 'Venue not found', code: 'VENUE_NOT_FOUND' };
    }

    if (venue.owner.userId !== userId) {
      throw { statusCode: 403, message: 'Not authorized to add grounds to this venue', code: 'FORBIDDEN' };
    }

    return prisma.turfGround.create({
      data: {
        venueId: input.venueId,
        name: input.name,
        sports: input.sports as any,
        surfaceType: input.surfaceType as any,
        dimensions: input.dimensions,
        capacity: input.capacity,
        hourlyPrice: input.hourlyPrice,
        peakHourPrice: input.peakHourPrice,
        slotDurationMinutes: input.slotDurationMinutes,
      },
    });
  }
}

export const turfsService = new TurfsService();
