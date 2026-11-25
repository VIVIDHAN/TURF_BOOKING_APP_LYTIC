import React from 'react';

export const BookingsPage: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-textDark">Booking Management</h2>
      <p className="text-xs text-textMuted">Monitor real-time reservations, slot holds, cancellations, and disputes.</p>
      <div className="bg-white p-6 rounded-xl border border-gray-200 text-sm text-textMuted">
        Comprehensive booking logs and status filters.
      </div>
    </div>
  );
};
