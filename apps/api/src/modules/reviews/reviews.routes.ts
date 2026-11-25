import { Router } from 'express';
import { reviewsController } from './reviews.controller';
import { authenticate } from '../../middleware/auth.middleware';

export const reviewsRouter = Router();

reviewsRouter.get('/venue/:venueId', (req, res, next) =>
  reviewsController.getVenueReviews(req, res, next),
);

reviewsRouter.post('/', authenticate, (req, res, next) =>
  reviewsController.createReview(req, res, next),
);
