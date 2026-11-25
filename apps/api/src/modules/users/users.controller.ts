import { Request, Response, NextFunction } from 'express';
import { usersService } from './users.service';
import { sendSuccess } from '../../utils/response';

export class UsersController {
  async getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const profile = await usersService.getProfile(req.user!.userId);
      sendSuccess(res, profile);
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const updated = await usersService.updateProfile(req.user!.userId, req.body);
      sendSuccess(res, updated, 'Profile updated successfully');
    } catch (error) {
      next(error);
    }
  }
}

export const usersController = new UsersController();
