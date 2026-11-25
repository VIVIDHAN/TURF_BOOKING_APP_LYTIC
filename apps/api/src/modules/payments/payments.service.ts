import crypto from 'crypto';
import { prisma } from '../../config/prisma';
import { env } from '../../config/env';
import { InitiatePaymentInput, VerifyPaymentInput } from '@turf/validation';

export class PaymentsService {
  async initiatePayment(userId: string, input: InitiatePaymentInput) {
    const booking = await prisma.booking.findUnique({
      where: { id: input.bookingId },
    });

    if (!booking) {
      throw { statusCode: 404, message: 'Booking not found', code: 'BOOKING_NOT_FOUND' };
    }

    if (booking.userId !== userId) {
      throw { statusCode: 403, message: 'Not authorized to pay for this booking', code: 'FORBIDDEN' };
    }

    if (booking.status !== 'PENDING_PAYMENT') {
      throw { statusCode: 400, message: `Booking status is ${booking.status}, cannot initiate payment`, code: 'INVALID_STATUS' };
    }

    // In production, instantiate Razorpay SDK: new Razorpay({ key_id, key_secret })
    // For architecture / dev mock:
    const mockRazorpayOrderId = `order_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 7)}`;

    const payment = await prisma.payment.create({
      data: {
        bookingId: booking.id,
        userId,
        amount: booking.finalAmount,
        currency: 'INR',
        status: 'INITIATED',
        razorpayOrderId: mockRazorpayOrderId,
      },
    });

    return {
      paymentId: payment.id,
      razorpayOrderId: mockRazorpayOrderId,
      amount: Number(booking.finalAmount),
      currency: 'INR',
      keyId: env.RAZORPAY.KEY_ID,
    };
  }

  async verifyPayment(_userId: string, input: VerifyPaymentInput) {
    const payment = await prisma.payment.findFirst({
      where: {
        bookingId: input.bookingId,
        razorpayOrderId: input.razorpayOrderId,
      },
    });

    if (!payment) {
      throw { statusCode: 404, message: 'Payment record not found', code: 'PAYMENT_NOT_FOUND' };
    }

    // Server-side HMAC SHA256 Signature verification
    const generatedSignature = crypto
      .createHmac('sha256', env.RAZORPAY.KEY_SECRET || 'dev_secret')
      .update(`${input.razorpayOrderId}|${input.razorpayPaymentId}`)
      .digest('hex');

    // In dev environment or matching signature
    const isDev = env.NODE_ENV === 'development';
    const isSignatureValid = isDev || generatedSignature === input.razorpaySignature;

    if (!isSignatureValid) {
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: 'FAILED', failureReason: 'Signature verification failed' },
      });
      throw { statusCode: 400, message: 'Payment signature verification failed', code: 'PAYMENT_VERIFICATION_FAILED' };
    }

    return prisma.$transaction(async (tx) => {
      const updatedPayment = await tx.payment.update({
        where: { id: payment.id },
        data: {
          status: 'SUCCESS',
          razorpayPaymentId: input.razorpayPaymentId,
          razorpaySignature: input.razorpaySignature,
        },
      });

      const confirmedBooking = await tx.booking.update({
        where: { id: input.bookingId },
        data: {
          status: 'CONFIRMED',
        },
      });

      return {
        payment: updatedPayment,
        booking: confirmedBooking,
      };
    });
  }
}

export const paymentsService = new PaymentsService();
