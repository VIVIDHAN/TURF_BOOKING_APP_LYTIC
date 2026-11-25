import { UserRole } from './enums';

export interface User {
  id: string;
  email: string;
  phone: string;
  fullName: string;
  avatarUrl?: string | null;
  role: UserRole;
  isActive: boolean;
  isVerified: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface OwnerProfile {
  id: string;
  userId: string;
  businessName: string;
  businessRegistrationNumber?: string | null;
  gstNumber?: string | null;
  bankAccountNumber?: string | null;
  bankIfsc?: string | null;
  panNumber?: string | null;
  isVerified: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}
