import React from 'react';

export const ReportsPage: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-textDark">Reports & Analytics</h2>
      <p className="text-xs text-textMuted">Export CSV reports for GMV, city-wise turf utilization, and user retention.</p>
      <div className="bg-white p-6 rounded-xl border border-gray-200 text-sm text-textMuted">
        Analytics dashboard and export tools.
      </div>
    </div>
  );
};
