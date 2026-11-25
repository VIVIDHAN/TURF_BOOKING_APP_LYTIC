# FindMyTurf — Sports Turf Booking Marketplace

A modern, production-grade sports arena discovery and slot reservation platform (similar to BookMyShow for sports turfs). Connects players with verified sports grounds and gives turf owners end-to-end ground schedule and revenue management.

---

## 1. Technology Stack

- **Mobile Application**: React Native CLI (TypeScript, React Navigation, Native StyleSheet, Zustand, React Hook Form, Zod).
- **Backend API**: Node.js, Express.js (TypeScript, REST architecture `/api/v1`, PostgreSQL, Prisma ORM, JWT, Zod, Helmet, Rate Limiter).
- **Admin Console**: React 18, Vite, TypeScript, Tailwind CSS, React Router, Lucide Icons.
- **Shared Packages**: Canonical types, Zod validation schemas, platform constants, and Axios API client.
- **Supporting Services**: Razorpay (Payments), Firebase Cloud Messaging (Push), Cloudinary / S3 (Media), Maps API.

---

## 2. Monorepo Structure

```
turf-platform/
├── apps/
│   ├── api/           # Node.js Express & Prisma REST API
│   ├── mobile/        # React Native CLI Mobile Application
│   └── admin/         # Vite + React Admin Web Dashboard
├── packages/
│   ├── shared-types/  # Shared TypeScript interfaces & enums
│   ├── validation/    # Shared Zod validation schemas
│   ├── config/        # Platform constants & design system tokens
│   └── api-client/    # Unified Axios client with interceptors
└── docs/              # Complete architecture & design documentation
```

---

## 3. Getting Started (macOS Setup)

### Prerequisites
- **Node.js**: v18.0.0 or higher (v25+ tested)
- **Package Manager**: npm v9+ (tested with v11)
- **PostgreSQL**: v14+ running locally or on cloud
- **For Mobile Development**:
  - Xcode & CocoaPods (for iOS)
  - Android Studio & JDK 17 (for Android)
  - Watchman (`brew install watchman`)

---

## 4. Installation & Build

From the root directory:

```bash
# 1. Install all dependencies across all workspaces
npm install

# 2. Build shared packages (shared-types, validation, config, api-client)
npm run build
```

---

## 5. Running the Applications

### 5.1. Backend API (`apps/api`)
```bash
# Set up environment variables
cp apps/api/.env.example apps/api/.env

# Generate Prisma client
npm run prisma:generate --workspace=apps/api

# Run database migrations (when PostgreSQL is running)
npm run prisma:migrate --workspace=apps/api

# Start the development server with live reload
npm run dev:api
```
- API Base URL: `http://localhost:5000/api/v1`
- Health check: `http://localhost:5000/health`

### 5.2. Admin Dashboard (`apps/admin`)
```bash
# Start Vite development server
npm run dev:admin
```
- Dashboard runs at `http://localhost:5173`

### 5.3. Mobile Application (`apps/mobile`)
```bash
# 1. Start Metro bundler
npm run dev:mobile

# 2. In a separate terminal:
# For iOS (Mac):
cd apps/mobile/ios && pod install && cd ../../..
npm run ios --workspace=apps/mobile

# For Android:
npm run android --workspace=apps/mobile
```

---

## 6. Architecture Documentation

Detailed architectural blueprints and sequence diagrams are located under [`docs/`](./docs/):

1. [System Architecture](./docs/architecture.md)
2. [Folder Structure & Responsibilities](./docs/folder-structure.md)
3. [Database Schema & ERD](./docs/database-schema.md)
4. [API Design & Endpoints](./docs/api-design.md)
5. [Authentication & RBAC Flow](./docs/authentication-flow.md)
6. [Booking Engine & Concurrency](./docs/booking-flow.md)
7. [User Roles & Permissions](./docs/user-roles.md)
8. [Development Roadmap (8 Phases)](./docs/development-roadmap.md)
