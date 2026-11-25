import { Request, Response, NextFunction } from 'express';
import { notificationsService } from './notifications.service';
import { sendSuccess } from '../../utils/response';

export class NotificationsController {
  async listUserNotifications(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const list = await notificationsService.listUserNotifications(req.user!.userId);
      sendSuccess(res, list);
    } catch (error) {
      next(error);
    }
  }

  async markAsRead(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await notificationsService.markAsRead(req.user!.userId, req.params.id as string);
      sendSuccess(res, null, 'Marked as read');
    } catch (error) {
      next(error);
    }
  }
}

export const notificationsController = new NotificationsController();
