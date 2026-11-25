import { Router } from 'express';
import { turfsController } from './turfs.controller';
import { authenticate } from '../../middleware/auth.middleware';
import { requireRoles } from '../../middleware/role.middleware';
import { validateBody, validate } from '../../middleware/validate.middleware';
import { createVenueSchema, createGroundSchema, turfQuerySchema } from '@turf/validation';
import { UserRole } from '@turf/shared-types';

export const turfsRouter = Router();

turfsRouter.get('/', validate(turfQuerySchema), (req, res, next) =>
  turfsController.listVenues(req, res, next),
);

turfsRouter.get('/:id', (req, res, next) =>
  turfsController.getVenueById(req, res, next),
);

turfsRouter.post(
  '/',
  authenticate,
  requireRoles(UserRole.TURF_OWNER, UserRole.PLATFORM_ADMIN, UserRole.PLATFORM_SUPER_ADMIN),
  validateBody(createVenueSchema),
  (req, res, next) => turfsController.createVenue(req, res, next),
);

turfsRouter.post(
  '/grounds',
  authenticate,
  requireRoles(UserRole.TURF_OWNER, UserRole.PLATFORM_ADMIN, UserRole.PLATFORM_SUPER_ADMIN),
  validateBody(createGroundSchema),
  (req, res, next) => turfsController.addGround(req, res, next),
);
