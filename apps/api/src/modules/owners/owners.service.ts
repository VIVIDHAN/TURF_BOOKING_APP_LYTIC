import { prisma } from '../../config/prisma';

export class OwnersService {
  async getOwnerDashboard(userId: string) {
    const owner = await prisma.ownerProfile.findUnique({
      where: { userId },
      include: {
        venues: {
          include: {
            grounds: true,
          },
        },
      },
    });

    if (!owner) {
      throw { statusCode: 404, message: 'Owner profile not found', code: 'OWNER_NOT_FOUND' };
    }

    const venueIds = owner.venues.map((v) => v.id);
    const groundIds = owner.venues.flatMap((v) => v.grounds.map((g) => g.id));

    const totalBookings = await prisma.booking.count({
      where: { groundId: { in: groundIds } },
    });

    const confirmedBookings = await prisma.booking.findMany({
      where: {
        groundId: { in: groundIds },
        status: 'CONFIRMED',
      },
      select: { finalAmount: true },
    });

    const totalRevenue = confirmedBookings.reduce(
      (acc, curr) => acc + Number(curr.finalAmount),
      0,
    );

    return {
      owner,
      venuesCount: venueIds.length,
      groundsCount: groundIds.length,
      totalBookings,
      totalRevenue,
    };
  }
}

export const ownersService = new OwnersService();
