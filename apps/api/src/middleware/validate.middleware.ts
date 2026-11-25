import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { sendError } from '../utils/response';

export const validate = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      if (parsed.body) req.body = parsed.body;
      if (parsed.query) req.query = parsed.query;
      if (parsed.params) req.params = parsed.params;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        sendError(
          res,
          'Validation failed',
          422,
          'VALIDATION_ERROR',
          error.errors.map((e) => ({
            field: e.path.join('.').replace(/^(body|query|params)\.?/, ''),
            message: e.message,
          })),
        );
        return;
      }
      next(error);
    }
  };
};

export const validateBody = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        sendError(
          res,
          'Validation failed',
          422,
          'VALIDATION_ERROR',
          error.errors.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        );
        return;
      }
      next(error);
    }
  };
};
