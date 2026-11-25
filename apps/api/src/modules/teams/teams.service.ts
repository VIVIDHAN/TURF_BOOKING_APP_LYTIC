import { prisma } from '../../config/prisma';

export class TeamsService {
  async listUserTeams(userId: string) {
    return prisma.team.findMany({
      where: {
        OR: [
          { captainId: userId },
          { members: { some: { userId } } },
        ],
      },
      include: {
        members: { include: { user: { select: { fullName: true, avatarUrl: true } } } },
      },
    });
  }

  async createTeam(captainId: string, name: string, contactPhone: string) {
    return prisma.team.create({
      data: {
        name,
        captainId,
        contactPhone,
        members: {
          create: {
            userId: captainId,
            role: 'CAPTAIN',
          },
        },
      },
    });
  }
}

export const teamsService = new TeamsService();
