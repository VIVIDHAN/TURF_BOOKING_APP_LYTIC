import { Router } from 'express';
import { adminController } from './admin.controller';
import { authenticate } from '../../middleware/auth.middleware';
import { requireRoles } from '../../middleware/role.middleware';
import { UserRole } from '@turf/shared-types';

export const adminRouter = Router();

adminRouter.use(
  authenticate,
  requireRoles(UserRole.PLATFORM_ADMIN, UserRole.PLATFORM_SUPER_ADMIN),
);

adminRouter.get('/stats', (req, res, next) => adminController.getStats(req, res, next));
adminRouter.get('/users', (req, res, next) => adminController.listUsers(req, res, next));
adminRouter.patch('/venues/:venueId/approval', (req, res, next) =>
  adminController.setTurfApprovalStatus(req, res, next),
);
