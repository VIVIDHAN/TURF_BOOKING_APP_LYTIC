import { prisma } from '../../config/prisma';
import { UpdateProfileInput } from '@turf/validation';

export class UsersService {
  async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        phone: true,
        fullName: true,
        avatarUrl: true,
        role: true,
        isActive: true,
        isVerified: true,
        createdAt: true,
        ownerProfile: true,
      },
    });
    if (!user) {
      throw { statusCode: 404, message: 'User not found', code: 'USER_NOT_FOUND' };
    }
    return user;
  }

  async updateProfile(userId: string, input: UpdateProfileInput) {
    return prisma.user.update({
      where: { id: userId },
      data: input,
      select: {
        id: true,
        email: true,
        phone: true,
        fullName: true,
        avatarUrl: true,
        role: true,
        updatedAt: true,
      },
    });
  }
}

export const usersService = new UsersService();
