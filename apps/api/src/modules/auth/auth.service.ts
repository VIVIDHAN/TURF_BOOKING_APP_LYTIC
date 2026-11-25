import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../../config/prisma';
import { env } from '../../config/env';
import { RegisterInput, LoginInput } from '@turf/validation';
import { AuthResponse, UserRole } from '@turf/shared-types';

export class AuthService {
  async register(input: RegisterInput): Promise<AuthResponse> {
    const existing = await prisma.user.findFirst({
      where: {
        OR: [{ email: input.email }, { phone: input.phone }],
      },
    });

    if (existing) {
      throw { statusCode: 409, message: 'User with this email or phone already exists', code: 'USER_EXISTS' };
    }

    const passwordHash = await bcrypt.hash(input.password, 10);

    const user = await prisma.user.create({
      data: {
        fullName: input.fullName,
        email: input.email,
        phone: input.phone,
        passwordHash,
        role: input.role as any,
        isActive: true,
      },
    });

    // If role is TURF_OWNER, create basic owner profile
    if (input.role === UserRole.TURF_OWNER) {
      await prisma.ownerProfile.create({
        data: {
          userId: user.id,
          businessName: `${input.fullName}'s Sports Facility`,
        },
      });
    }

    const tokens = this.generateTokens(user.id, user.email, user.role as UserRole);

    return {
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        fullName: user.fullName,
        avatarUrl: user.avatarUrl,
        role: user.role as UserRole,
        isActive: user.isActive,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      tokens,
    };
  }

  async login(input: LoginInput): Promise<AuthResponse> {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: input.identifier }, { phone: input.identifier }],
      },
    });

    if (!user) {
      throw { statusCode: 401, message: 'Invalid credentials', code: 'INVALID_CREDENTIALS' };
    }

    if (!user.isActive) {
      throw { statusCode: 403, message: 'Account is deactivated', code: 'ACCOUNT_DEACTIVATED' };
    }

    const isValid = await bcrypt.compare(input.password, user.passwordHash);
    if (!isValid) {
      throw { statusCode: 401, message: 'Invalid credentials', code: 'INVALID_CREDENTIALS' };
    }

    const tokens = this.generateTokens(user.id, user.email, user.role as UserRole);

    return {
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        fullName: user.fullName,
        avatarUrl: user.avatarUrl,
        role: user.role as UserRole,
        isActive: user.isActive,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      tokens,
    };
  }

  generateTokens(userId: string, email: string, role: UserRole) {
    const accessToken = jwt.sign(
      { userId, email, role },
      env.JWT.ACCESS_SECRET,
      { expiresIn: env.JWT.ACCESS_EXPIRATION as any },
    );

    const refreshToken = jwt.sign(
      { userId, email, role },
      env.JWT.REFRESH_SECRET,
      { expiresIn: env.JWT.REFRESH_EXPIRATION as any },
    );

    return { accessToken, refreshToken };
  }
}

export const authService = new AuthService();
