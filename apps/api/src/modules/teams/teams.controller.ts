import { Request, Response, NextFunction } from 'express';
import { teamsService } from './teams.service';
import { sendSuccess } from '../../utils/response';

export class TeamsController {
  async listUserTeams(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const teams = await teamsService.listUserTeams(req.user!.userId);
      sendSuccess(res, teams);
    } catch (error) {
      next(error);
    }
  }

  async createTeam(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, contactPhone } = req.body;
      const team = await teamsService.createTeam(req.user!.userId, name, contactPhone);
      sendSuccess(res, team, 'Team created successfully', 201);
    } catch (error) {
      next(error);
    }
  }
}

export const teamsController = new TeamsController();
