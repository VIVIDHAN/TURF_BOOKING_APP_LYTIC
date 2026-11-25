import { prisma } from '../../config/prisma';

export class MatchesService {
  async getMatchById(id: string) {
    const match = await prisma.match.findUnique({
      where: { id },
      include: {
        tournament: true,
        ground: { include: { venue: true } },
        teamA: true,
        teamB: true,
        winnerTeam: true,
      },
    });

    if (!match) {
      throw { statusCode: 404, message: 'Match not found', code: 'MATCH_NOT_FOUND' };
    }

    return match;
  }
}

export const matchesService = new MatchesService();
