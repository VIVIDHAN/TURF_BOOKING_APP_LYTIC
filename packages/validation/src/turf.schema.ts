import { z } from 'zod';
import { SportType, SurfaceType } from '@turf/shared-types';

export const createVenueSchema = z.object({
  name: z.string().min(3, 'Venue name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  address: z.string().min(5),
  city: z.string().min(2),
  state: z.string().min(2),
  postalCode: z.string().regex(/^\d{6}$/, 'Enter a valid 6-digit postal code'),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  contactPhone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit phone number'),
  contactEmail: z.string().email(),
  rules: z.string().optional(),
  facilityIds: z.array(z.string()).optional(),
});

export const createGroundSchema = z.object({
  venueId: z.string().uuid(),
  name: z.string().min(2, 'Ground name is required'),
  sports: z.array(z.nativeEnum(SportType)).min(1, 'Select at least one sport'),
  surfaceType: z.nativeEnum(SurfaceType),
  dimensions: z.string().optional(),
  capacity: z.number().int().positive().optional(),
  hourlyPrice: z.number().positive('Hourly price must be positive'),
  peakHourPrice: z.number().positive().optional(),
  slotDurationMinutes: z.number().int().min(30).max(180).default(60),
});

export const turfQuerySchema = z.object({
  city: z.string().optional(),
  sport: z.nativeEnum(SportType).optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(10),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
  maxDistanceKm: z.coerce.number().optional(),
});

export type CreateVenueInput = z.infer<typeof createVenueSchema>;
export type CreateGroundInput = z.infer<typeof createGroundSchema>;
export type TurfQueryInput = z.infer<typeof turfQuerySchema>;
