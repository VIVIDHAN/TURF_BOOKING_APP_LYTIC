import React from 'react';

export const CustomersPage: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-textDark">Customer Management</h2>
      <p className="text-xs text-textMuted">View customer profiles, booking history, and account status.</p>
      <div className="bg-white p-6 rounded-xl border border-gray-200 text-sm text-textMuted">
        Customer table and filtering components.
      </div>
    </div>
  );
};
