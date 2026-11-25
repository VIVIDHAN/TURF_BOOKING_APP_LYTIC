import { Request, Response, NextFunction } from 'express';
import { playerStatsService } from './player-stats.service';
import { sendSuccess } from '../../utils/response';

export class PlayerStatsController {
  async getPlayerStats(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const stats = await playerStatsService.getPlayerStats(req.params.userId as string);
      sendSuccess(res, stats);
    } catch (error) {
      next(error);
    }
  }

  async getLeaderboard(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const leaderboard = await playerStatsService.getLeaderboard(req.params.sport as string);
      sendSuccess(res, leaderboard);
    } catch (error) {
      next(error);
    }
  }
}

export const playerStatsController = new PlayerStatsController();
