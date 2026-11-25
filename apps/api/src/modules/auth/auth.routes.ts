import { Router } from 'express';
import { authController } from './auth.controller';
import { validateBody } from '../../middleware/validate.middleware';
import { authenticate } from '../../middleware/auth.middleware';
import { registerSchema, loginSchema } from '@turf/validation';

export const authRouter = Router();

authRouter.post('/register', validateBody(registerSchema), (req, res, next) =>
  authController.register(req, res, next),
);

authRouter.post('/login', validateBody(loginSchema), (req, res, next) =>
  authController.login(req, res, next),
);

authRouter.get('/me', authenticate, (req, res, next) =>
  authController.me(req, res, next),
);
