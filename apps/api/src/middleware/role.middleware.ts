import { Request, Response, NextFunction } from 'express';
import { UserRole } from '@turf/shared-types';
import { sendError } from '../utils/response';

export const requireRoles = (...allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      sendError(res, 'Authentication required', 401, 'UNAUTHORIZED');
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      sendError(
        res,
        'Access denied. You do not have permission to perform this action.',
        403,
        'FORBIDDEN',
      );
      return;
    }

    next();
  };
};
