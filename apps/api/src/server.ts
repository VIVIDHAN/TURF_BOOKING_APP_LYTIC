import { createApp } from './app';
import { env } from './config/env';

const app = createApp();

const server = app.listen(env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`[FindMyTurf API] Server listening on port ${env.PORT} in ${env.NODE_ENV} mode`);
  // eslint-disable-next-line no-console
  console.log(`[FindMyTurf API] Base URL: http://localhost:${env.PORT}${env.API_PREFIX}`);
  // eslint-disable-next-line no-console
  console.log(`[FindMyTurf API] Health check: http://localhost:${env.PORT}/health`);
});

// Graceful Shutdown
const handleShutdown = (signal: string) => {
  // eslint-disable-next-line no-console
  console.log(`\n[FindMyTurf API] Received ${signal}. Shutting down gracefully...`);
  server.close(() => {
    // eslint-disable-next-line no-console
    console.log('[FindMyTurf API] HTTP server closed.');
    process.exit(0);
  });
};

process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));
