import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const env = {
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_PREFIX: process.env.API_PREFIX || '/api/v1',
  CORS_ORIGIN: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000', 'http://localhost:5173'],
  DATABASE_URL: process.env.DATABASE_URL || '',
  JWT: {
    ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'default-access-secret-do-not-use-in-prod',
    REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'default-refresh-secret-do-not-use-in-prod',
    ACCESS_EXPIRATION: process.env.JWT_ACCESS_EXPIRATION || '15m',
    REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION || '7d',
  },
  RAZORPAY: {
    KEY_ID: process.env.RAZORPAY_KEY_ID || '',
    KEY_SECRET: process.env.RAZORPAY_KEY_SECRET || '',
    WEBHOOK_SECRET: process.env.RAZORPAY_WEBHOOK_SECRET || '',
  },
};
