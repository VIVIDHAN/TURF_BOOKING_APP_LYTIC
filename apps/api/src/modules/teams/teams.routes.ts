import { Router } from 'express';
import { teamsController } from './teams.controller';
import { authenticate } from '../../middleware/auth.middleware';

export const teamsRouter = Router();

teamsRouter.use(authenticate);

teamsRouter.get('/my', (req, res, next) => teamsController.listUserTeams(req, res, next));
teamsRouter.post('/', (req, res, next) => teamsController.createTeam(req, res, next));
