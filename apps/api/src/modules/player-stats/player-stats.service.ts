import { prisma } from '../../config/prisma';

export class PlayerStatsService {
  async getPlayerStats(userId: string) {
    return prisma.playerStats.findMany({
      where: { userId },
    });
  }

  async getLeaderboard(sport: string) {
    return prisma.playerStats.findMany({
      where: { sport: sport as any },
      include: {
        user: { select: { fullName: true, avatarUrl: true } },
      },
      orderBy: { matchesWon: 'desc' },
      take: 20,
    });
  }
}

export const playerStatsService = new PlayerStatsService();
