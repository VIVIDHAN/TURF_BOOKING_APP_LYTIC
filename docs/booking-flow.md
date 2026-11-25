# Booking Engine & Payment Flow — Turf Platform

## 1. Overview

The booking engine is the core business process of the platform. It enforces:
- Real-time availability calculation based on venue operating hours.
- Variable peak-hour pricing.
- Concurrency protection preventing double-booking of any ground slot.
- Atomic temporary slot holds (10 minutes).
- Server-side Razorpay payment verification using HMAC SHA256.

---

## 2. End-to-End Booking Lifecycle Diagram

```mermaid
sequenceDiagram
    autonumber
    actor Customer as Customer (Player)
    participant Mobile as Mobile App
    participant AvailEngine as Availability Engine
    participant BookingEngine as Booking Engine
    participant DB as PostgreSQL (Prisma)
    participant Razorpay as Razorpay Gateway

    %% Phase 1: Slot Discovery
    Customer->>Mobile: Selects Turf Ground & Target Date
    Mobile->>AvailEngine: GET /api/v1/availability?groundId=&date=
    AvailEngine->>DB: Query OperatingHours, Confirmed Bookings & Active Holds
    DB-->>AvailEngine: Return records
    AvailEngine->>AvailEngine: Calculate non-overlapping slots & peak pricing
    AvailEngine-->>Mobile: Return available slots list

    %% Phase 2: Slot Hold
    Customer->>Mobile: Picks 07:00 PM - 08:00 PM & clicks "Hold Slot"
    Mobile->>BookingEngine: POST /api/v1/bookings/hold { groundId, startTime, endTime }
    BookingEngine->>DB: Transaction: check collision & write SlotHold (expiresAt = +10 mins)
    DB-->>BookingEngine: Hold created
    BookingEngine-->>Mobile: 201 Created { holdId, expiresAt }
    Mobile->>Mobile: Start 10-minute countdown timer

    %% Phase 3: Booking Instantiation
    Customer->>Mobile: Reviews price breakdown & clicks "Proceed to Pay"
    Mobile->>BookingEngine: POST /api/v1/bookings { holdId, groundId, ... }
    BookingEngine->>DB: Validate hold unexpired & create Booking (PENDING_PAYMENT)
    DB-->>BookingEngine: Return Booking record
    BookingEngine-->>Mobile: 201 Created { bookingId, finalAmount }

    %% Phase 4: Payment Processing
    Mobile->>BookingEngine: POST /api/v1/payments/initiate { bookingId }
    BookingEngine->>Razorpay: Create Order (amount, currency INR)
    Razorpay-->>BookingEngine: Return razorpayOrderId
    BookingEngine-->>Mobile: Return { razorpayOrderId, keyId, amount }

    Customer->>Mobile: Authorizes payment in Razorpay Checkout modal
    Mobile->>Razorpay: Process UPI / Card transaction
    Razorpay-->>Mobile: Returns { razorpayPaymentId, razorpaySignature }

    %% Phase 5: Server-Side Verification
    Mobile->>BookingEngine: POST /api/v1/payments/verify { bookingId, razorpayOrderId, razorpayPaymentId, razorpaySignature }
    BookingEngine->>BookingEngine: Compute HMAC SHA256 signature with RAZORPAY_KEY_SECRET
    
    alt Signatures Match
        BookingEngine->>DB: Transaction: Payment -> SUCCESS, Booking -> CONFIRMED
        DB-->>BookingEngine: Committed
        BookingEngine-->>Mobile: 200 OK (Booking Confirmed & Reference Generated)
        Mobile->>Customer: Display Booking Confirmation Card & Slot QR
    else Signature Mismatch
        BookingEngine->>DB: Payment -> FAILED
        BookingEngine-->>Mobile: 400 Bad Request (Payment verification failed)
    end
```

---

## 3. Concurrency Protection Strategy

1. **Database Transaction (`prisma.$transaction`)**:
   During hold acquisition, a read-lock and collision check is performed atomically. No two sessions can hold the same ground interval simultaneously.
2. **Hold Expiration (`expiresAt`)**:
   Holds automatically expire after 10 minutes. Any active query for availability filters out expired holds, instantly releasing abandoned slots back to the public pool without requiring manual release jobs.
3. **Double-Booking Shield**:
   When confirming payment, the system verifies that the booking status is `PENDING_PAYMENT` and that no overlapping `CONFIRMED` booking exists.
