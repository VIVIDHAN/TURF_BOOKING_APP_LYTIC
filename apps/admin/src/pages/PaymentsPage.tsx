import React from 'react';

export const PaymentsPage: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-textDark">Payment Management</h2>
      <p className="text-xs text-textMuted">Razorpay transactions, webhook status, refunds, and payment failure logs.</p>
      <div className="bg-white p-6 rounded-xl border border-gray-200 text-sm text-textMuted">
        Payment gateway ledger and refund processing.
      </div>
    </div>
  );
};
