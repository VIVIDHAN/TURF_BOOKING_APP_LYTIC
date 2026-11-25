import { Request, Response, NextFunction } from 'express';
import { bookingsService } from './bookings.service';
import { sendSuccess } from '../../utils/response';

export class BookingsController {
  async holdSlot(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const hold = await bookingsService.holdSlot(req.user!.userId, req.body);
      sendSuccess(res, hold, 'Slot held successfully', 201);
    } catch (error) {
      next(error);
    }
  }

  async createBooking(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const booking = await bookingsService.createBooking(req.user!.userId, req.body);
      sendSuccess(res, booking, 'Booking created. Proceed to payment.', 201);
    } catch (error) {
      next(error);
    }
  }

  async listUserBookings(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const bookings = await bookingsService.listUserBookings(req.user!.userId);
      sendSuccess(res, bookings);
    } catch (error) {
      next(error);
    }
  }

  async cancelBooking(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const cancelled = await bookingsService.cancelBooking(req.user!.userId, req.params.id as string, req.body);
      sendSuccess(res, cancelled, 'Booking cancelled successfully');
    } catch (error) {
      next(error);
    }
  }
}

export const bookingsController = new BookingsController();
