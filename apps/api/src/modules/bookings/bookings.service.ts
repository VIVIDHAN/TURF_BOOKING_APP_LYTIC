import { prisma } from '../../config/prisma';
import { APP_CONFIG } from '@turf/config';
import { HoldSlotInput, CreateBookingInput, CancelBookingInput } from '@turf/validation';

export class BookingsService {
  async holdSlot(userId: string, input: HoldSlotInput) {
    const start = new Date(input.startTime);
    const end = new Date(input.endTime);

    if (start >= end) {
      throw { statusCode: 400, message: 'Start time must be before end time', code: 'INVALID_TIME' };
    }

    if (start.getTime() < Date.now()) {
      throw { statusCode: 400, message: 'Cannot book a slot in the past', code: 'PAST_TIME' };
    }

    // Atomic transaction to verify no conflicting confirmed booking or active hold
    return prisma.$transaction(async (tx) => {
      // Clean up expired holds
      await tx.slotHold.deleteMany({
        where: { expiresAt: { lte: new Date() } },
      });

      // Check confirmed bookings collision
      const conflictingBooking = await tx.booking.findFirst({
        where: {
          groundId: input.groundId,
          status: 'CONFIRMED',
          startTime: { lt: end },
          endTime: { gt: start },
        },
      });

      if (conflictingBooking) {
        throw { statusCode: 409, message: 'Slot already booked by another user', code: 'SLOT_OCCUPIED' };
      }

      // Check active hold collision
      const conflictingHold = await tx.slotHold.findFirst({
        where: {
          groundId: input.groundId,
          expiresAt: { gt: new Date() },
          startTime: { lt: end },
          endTime: { gt: start },
        },
      });

      if (conflictingHold) {
        throw { statusCode: 409, message: 'Slot is currently on hold by another customer', code: 'SLOT_ON_HOLD' };
      }

      const expiresAt = new Date(Date.now() + APP_CONFIG.SLOT_HOLD_DURATION_MINUTES * 60 * 1000);

      const hold = await tx.slotHold.create({
        data: {
          groundId: input.groundId,
          userId,
          startTime: start,
          endTime: end,
          expiresAt,
        },
      });

      return {
        holdId: hold.id,
        expiresAt: hold.expiresAt,
        holdDurationMinutes: APP_CONFIG.SLOT_HOLD_DURATION_MINUTES,
      };
    });
  }

  async createBooking(userId: string, input: CreateBookingInput) {
    return prisma.$transaction(async (tx) => {
      const hold = await tx.slotHold.findUnique({
        where: { id: input.holdId },
        include: { ground: { include: { venue: true } } },
      });

      if (!hold) {
        throw { statusCode: 404, message: 'Hold reservation not found', code: 'HOLD_NOT_FOUND' };
      }

      if (hold.userId !== userId) {
        throw { statusCode: 403, message: 'Hold does not belong to you', code: 'FORBIDDEN' };
      }

      if (new Date() > hold.expiresAt) {
        throw { statusCode: 410, message: 'Reservation hold has expired. Please select the slot again.', code: 'HOLD_EXPIRED' };
      }

      const durationMinutes = Math.round((hold.endTime.getTime() - hold.startTime.getTime()) / (60 * 1000));
      const hours = durationMinutes / 60;
      const hourlyPrice = Number(hold.ground.hourlyPrice);
      const totalAmount = hourlyPrice * hours;

      const convenienceFee = totalAmount * (APP_CONFIG.CONVENIENCE_FEE_PERCENTAGE / 100);
      const taxableAmount = totalAmount + convenienceFee;
      const taxAmount = taxableAmount * (APP_CONFIG.GST_PERCENTAGE / 100);
      const finalAmount = taxableAmount + taxAmount;

      const bookingReference = `TRF-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

      const booking = await tx.booking.create({
        data: {
          bookingReference,
          userId,
          groundId: hold.groundId,
          holdId: hold.id,
          date: hold.startTime,
          startTime: hold.startTime,
          endTime: hold.endTime,
          durationMinutes,
          totalAmount,
          taxAmount,
          convenienceFee,
          finalAmount,
          status: 'PENDING_PAYMENT',
        },
      });

      return booking;
    });
  }

  async listUserBookings(userId: string) {
    return prisma.booking.findMany({
      where: { userId },
      include: {
        ground: {
          include: {
            venue: {
              include: {
                images: { take: 1 },
              },
            },
          },
        },
        payments: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async cancelBooking(userId: string, bookingId: string, input: CancelBookingInput) {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      throw { statusCode: 404, message: 'Booking not found', code: 'BOOKING_NOT_FOUND' };
    }

    if (booking.userId !== userId) {
      throw { statusCode: 403, message: 'Not authorized to cancel this booking', code: 'FORBIDDEN' };
    }

    if (booking.status !== 'CONFIRMED' && booking.status !== 'PENDING_PAYMENT') {
      throw { statusCode: 400, message: `Cannot cancel booking with status ${booking.status}`, code: 'CANNOT_CANCEL' };
    }

    return prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: 'CANCELLED',
        cancellationReason: input.reason,
        cancelledAt: new Date(),
      },
    });
  }
}

export const bookingsService = new BookingsService();
