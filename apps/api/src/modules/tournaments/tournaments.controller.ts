import { Request, Response, NextFunction } from 'express';
import { tournamentsService } from './tournaments.service';
import { sendSuccess } from '../../utils/response';

export class TournamentsController {
  async listTournaments(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const list = await tournamentsService.listTournaments();
      sendSuccess(res, list);
    } catch (error) {
      next(error);
    }
  }

  async getTournamentById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const tournament = await tournamentsService.getTournamentById(req.params.id as string);
      sendSuccess(res, tournament);
    } catch (error) {
      next(error);
    }
  }
}

export const tournamentsController = new TournamentsController();
