import { prisma } from '../../config/prisma';

export class FacilitiesService {
  async listAll() {
    return prisma.facility.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async create(name: string, iconName: string) {
    return prisma.facility.create({
      data: { name, iconName },
    });
  }
}

export const facilitiesService = new FacilitiesService();
