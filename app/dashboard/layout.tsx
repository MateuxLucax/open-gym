'use client';

import { classNames } from '../components/utils';
import dynamic from 'next/dynamic';

const Sidebar = dynamic(() => import('../components/sidebar'), { ssr: false });

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <main
        className={classNames('flex', 'flex-1', 'flex-col', 'p-8', 'ml-64')}
      >
        {children}
      </main>
    </>
  );
}
