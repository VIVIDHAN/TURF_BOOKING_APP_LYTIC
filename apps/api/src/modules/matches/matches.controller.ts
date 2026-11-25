import { Request, Response, NextFunction } from 'express';
import { matchesService } from './matches.service';
import { sendSuccess } from '../../utils/response';

export class MatchesController {
  async getMatchById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const match = await matchesService.getMatchById(req.params.id as string);
      sendSuccess(res, match);
    } catch (error) {
      next(error);
    }
  }
}

export const matchesController = new MatchesController();
