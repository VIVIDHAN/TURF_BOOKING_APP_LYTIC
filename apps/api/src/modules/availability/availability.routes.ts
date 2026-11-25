import { Router } from 'express';
import { availabilityController } from './availability.controller';
import { validate } from '../../middleware/validate.middleware';
import { checkAvailabilitySchema } from '@turf/validation';

export const availabilityRouter = Router();

availabilityRouter.get('/', validate(checkAvailabilitySchema), (req, res, next) =>
  availabilityController.getAvailability(req, res, next),
);
