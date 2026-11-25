import React from 'react';

export const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-textDark">Platform Settings</h2>
      <p className="text-xs text-textMuted">Configure convenience fee, GST rules, slot hold timeouts, and notification templates.</p>
      <div className="bg-white p-6 rounded-xl border border-gray-200 text-sm text-textMuted">
        System configurations and feature toggles.
      </div>
    </div>
  );
};
