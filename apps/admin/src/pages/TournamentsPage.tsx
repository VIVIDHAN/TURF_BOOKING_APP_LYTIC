import React from 'react';

export const TournamentsPage: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-textDark">Tournament Monitoring</h2>
      <p className="text-xs text-textMuted">Oversee tournaments, prize pool escrow, team registrations, and match schedules.</p>
      <div className="bg-white p-6 rounded-xl border border-gray-200 text-sm text-textMuted">
        Tournament registry and dispute escalation.
      </div>
    </div>
  );
};
