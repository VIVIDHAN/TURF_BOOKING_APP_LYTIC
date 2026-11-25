import { PaymentMethod, PaymentStatus } from './enums';

export interface Payment {
  id: string;
  bookingId: string;
  userId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  paymentMethod?: PaymentMethod | null;
  razorpayOrderId?: string | null;
  razorpayPaymentId?: string | null;
  razorpaySignature?: string | null;
  failureReason?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Refund {
  id: string;
  paymentId: string;
  bookingId: string;
  amount: number;
  razorpayRefundId?: string | null;
  status: string;
  reason: string;
  processedAt?: Date | string | null;
  createdAt: Date | string;
}
