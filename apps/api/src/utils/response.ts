import { Response } from 'express';
import { ApiResponse, PaginatedMeta, PaginatedResponse } from '@turf/shared-types';

export const sendSuccess = <T>(
  res: Response,
  data?: T,
  message?: string,
  statusCode = 200,
): Response => {
  const payload: ApiResponse<T> = {
    success: true,
    message,
    data,
  };
  return res.status(statusCode).json(payload);
};

export const sendPaginated = <T>(
  res: Response,
  data: T[],
  meta: PaginatedMeta,
  message?: string,
  statusCode = 200,
): Response => {
  const payload: PaginatedResponse<T> = {
    success: true,
    message,
    data,
    meta,
  };
  return res.status(statusCode).json(payload);
};

export const sendError = (
  res: Response,
  message: string,
  statusCode = 400,
  code = 'BAD_REQUEST',
  details?: unknown,
): Response => {
  const payload: ApiResponse<never> = {
    success: false,
    error: {
      code,
      message,
      details,
    },
  };
  return res.status(statusCode).json(payload);
};
