import { Request, Response, NextFunction } from 'express';
import { ownersService } from './owners.service';
import { sendSuccess } from '../../utils/response';

export class OwnersController {
  async getDashboard(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const stats = await ownersService.getOwnerDashboard(req.user!.userId);
      sendSuccess(res, stats);
    } catch (error) {
      next(error);
    }
  }
}

export const ownersController = new OwnersController();
