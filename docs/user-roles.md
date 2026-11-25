# User Roles & Permission Matrix — Turf Platform

## 1. Overview

The platform implements a strict **Role-Based Access Control (RBAC)** model. Authorization is enforced at the backend middleware level on every REST endpoint.

---

## 2. Defined User Roles

1. **`CUSTOMER`**:
   Individual sports enthusiast or player. Discovers venues, books grounds, makes payments, manages personal reservations, submits venue ratings, and participates in tournaments.
2. **`TURF_OWNER`**:
   Business owner operating one or more turf venues. Configures grounds, sets slot durations, defines operating hours and peak pricing, views daily ground schedules, and tracks settlement revenue. Cannot modify another owner's grounds or access platform administration.
3. **`OWNER_STAFF`**:
   On-ground manager or front-desk receptionist employed by a turf owner. Has operational access to mark attendance, view the daily schedule, and assist walk-in players. Cannot alter bank details, payouts, or venue ownership.
4. **`TOURNAMENT_ORGANIZER`**:
   Creator of local tournaments. Formulates brackets, registers participating teams, schedules fixtures on turf grounds, and enters match scores.
5. **`PLATFORM_ADMIN`**:
   Platform operations team member. Reviews pending turf venue applications, inspects customer disputes, monitors booking integrity, and reviews flagged content.
6. **`PLATFORM_SUPER_ADMIN`**:
   Full system access. Configures platform commission percentages, platform-wide settings, user suspension, and financial audits.

---

## 3. Permissions Matrix

| Capability | Customer | Turf Owner | Owner Staff | Tournament Organizer | Platform Admin | Platform Super Admin |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| Search & view venues | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Check slot availability | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Book a slot & pay | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ |
| Cancel own booking | ✅ | ❌ | ❌ | ❌ | ✅ | ✅ |
| Register new venue | ❌ | ✅ | ❌ | ❌ | ✅ | ✅ |
| Manage ground pricing | ❌ | ✅ | ❌ | ❌ | ✅ | ✅ |
| View venue earnings | ❌ | ✅ | ❌ | ❌ | ✅ | ✅ |
| View today's ground schedule | ❌ | ✅ | ✅ | ❌ | ✅ | ✅ |
| Create tournament | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ |
| Enter match scores | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ |
| Approve / reject venue listings | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| Suspend users / venues | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| Configure commission rates | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| Direct database access / audit logs | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |

---

## 4. Architectural Boundaries

- **Tenant Isolation**: All owner queries scope database records by `venue.owner.userId == req.user.userId`. One owner can never access, mutate, or view bookings or financial records of another owner.
- **Client Separation**: Customers and turf owners share the mobile codebase but receive dedicated bottom tab navigators dynamically rendered based on the validated authentication state.
- **Admin Isolation**: Platform administration is hosted on a completely independent web application (`apps/admin`), ensuring platform controls are not bundled inside public consumer mobile binaries.
