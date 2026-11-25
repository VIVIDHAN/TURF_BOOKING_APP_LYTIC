import React from 'react';

export const CommissionsPage: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-textDark">Commission Management</h2>
      <p className="text-xs text-textMuted">Platform commission rates, owner settlement cycles, and net margin reports.</p>
      <div className="bg-white p-6 rounded-xl border border-gray-200 text-sm text-textMuted">
        Commission tier settings and owner payout batches.
      </div>
    </div>
  );
};
