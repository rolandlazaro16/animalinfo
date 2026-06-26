'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: '◉' },
  { href: '/animals', label: 'Animals', icon: '🐾' },
  { href: '/feedback', label: 'Feedback', icon: '📋' },
  { href: '/feedback/new', label: 'New Report', icon: '✏️' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <button
        className="mobile-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle menu"
      >
        {sidebarOpen ? '✕' : '☰'}
      </button>

      <div
        className={`mobile-overlay ${sidebarOpen ? 'active' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link href="/" className="sidebar-logo" onClick={() => setSidebarOpen(false)}>
            <span className="sidebar-logo-icon">A</span>
            <span>AnimalInfo</span>
          </Link>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
            Animal Feedback System
          </p>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--gray-700)', marginTop: '4px' }}>
            v1.0.0
          </p>
        </div>
      </aside>
    </>
  );
}
