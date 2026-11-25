# Authentication & Authorization Flow — Turf Platform

## 1. Overview

The platform uses **Stateless JSON Web Tokens (JWT)** with dual-token architecture:
- **Access Token**: Short-lived (15 minutes). Sent in every API request header.
- **Refresh Token**: Long-lived (7 days). Stored securely (Keychain / Keystore on mobile, HttpOnly cookie or secure storage on web) to obtain new access tokens without forcing re-login.

---

## 2. Authentication Sequence Diagram

```mermaid
sequenceDiagram
    autonumber
    actor User as User / Turf Owner
    participant Client as Mobile App / Admin Web
    participant Gateway as API Gateway / Router
    participant AuthService as Auth Module (Node.js)
    participant DB as PostgreSQL (Prisma)

    User->>Client: Enters Email / Phone & Password
    Client->>Gateway: POST /api/v1/auth/login { identifier, password }
    Gateway->>AuthService: Validate schema (Zod) & delegate
    AuthService->>DB: Query User by email or phone
    DB-->>AuthService: Return User record & passwordHash
    
    alt User not found or inactive
        AuthService-->>Client: 401 Unauthorized (Invalid credentials)
    else Password valid (bcrypt)
        AuthService->>AuthService: Generate Access Token (15m) & Refresh Token (7d)
        AuthService-->>Client: 200 OK { user, tokens: { accessToken, refreshToken } }
        Client->>Client: Store tokens & update Zustand AuthStore
        Client->>Client: Role Check -> Route to CustomerTabs or OwnerTabs
    end
```

---

## 3. Role-Based Access Control (RBAC) Flow

```mermaid
sequenceDiagram
    autonumber
    actor Owner as Turf Owner
    participant Mobile as Mobile App
    participant Middleware as Auth & Role Middleware
    participant Controller as Owner Module Controller

    Owner->>Mobile: Navigates to "Earnings & Settlement"
    Mobile->>Middleware: GET /api/v1/owners/dashboard\nAuthorization: Bearer <token>
    Middleware->>Middleware: Verify JWT signature & expiration
    
    alt Token invalid or expired
        Middleware-->>Mobile: 401 Unauthorized
        Mobile->>Mobile: Trigger silent refresh or logout
    else Token valid
        Middleware->>Middleware: Inspect user.role
        alt Role is not TURF_OWNER, OWNER_STAFF, or ADMIN
            Middleware-->>Mobile: 403 Forbidden (Access Denied)
        else Authorized Role
            Middleware->>Controller: Forward request with req.user
            Controller-->>Mobile: 200 OK { revenue, occupancy, bookings }
        end
    end
```

---

## 4. Key Security Measures
- **Password Hashing**: Strong bcrypt salt rounds (10) ensure credentials are never stored in clear text.
- **Payload Minimization**: JWT payloads contain only non-sensitive claims (`userId`, `email`, `role`).
- **Server-Side Enforcement**: Frontend route hiding is purely for user experience; backend middleware (`authenticate`, `requireRoles`) independently validates every protected route.
- **Deactivated Account Revocation**: The authentication service checks `user.isActive` before issuing session tokens.
