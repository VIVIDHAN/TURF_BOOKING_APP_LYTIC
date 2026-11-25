import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { env } from './config/env';
import { v1Router } from './routes';
import { errorHandler } from './middleware/error.middleware';

export const createApp = (): Application => {
  const app = express();

  // Security & HTTP Middleware
  app.use(helmet());
  app.use(
    cors({
      origin: env.CORS_ORIGIN,
      credentials: true,
    }),
  );

  // Rate Limiting (100 requests per 15 minutes per IP in production)
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, error: { code: 'RATE_LIMIT_EXCEEDED', message: 'Too many requests, please try again later.' } },
  });
  app.use(limiter);

  // Body Parsing & Logging
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  if (env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
  }

  // Health Check Endpoint
  app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'FindMyTurf API',
      version: '1.0.0',
    });
  });

  // Mount Versioned API Routes
  app.use(env.API_PREFIX, v1Router);

  // Centralized Error Handling Middleware
  app.use(errorHandler);

  return app;
};
