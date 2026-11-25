import { Router } from 'express';
import { bookingsController } from './bookings.controller';
import { authenticate } from '../../middleware/auth.middleware';
import { validateBody } from '../../middleware/validate.middleware';
import { holdSlotSchema, createBookingSchema, cancelBookingSchema } from '@turf/validation';

export const bookingsRouter = Router();

bookingsRouter.use(authenticate);

bookingsRouter.post('/hold', validateBody(holdSlotSchema), (req, res, next) =>
  bookingsController.holdSlot(req, res, next),
);

bookingsRouter.post('/', validateBody(createBookingSchema), (req, res, next) =>
  bookingsController.createBooking(req, res, next),
);

bookingsRouter.get('/my', (req, res, next) =>
  bookingsController.listUserBookings(req, res, next),
);

bookingsRouter.post('/:id/cancel', validateBody(cancelBookingSchema), (req, res, next) =>
  bookingsController.cancelBooking(req, res, next),
);
