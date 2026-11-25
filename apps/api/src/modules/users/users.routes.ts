import { Router } from 'express';
import { usersController } from './users.controller';
import { authenticate } from '../../middleware/auth.middleware';
import { validateBody } from '../../middleware/validate.middleware';
import { updateProfileSchema } from '@turf/validation';

export const usersRouter = Router();

usersRouter.use(authenticate);

usersRouter.get('/profile', (req, res, next) => usersController.getProfile(req, res, next));
usersRouter.patch('/profile', validateBody(updateProfileSchema), (req, res, next) =>
  usersController.updateProfile(req, res, next),
);
