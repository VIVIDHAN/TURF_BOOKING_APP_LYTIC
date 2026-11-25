import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { sendError } from '../utils/response';
import { UserRole } from '@turf/shared-types';

export interface AuthUserPayload {
  userId: string;
  email: string;
  role: UserRole;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUserPayload;
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    sendError(res, 'Authentication required. Missing or malformed token.', 401, 'UNAUTHORIZED');
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, env.JWT.ACCESS_SECRET) as AuthUserPayload;
    req.user = decoded;
    next();
  } catch (error) {
    sendError(res, 'Invalid or expired token', 401, 'TOKEN_EXPIRED');
  }
};
