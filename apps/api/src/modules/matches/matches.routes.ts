import { Router } from 'express';
import { matchesController } from './matches.controller';

export const matchesRouter = Router();

matchesRouter.get('/:id', (req, res, next) => matchesController.getMatchById(req, res, next));
