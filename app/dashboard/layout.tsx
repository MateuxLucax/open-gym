'use client';

import Sidebar from '../components/sidebar';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </>
  );
}
