import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Building2,
  MapPin,
  CalendarCheck,
  CreditCard,
  Percent,
  Trophy,
  BarChart3,
  Settings,
} from 'lucide-react';

const navigationItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Customers', path: '/customers', icon: Users },
  { name: 'Turf Owners', path: '/owners', icon: Building2 },
  { name: 'Turf Listings', path: '/turfs', icon: MapPin },
  { name: 'Bookings', path: '/bookings', icon: CalendarCheck },
  { name: 'Payments', path: '/payments', icon: CreditCard },
  { name: 'Commissions', path: '/commissions', icon: Percent },
  { name: 'Tournaments', path: '/tournaments', icon: Trophy },
  { name: 'Reports', path: '/reports', icon: BarChart3 },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-primary text-white flex flex-col min-h-screen">
      <div className="p-6 border-b border-primary-light">
        <h1 className="text-xl font-bold tracking-tight">FindMyTurf</h1>
        <p className="text-xs text-textMuted mt-1">Platform Admin Console</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-accent text-white font-semibold'
                    : 'text-gray-300 hover:bg-primary-light hover:text-white'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-primary-light text-xs text-gray-400">
        v1.0.0 • Production Ready
      </div>
    </aside>
  );
};
