import { Request, Response, NextFunction } from 'express';
import { facilitiesService } from './facilities.service';
import { sendSuccess } from '../../utils/response';

export class FacilitiesController {
  async listAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const list = await facilitiesService.listAll();
      sendSuccess(res, list);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, iconName } = req.body;
      const created = await facilitiesService.create(name, iconName);
      sendSuccess(res, created, 'Facility created', 201);
    } catch (error) {
      next(error);
    }
  }
}

export const facilitiesController = new FacilitiesController();
