import { Request, Response, NextFunction } from 'express';
import { turfsService } from './turfs.service';
import { sendPaginated, sendSuccess } from '../../utils/response';

export class TurfsController {
  async listVenues(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await turfsService.listVenues(req.query as any);
      sendPaginated(res, result.venues, result.meta);
    } catch (error) {
      next(error);
    }
  }

  async getVenueById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const venue = await turfsService.getVenueById(req.params.id as string);
      sendSuccess(res, venue);
    } catch (error) {
      next(error);
    }
  }

  async createVenue(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const created = await turfsService.createVenue(req.user!.userId, req.body);
      sendSuccess(res, created, 'Venue created successfully', 201);
    } catch (error) {
      next(error);
    }
  }

  async addGround(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const created = await turfsService.addGround(req.user!.userId, req.body);
      sendSuccess(res, created, 'Ground added successfully', 201);
    } catch (error) {
      next(error);
    }
  }
}

export const turfsController = new TurfsController();
