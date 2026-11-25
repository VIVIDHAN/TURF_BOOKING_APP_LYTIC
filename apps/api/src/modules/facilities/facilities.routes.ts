import { Router } from 'express';
import { facilitiesController } from './facilities.controller';
import { authenticate } from '../../middleware/auth.middleware';
import { requireRoles } from '../../middleware/role.middleware';
import { UserRole } from '@turf/shared-types';

export const facilitiesRouter = Router();

facilitiesRouter.get('/', (req, res, next) => facilitiesController.listAll(req, res, next));
facilitiesRouter.post(
  '/',
  authenticate,
  requireRoles(UserRole.PLATFORM_ADMIN, UserRole.PLATFORM_SUPER_ADMIN),
  (req, res, next) => facilitiesController.create(req, res, next),
);
