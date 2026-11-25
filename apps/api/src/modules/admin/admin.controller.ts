import { Request, Response, NextFunction } from 'express';
import { adminService } from './admin.service';
import { sendSuccess } from '../../utils/response';

export class AdminController {
  async getStats(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const stats = await adminService.getPlatformStats();
      sendSuccess(res, stats);
    } catch (error) {
      next(error);
    }
  }

  async listUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await adminService.listUsers(req.query.role as string);
      sendSuccess(res, users);
    } catch (error) {
      next(error);
    }
  }

  async setTurfApprovalStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const updated = await adminService.setTurfApprovalStatus(
        req.user!.userId,
        req.params.venueId as string,
        req.body.status,
      );
      sendSuccess(res, updated, `Venue status updated to ${req.body.status}`);
    } catch (error) {
      next(error);
    }
  }
}

export const adminController = new AdminController();
