import { Router } from 'express';
import { ownersController } from './owners.controller';
import { authenticate } from '../../middleware/auth.middleware';
import { requireRoles } from '../../middleware/role.middleware';
import { UserRole } from '@turf/shared-types';

export const ownersRouter = Router();

ownersRouter.use(authenticate, requireRoles(UserRole.TURF_OWNER, UserRole.OWNER_STAFF, UserRole.PLATFORM_ADMIN, UserRole.PLATFORM_SUPER_ADMIN));

ownersRouter.get('/dashboard', (req, res, next) => ownersController.getDashboard(req, res, next));
