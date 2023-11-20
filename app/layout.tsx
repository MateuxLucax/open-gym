import './assets/style/globals.css';

import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OpenGym',
  description: 'Gerencimanto de academias, treinos e alunos.',
  icons: ['/assets/icon.png']
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className="h-screen w-screen flex bg-gray-50">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
