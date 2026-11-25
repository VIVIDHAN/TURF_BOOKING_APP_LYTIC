import React from 'react';

export const OwnersPage: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-textDark">Turf Owner Management</h2>
      <p className="text-xs text-textMuted">KYC verification, business profiles, and bank settlement configurations.</p>
      <div className="bg-white p-6 rounded-xl border border-gray-200 text-sm text-textMuted">
        Turf owner accounts and verification status.
      </div>
    </div>
  );
};
