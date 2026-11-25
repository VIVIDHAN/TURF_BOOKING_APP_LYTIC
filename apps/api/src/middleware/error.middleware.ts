import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): void => {
  // eslint-disable-next-line no-console
  console.error('[Error Middleware]:', err);

  const statusCode = (err as any).statusCode || 500;
  const message = err.message || 'Internal Server Error';
  const code = (err as any).code || 'INTERNAL_SERVER_ERROR';

  sendError(res, message, statusCode, code);
};
