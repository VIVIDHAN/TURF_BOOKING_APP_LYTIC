import React from 'react';
import { Bell, ShieldCheck, LogOut } from 'lucide-react';

export const Topbar: React.FC = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
          <ShieldCheck className="w-3.5 h-3.5" />
          Super Admin Mode
        </span>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition"
        >
          <Bell className="w-5 h-5" />
        </button>

        <div className="h-8 w-px bg-gray-200" />

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
            AD
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-xs font-semibold text-textDark">Admin User</p>
            <p className="text-[10px] text-textMuted">admin@findmyturf.com</p>
          </div>
        </div>

        <button
          type="button"
          className="p-2 text-gray-400 hover:text-red-600 rounded-lg transition"
          title="Sign Out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
