import { SportType, SurfaceType, TurfApprovalStatus } from './enums';

export interface Facility {
  id: string;
  name: string;
  iconName: string;
}

export interface OperatingHours {
  id: string;
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, etc.
  openTime: string; // HH:mm format e.g. "06:00"
  closeTime: string; // HH:mm format e.g. "23:00"
  isClosed: boolean;
}

export interface TurfGround {
  id: string;
  venueId: string;
  name: string; // e.g. "Pitch 1 (7-a-side)"
  sports: SportType[];
  surfaceType: SurfaceType;
  dimensions?: string | null;
  capacity?: number | null;
  hourlyPrice: number;
  peakHourPrice?: number | null;
  slotDurationMinutes: number; // e.g. 60
  isActive: boolean;
}

export interface TurfVenue {
  id: string;
  ownerId: string;
  name: string;
  slug: string;
  description: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  contactPhone: string;
  contactEmail: string;
  rules?: string | null;
  approvalStatus: TurfApprovalStatus;
  isActive: boolean;
  images: TurfImage[];
  facilities: Facility[];
  grounds: TurfGround[];
  operatingHours: OperatingHours[];
  ratingAverage: number;
  ratingCount: number;
  startingPrice?: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface TurfImage {
  id: string;
  venueId: string;
  imageUrl: string;
  isCover: boolean;
  order: number;
}
