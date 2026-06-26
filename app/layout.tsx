import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import { ToastProvider } from '@/components/Toast';

export const metadata: Metadata = {
  title: 'AnimalInfo — Animal Feedback System',
  description:
    'A comprehensive wildlife feedback and reporting system. Submit observations, track animal health, and manage conservation data.',
  keywords: ['animals', 'wildlife', 'feedback', 'conservation', 'reporting'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          <div className="app-layout">
            <Navbar />
            <main className="main-content">{children}</main>
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
