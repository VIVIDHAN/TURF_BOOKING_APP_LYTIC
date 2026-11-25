import { Router } from 'express';
import { notificationsController } from './notifications.controller';
import { authenticate } from '../../middleware/auth.middleware';

export const notificationsRouter = Router();

notificationsRouter.use(authenticate);

notificationsRouter.get('/', (req, res, next) =>
  notificationsController.listUserNotifications(req, res, next),
);

notificationsRouter.patch('/:id/read', (req, res, next) =>
  notificationsController.markAsRead(req, res, next),
);
