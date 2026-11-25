import { BookingStatus } from './enums';

export interface TimeSlot {
  startTime: string; // ISO 8601 string
  endTime: string;   // ISO 8601 string
  price: number;
  isAvailable: boolean;
  isPeakHour?: boolean;
}

export interface DayAvailability {
  date: string; // YYYY-MM-DD
  groundId: string;
  slots: TimeSlot[];
}

export interface BookingHold {
  id: string;
  groundId: string;
  userId: string;
  startTime: Date | string;
  endTime: Date | string;
  expiresAt: Date | string;
}

export interface Booking {
  id: string;
  bookingReference: string;
  userId: string;
  groundId: string;
  venueId: string;
  date: string;
  startTime: Date | string;
  endTime: Date | string;
  durationMinutes: number;
  totalAmount: number;
  taxAmount: number;
  convenienceFee: number;
  finalAmount: number;
  status: BookingStatus;
  cancellationReason?: string | null;
  cancelledAt?: Date | string | null;
  refundAmount?: number | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}
