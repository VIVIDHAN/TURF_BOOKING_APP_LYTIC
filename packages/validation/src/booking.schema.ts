import { z } from 'zod';

export const checkAvailabilitySchema = z.object({
  groundId: z.string().uuid(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
});

export const holdSlotSchema = z.object({
  groundId: z.string().uuid(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
});

export const createBookingSchema = z.object({
  holdId: z.string().uuid(),
  groundId: z.string().uuid(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
});

export const cancelBookingSchema = z.object({
  reason: z.string().min(5, 'Cancellation reason must be at least 5 characters'),
});

export type CheckAvailabilityInput = z.infer<typeof checkAvailabilitySchema>;
export type HoldSlotInput = z.infer<typeof holdSlotSchema>;
export type CreateBookingInput = z.infer<typeof createBookingSchema>;
export type CancelBookingInput = z.infer<typeof cancelBookingSchema>;
