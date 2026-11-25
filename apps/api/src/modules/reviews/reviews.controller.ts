import { Request, Response, NextFunction } from 'express';
import { reviewsService } from './reviews.service';
import { sendSuccess } from '../../utils/response';

export class ReviewsController {
  async createReview(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const review = await reviewsService.createReview(req.user!.userId, req.body);
      sendSuccess(res, review, 'Review submitted successfully', 201);
    } catch (error) {
      next(error);
    }
  }

  async getVenueReviews(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const reviews = await reviewsService.getVenueReviews(req.params.venueId as string);
      sendSuccess(res, reviews);
    } catch (error) {
      next(error);
    }
  }
}

export const reviewsController = new ReviewsController();
