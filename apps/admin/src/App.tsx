import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './layouts/DashboardLayout';
import { DashboardPage } from './pages/DashboardPage';
import { CustomersPage } from './pages/CustomersPage';
import { OwnersPage } from './pages/OwnersPage';
import { TurfsPage } from './pages/TurfsPage';
import { BookingsPage } from './pages/BookingsPage';
import { PaymentsPage } from './pages/PaymentsPage';
import { CommissionsPage } from './pages/CommissionsPage';
import { TournamentsPage } from './pages/TournamentsPage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/SettingsPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="owners" element={<OwnersPage />} />
          <Route path="turfs" element={<TurfsPage />} />
          <Route path="bookings" element={<BookingsPage />} />
          <Route path="payments" element={<PaymentsPage />} />
          <Route path="commissions" element={<CommissionsPage />} />
          <Route path="tournaments" element={<TournamentsPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
