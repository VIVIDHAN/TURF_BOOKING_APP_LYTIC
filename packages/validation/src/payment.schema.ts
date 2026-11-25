import { z } from 'zod';

export const initiatePaymentSchema = z.object({
  bookingId: z.string().uuid(),
});

export const verifyPaymentSchema = z.object({
  bookingId: z.string().uuid(),
  razorpayOrderId: z.string().min(1),
  razorpayPaymentId: z.string().min(1),
  razorpaySignature: z.string().min(1),
});

export type InitiatePaymentInput = z.infer<typeof initiatePaymentSchema>;
export type VerifyPaymentInput = z.infer<typeof verifyPaymentSchema>;
