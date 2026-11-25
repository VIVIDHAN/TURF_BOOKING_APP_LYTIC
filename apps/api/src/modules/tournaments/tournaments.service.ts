import { prisma } from '../../config/prisma';

export class TournamentsService {
  async listTournaments() {
    return prisma.tournament.findMany({
      include: {
        venue: { select: { name: true, city: true } },
        _count: { select: { registrations: true } },
      },
      orderBy: { startDate: 'asc' },
    });
  }

  async getTournamentById(id: string) {
    const tournament = await prisma.tournament.findUnique({
      where: { id },
      include: {
        venue: true,
        registrations: {
          include: { team: true },
        },
        matches: {
          include: { teamA: true, teamB: true, winnerTeam: true },
          orderBy: { scheduledTime: 'asc' },
        },
      },
    });

    if (!tournament) {
      throw { statusCode: 404, message: 'Tournament not found', code: 'TOURNAMENT_NOT_FOUND' };
    }

    return tournament;
  }
}

export const tournamentsService = new TournamentsService();
