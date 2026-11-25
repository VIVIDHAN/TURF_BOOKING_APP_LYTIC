export const APP_CONFIG = {
  APP_NAME: 'FindMyTurf',
  API_VERSION: 'v1',
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 50,
  // Slot holding configuration
  SLOT_HOLD_DURATION_MINUTES: 10,
  // Booking cancellation window in hours before slot time
  CANCELLATION_WINDOW_HOURS: 4,
  // Fees and taxes
  CONVENIENCE_FEE_PERCENTAGE: 2.5,
  GST_PERCENTAGE: 18,
  // Default currency
  CURRENCY: 'INR',
  // Timeouts
  API_TIMEOUT_MS: 15000,
} as const;

export const ROLES = {
  CUSTOMER: 'CUSTOMER',
  TURF_OWNER: 'TURF_OWNER',
  OWNER_STAFF: 'OWNER_STAFF',
  TOURNAMENT_ORGANIZER: 'TOURNAMENT_ORGANIZER',
  PLATFORM_ADMIN: 'PLATFORM_ADMIN',
  PLATFORM_SUPER_ADMIN: 'PLATFORM_SUPER_ADMIN',
} as const;

export const THEME = {
  colors: {
    primary: '#0B1E36', // Deep Navy
    accent: '#10B981',  // Fresh Green
    background: '#F8FAFC', // Off-white
    card: '#FFFFFF',
    text: '#1E293B',    // Dark charcoal
    textSecondary: '#64748B', // Neutral grey
    border: '#E2E8F0',
    error: '#EF4444',
    warning: '#F59E0B',
    success: '#10B981',
  },
  typography: {
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
  },
} as const;
