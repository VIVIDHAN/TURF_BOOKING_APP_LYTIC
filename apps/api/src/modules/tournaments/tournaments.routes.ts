import { Router } from 'express';
import { tournamentsController } from './tournaments.controller';

export const tournamentsRouter = Router();

tournamentsRouter.get('/', (req, res, next) =>
  tournamentsController.listTournaments(req, res, next),
);

tournamentsRouter.get('/:id', (req, res, next) =>
  tournamentsController.getTournamentById(req, res, next),
);
