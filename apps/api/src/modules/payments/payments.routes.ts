import { Router } from 'express';
import { paymentsController } from './payments.controller';
import { authenticate } from '../../middleware/auth.middleware';
import { validateBody } from '../../middleware/validate.middleware';
import { initiatePaymentSchema, verifyPaymentSchema } from '@turf/validation';

export const paymentsRouter = Router();

paymentsRouter.use(authenticate);

paymentsRouter.post('/initiate', validateBody(initiatePaymentSchema), (req, res, next) =>
  paymentsController.initiate(req, res, next),
);

paymentsRouter.post('/verify', validateBody(verifyPaymentSchema), (req, res, next) =>
  paymentsController.verify(req, res, next),
);
