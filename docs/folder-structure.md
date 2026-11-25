# Folder Structure — Turf Platform

This document outlines the directory tree and architectural responsibility of every package and application in the monorepo.

```
turf-platform/
├── .gitignore
├── .prettierignore
├── .prettierrc
├── package.json               # Root workspaces configuration
├── tsconfig.base.json         # Base TypeScript compiler settings
├── README.md                  # Project onboarding & commands
│
├── apps/
│   ├── api/                   # Backend Express.js REST API
│   │   ├── prisma/
│   │   │   └── schema.prisma  # Complete PostgreSQL relational schema
│   │   ├── src/
│   │   │   ├── config/        # Environment and Prisma singletons
│   │   │   ├── middleware/    # Auth, role check, validation, error handler
│   │   │   ├── modules/       # 15 domain modules (service-oriented)
│   │   │   │   ├── auth/          # Authentication & token generation
│   │   │   │   ├── users/         # Profile management
│   │   │   │   ├── owners/        # Turf owner dashboard & metrics
│   │   │   │   ├── turfs/         # Venues, grounds, search & discovery
│   │   │   │   ├── facilities/    # Amenity registry (parking, lights, etc.)
│   │   │   │   ├── availability/  # Dynamic slot calculations & operating hours
│   │   │   │   ├── bookings/      # Hold management & booking engine
│   │   │   │   ├── payments/      # Razorpay order & HMAC signature verification
│   │   │   │   ├── reviews/       # Venue ratings & player comments
│   │   │   │   ├── tournaments/   # Tournament brackets & formats
│   │   │   │   ├── teams/         # Team rosters & captains
│   │   │   │   ├── matches/       # Match fixtures & scoring
│   │   │   │   ├── player-stats/  # Goals, runs, MVP & leaderboards
│   │   │   │   ├── notifications/ # Push notification registry
│   │   │   │   └── admin/         # Platform administration & audits
│   │   │   ├── routes/        # Unified /api/v1 router aggregation
│   │   │   ├── utils/         # Response formatters & helpers
│   │   │   ├── app.ts         # Express application factory
│   │   │   └── server.ts      # Server bootstrap & graceful shutdown
│   │   ├── .env.example
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── mobile/                # React Native CLI Application (iOS & Android)
│   │   ├── src/
│   │   │   ├── components/    # Reusable atomic UI components
│   │   │   ├── features/      # Feature modules with screens & logic
│   │   │   │   ├── auth/          # Login & Register
│   │   │   │   ├── home/          # Discovery dashboard & quick sports
│   │   │   │   ├── discovery/     # Filterable turf explorer
│   │   │   │   ├── turf-details/  # Ground details, amenities & pricing
│   │   │   │   ├── bookings/      # Slot selection & booking history
│   │   │   │   ├── payments/      # Bill breakdown & Razorpay checkout
│   │   │   │   ├── owner/         # Owner metrics, ground management & earnings
│   │   │   │   ├── tournaments/   # Tournament listings
│   │   │   │   ├── player-stats/  # Personal records & stats
│   │   │   │   └── profile/       # User profile & session controls
│   │   │   ├── navigation/    # Role-based root navigator & bottom tabs
│   │   │   │   ├── AuthNavigator.tsx
│   │   │   │   ├── CustomerTabNavigator.tsx
│   │   │   │   ├── OwnerTabNavigator.tsx
│   │   │   │   ├── RootNavigator.tsx
│   │   │   │   └── types.ts
│   │   │   ├── store/         # Zustand lightweight state management
│   │   │   ├── theme/         # Color palette, spacing & typography
│   │   │   └── App.tsx        # Main application component
│   │   ├── index.js           # React Native entry point
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── admin/                 # Vite + React + Tailwind Administration Console
│       ├── src/
│       │   ├── components/    # Sidebar, Topbar, Badges, Modals
│       │   ├── layouts/       # DashboardLayout with navigation shell
│       │   ├── pages/         # Executive Overview, Approvals, Ledger
│       │   ├── App.tsx        # React Router routes definition
│       │   ├── index.css      # Tailwind directives & theme setup
│       │   └── main.tsx       # Vite DOM mount point
│       ├── index.html
│       ├── package.json
│       ├── tailwind.config.js
│       └── vite.config.ts
│
├── packages/
│   ├── shared-types/          # Canonical TypeScript interfaces & enums
│   │   ├── src/
│   │   │   ├── enums.ts       # Role, BookingStatus, SportType, etc.
│   │   │   ├── user.ts        # User & Owner profile models
│   │   │   ├── turf.ts        # TurfVenue, TurfGround, Facility models
│   │   │   ├── booking.ts     # TimeSlot, Booking, Hold models
│   │   │   ├── payment.ts     # Payment & Refund models
│   │   │   ├── tournament.ts  # Tournament, Team, Match models
│   │   │   ├── player.ts      # PlayerStats models
│   │   │   ├── notification.ts# Notification models
│   │   │   ├── api.ts         # Standard ApiResponse & pagination
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── validation/            # Zod validation schemas
│   │   ├── src/
│   │   │   ├── auth.schema.ts
│   │   │   ├── turf.schema.ts
│   │   │   ├── booking.schema.ts
│   │   │   ├── payment.schema.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── config/                # Constants & theme values
│   │   ├── src/
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── api-client/            # Shared Axios client with interceptors
│       ├── src/
│       │   ├── client.ts
│       │   └── index.ts
│       ├── package.json
│       └── tsconfig.json
│
└── docs/                      # Architectural & design documentation
    ├── architecture.md
    ├── folder-structure.md
    ├── database-schema.md
    ├── api-design.md
    ├── authentication-flow.md
    ├── booking-flow.md
    ├── user-roles.md
    └── development-roadmap.md
```
