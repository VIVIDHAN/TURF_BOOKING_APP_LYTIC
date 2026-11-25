import { Request, Response, NextFunction } from 'express';
import { availabilityService } from './availability.service';
import { sendSuccess } from '../../utils/response';

export class AvailabilityController {
  async getAvailability(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { groundId, date } = req.query as { groundId: string; date: string };
      const slots = await availabilityService.getAvailability(groundId, date);
      sendSuccess(res, { groundId, date, slots });
    } catch (error) {
      next(error);
    }
  }
}

export const availabilityController = new AvailabilityController();
