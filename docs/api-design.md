# API Design & Endpoint Specification — Turf Booking Platform

## 1. REST Conventions

- **Base URL Prefix**: `/api/v1/`
- **Content Negotiation**: Request and response payloads are formatted strictly as `application/json`.
- **Authentication**: Stateless Bearer tokens passed via HTTP header:
  `Authorization: Bearer <JWT_ACCESS_TOKEN>`
- **HTTP Status Codes**:
  - `200 OK`: Successful resource retrieval or mutation.
  - `201 Created`: Resource successfully instantiated.
  - `400 Bad Request`: Invalid request data or illegal operation.
  - `401 Unauthorized`: Missing, invalid, or expired authentication token.
  - `403 Forbidden`: Authenticated identity lacks required permissions/roles.
  - `404 Not Found`: Requested resource does not exist.
  - `409 Conflict`: Slot collision, double-booking attempt, or unique constraint violation.
  - `410 Gone`: Expired slot hold reservation.
  - `422 Unprocessable Entity`: Zod input validation failure.
  - `429 Too Many Requests`: Rate limit threshold exceeded.
  - `500 Internal Server Error`: Unhandled backend exception.

---

## 2. Standardized Response Envelope

### 2.1. Success Response
```json
{
  "success": true,
  "message": "Resource retrieved successfully",
  "data": { ... }
}
```

### 2.2. Paginated Success Response
```json
{
  "success": true,
  "data": [ ... ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "totalPages": 5,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

### 2.3. Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      { "field": "phone", "message": "Enter a valid 10-digit Indian phone number" }
    ]
  }
}
```

---

## 3. Core API Endpoints

### 3.1. Authentication (`/api/v1/auth`)
| Method | Endpoint | Auth | Role | Description |
|---|---|---|---|---|
| `POST` | `/api/v1/auth/register` | No | Public | Register new customer or turf owner |
| `POST` | `/api/v1/auth/login` | No | Public | Authenticate via email/phone & password |
| `GET` | `/api/v1/auth/me` | Yes | Any | Fetch current authenticated user claims |

### 3.2. User Profile (`/api/v1/users`)
| Method | Endpoint | Auth | Role | Description |
|---|---|---|---|---|
| `GET` | `/api/v1/users/profile` | Yes | Any | Retrieve user profile & owner details |
| `PATCH` | `/api/v1/users/profile` | Yes | Any | Update personal name, avatar or contact |

### 3.3. Turfs & Venues (`/api/v1/turfs`)
| Method | Endpoint | Auth | Role | Description |
|---|---|---|---|---|
| `GET` | `/api/v1/turfs` | No | Public | Filterable list of approved venues (city, sport, geo) |
| `GET` | `/api/v1/turfs/:id` | No | Public | Venue details with grounds, images, & reviews |
| `POST` | `/api/v1/turfs` | Yes | `TURF_OWNER`, `ADMIN` | Register a new turf venue |
| `POST` | `/api/v1/turfs/grounds`| Yes | `TURF_OWNER`, `ADMIN` | Add ground to venue with pricing |

### 3.4. Availability Engine (`/api/v1/availability`)
| Method | Endpoint | Auth | Role | Description |
|---|---|---|---|---|
| `GET` | `/api/v1/availability?groundId=&date=` | No | Public | Calculate all slots for date, pricing & occupancy |

### 3.5. Booking Engine (`/api/v1/bookings`)
| Method | Endpoint | Auth | Role | Description |
|---|---|---|---|---|
| `POST` | `/api/v1/bookings/hold` | Yes | Customer | Acquire 10-minute temporary reservation lock |
| `POST` | `/api/v1/bookings` | Yes | Customer | Convert active hold into pending booking |
| `GET` | `/api/v1/bookings/my` | Yes | Customer | View customer's booking history |
| `POST` | `/api/v1/bookings/:id/cancel` | Yes | Customer | Request cancellation with refund audit |

### 3.6. Payments (`/api/v1/payments`)
| Method | Endpoint | Auth | Role | Description |
|---|---|---|---|---|
| `POST` | `/api/v1/payments/initiate` | Yes | Customer | Generate Razorpay order for booking |
| `POST` | `/api/v1/payments/verify` | Yes | Customer | Server-side signature verification & confirm booking |

### 3.7. Turf Owner Operations (`/api/v1/owners`)
| Method | Endpoint | Auth | Role | Description |
|---|---|---|---|---|
| `GET` | `/api/v1/owners/dashboard` | Yes | `TURF_OWNER`, `ADMIN` | Overview of today's schedule, revenue & grounds |

### 3.8. Platform Administration (`/api/v1/admin`)
| Method | Endpoint | Auth | Role | Description |
|---|---|---|---|---|
| `GET` | `/api/v1/admin/stats` | Yes | `ADMIN`, `SUPER_ADMIN` | Global GMV, user count, active turfs & fees |
| `GET` | `/api/v1/admin/users` | Yes | `ADMIN`, `SUPER_ADMIN` | Paginated user directory with role filter |
| `PATCH`| `/api/v1/admin/venues/:id/approval` | Yes | `ADMIN`, `SUPER_ADMIN` | Approve or reject submitted venue listing |
