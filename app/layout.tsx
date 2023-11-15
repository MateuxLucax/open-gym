import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/navbar';
import { Suspense } from 'react';

export const metadata = {
  title: 'OpenGym',
  description: 'Gerencimanto de academias, treinos e alunos.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" className="h-full bg-gray-50">
      <body className="h-full">
        <Suspense>
          <Navbar />
        </Suspense>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
