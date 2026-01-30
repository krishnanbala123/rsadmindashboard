'use client';
import { useState } from 'react';
import AuthGuard from '@/components/AuthGuard';
import AdminNavbar from '@/components/AdminNavbar';
import AdminSidebar from '@/components/AdminSidebar';
import '../globals.css'

export default function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);   // desktop
  const [mobileOpen, setMobileOpen] = useState(false); // mobile

  return (
    <AuthGuard>
      <div className="admin-wrapper">
        {/* SIDEBAR */}
        <AdminSidebar
          collapsed={collapsed}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />

        {/* RIGHT SIDE */}
        <div className="main-wrapper">
          <AdminNavbar
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
          />

          <main className="main-content">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
