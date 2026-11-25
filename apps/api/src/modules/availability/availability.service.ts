import { prisma } from '../../config/prisma';
import { TimeSlot } from '@turf/shared-types';

export class AvailabilityService {
  async getAvailability(groundId: string, dateStr: string): Promise<TimeSlot[]> {
    const ground = await prisma.turfGround.findUnique({
      where: { id: groundId },
      include: {
        venue: {
          include: {
            operatingHours: true,
          },
        },
      },
    });

    if (!ground) {
      throw { statusCode: 404, message: 'Ground not found', code: 'GROUND_NOT_FOUND' };
    }

    const targetDate = new Date(`${dateStr}T00:00:00.000Z`);
    const dayOfWeek = targetDate.getUTCDay();

    const opHour = ground.venue.operatingHours.find((h) => h.dayOfWeek === dayOfWeek);

    // If venue is closed on this day
    if (!opHour || opHour.isClosed) {
      return [];
    }

    const [openHour, openMin] = opHour.openTime.split(':').map(Number);
    const [closeHour, closeMin] = opHour.closeTime.split(':').map(Number);

    const dayStart = new Date(targetDate);
    dayStart.setUTCHours(openHour, openMin, 0, 0);

    const dayEnd = new Date(targetDate);
    dayEnd.setUTCHours(closeHour, closeMin, 0, 0);

    // Find confirmed bookings for this ground on this day
    const confirmedBookings = await prisma.booking.findMany({
      where: {
        groundId,
        status: { in: ['CONFIRMED', 'HOLD'] },
        startTime: { gte: dayStart, lt: dayEnd },
      },
      select: {
        startTime: true,
        endTime: true,
      },
    });

    // Find active holds that haven't expired
    const activeHolds = await prisma.slotHold.findMany({
      where: {
        groundId,
        expiresAt: { gt: new Date() },
        startTime: { gte: dayStart, lt: dayEnd },
      },
      select: {
        startTime: true,
        endTime: true,
      },
    });

    const busyIntervals = [
      ...confirmedBookings.map((b) => ({ start: b.startTime.getTime(), end: b.endTime.getTime() })),
      ...activeHolds.map((h) => ({ start: h.startTime.getTime(), end: h.endTime.getTime() })),
    ];

    const slots: TimeSlot[] = [];
    const slotDurationMs = ground.slotDurationMinutes * 60 * 1000;
    let currentSlotStart = dayStart.getTime();

    while (currentSlotStart + slotDurationMs <= dayEnd.getTime()) {
      const currentSlotEnd = currentSlotStart + slotDurationMs;

      // Check collision
      const isOccupied = busyIntervals.some(
        (b) => currentSlotStart < b.end && currentSlotEnd > b.start,
      );

      const slotStartDate = new Date(currentSlotStart);
      const slotHour = slotStartDate.getUTCHours();
      const isPeak = slotHour >= 18 && slotHour <= 22; // 6 PM - 10 PM
      const price = isPeak && ground.peakHourPrice ? Number(ground.peakHourPrice) : Number(ground.hourlyPrice);

      slots.push({
        startTime: new Date(currentSlotStart).toISOString(),
        endTime: new Date(currentSlotEnd).toISOString(),
        price,
        isAvailable: !isOccupied,
        isPeakHour: isPeak,
      });

      currentSlotStart = currentSlotEnd;
    }

    return slots;
  }
}

export const availabilityService = new AvailabilityService();
