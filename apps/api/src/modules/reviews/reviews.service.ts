import { prisma } from '../../config/prisma';

export class ReviewsService {
  async createReview(userId: string, input: { venueId: string; bookingId?: string; rating: number; comment?: string }) {
    if (input.rating < 1 || input.rating > 5) {
      throw { statusCode: 400, message: 'Rating must be between 1 and 5', code: 'INVALID_RATING' };
    }

    return prisma.review.create({
      data: {
        userId,
        venueId: input.venueId,
        bookingId: input.bookingId,
        rating: input.rating,
        comment: input.comment,
      },
    });
  }

  async getVenueReviews(venueId: string) {
    return prisma.review.findMany({
      where: { venueId },
      include: {
        user: { select: { fullName: true, avatarUrl: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}

export const reviewsService = new ReviewsService();
