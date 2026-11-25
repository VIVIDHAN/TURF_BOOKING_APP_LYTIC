import { Router } from 'express';
import { playerStatsController } from './player-stats.controller';

export const playerStatsRouter = Router();

playerStatsRouter.get('/user/:userId', (req, res, next) =>
  playerStatsController.getPlayerStats(req, res, next),
);

playerStatsRouter.get('/leaderboard/:sport', (req, res, next) =>
  playerStatsController.getLeaderboard(req, res, next),
);
