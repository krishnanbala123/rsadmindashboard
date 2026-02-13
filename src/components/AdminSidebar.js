'use client';
import Link from 'next/link';
import { MdDashboard, MdInventory, MdShoppingCart, MdHistory, MdPeople } from 'react-icons/md';

export default function AdminSidebar({
  collapsed,
  mobileOpen,
  setMobileOpen
}) {
 const menu = [
  { name: 'Dashboard', icon: <MdDashboard />, path: '/admin/dashboard' },
  { name: 'Products', icon: <MdInventory />, path: '/admin/products' },
  { name: 'Orders', icon: <MdShoppingCart />, path: '/admin/orders' },
  { name: 'Order History', icon: <MdHistory />, path: '/admin/order-history' },
  { name: 'User Logins', icon: <MdPeople />, path: '/admin/users' }, // 👈 NEW
];

  return (
    <aside
      className={`sidebar ${collapsed ? 'collapsed' : ''} ${
        mobileOpen ? 'mobile-open' : ''
      }`}
    >
      {/* 🔥 BRAND LOGO */}
      <div className="sidebar-brand">
        <img
          src="/bricks-logo.png"
          alt="RS Bricks"
          width={collapsed ? 36 : 120}
          height={80}
        />
      </div>

      {/* MENU */}
      <nav>
        {menu.map(item => (
          <Link
            key={item.name}
            href={item.path}
            className="menu-item"
            onClick={() => setMobileOpen(false)}
          >
            <span className="icon">{item.icon}</span>
            {!collapsed && <span className="text">{item.name}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

