import React from 'react';
import { Users, Building2, CalendarCheck, TrendingUp, AlertCircle } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const stats = [
    { name: 'Total Users', value: '4,820', change: '+12% from last month', icon: Users },
    { name: 'Active Venues', value: '138', change: '8 pending approvals', icon: Building2 },
    { name: 'Total Bookings', value: '18,450', change: '+24% this week', icon: CalendarCheck },
    { name: 'Gross Merchandise Value', value: '₹28,50,000', change: '+18% net growth', icon: TrendingUp },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-textDark">Executive Overview</h2>
          <p className="text-sm text-textMuted mt-1">Real-time marketplace health & booking velocity</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.name} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-textMuted">{s.name}</span>
                <div className="p-2 bg-emerald-50 text-accent rounded-lg">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-bold text-textDark mt-3">{s.value}</p>
              <p className="text-xs text-textMuted mt-1">{s.change}</p>
            </div>
          );
        })}
      </div>

      {/* Turf Approval Queue Notification */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600" />
          <div>
            <p className="text-sm font-semibold text-amber-900">8 Turf Venues Pending Verification</p>
            <p className="text-xs text-amber-700">New venues registered by turf owners requiring KYC and ground dimension review.</p>
          </div>
        </div>
        <button
          type="button"
          className="px-3.5 py-1.5 bg-amber-600 text-white text-xs font-semibold rounded-lg hover:bg-amber-700 transition"
        >
          Review Queue
        </button>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-textDark text-sm">Recent Platform Bookings</h3>
          <span className="text-xs text-accent font-medium cursor-pointer">View all</span>
        </div>
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50 text-textMuted font-semibold uppercase tracking-wider border-b border-gray-100">
            <tr>
              <th className="px-5 py-3">Booking ID</th>
              <th className="px-5 py-3">Customer</th>
              <th className="px-5 py-3">Venue & Ground</th>
              <th className="px-5 py-3">Slot Time</th>
              <th className="px-5 py-3">Amount</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="px-5 py-3 font-medium text-textDark">TRF-98214</td>
              <td className="px-5 py-3">Vikram Sen</td>
              <td className="px-5 py-3">Koramangala Kickers (Ground 1)</td>
              <td className="px-5 py-3">Today, 07:00 PM - 08:00 PM</td>
              <td className="px-5 py-3 font-semibold text-textDark">₹1,200</td>
              <td className="px-5 py-3">
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium text-[11px]">
                  CONFIRMED
                </span>
              </td>
            </tr>
            <tr>
              <td className="px-5 py-3 font-medium text-textDark">TRF-98213</td>
              <td className="px-5 py-3">Ananya Roy</td>
              <td className="px-5 py-3">Indiranagar Smash (Badminton 2)</td>
              <td className="px-5 py-3">Today, 08:00 PM - 09:00 PM</td>
              <td className="px-5 py-3 font-semibold text-textDark">₹600</td>
              <td className="px-5 py-3">
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium text-[11px]">
                  CONFIRMED
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
