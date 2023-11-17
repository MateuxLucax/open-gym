'use client';

import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid';
import { classNames } from './utils';

const navigation = [{ name: 'Tela inicial', href: '/dashboard' }];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === '/') {
    return <> </>;
  }

  const userJson = Cookies.get('user');
  const user = userJson ? JSON.parse(userJson) : null;

  if (!user) {
    router.push('/');
    return <> </>;
  }

  return (
    <aside className="h-screen fixed top-0 w-64 bg-white flex flex-col">
      <div className="flex-shrink-0">
        <div className="px-4 py-4">
          <div className="flex items-center justify-center h-12 relative w-full">
            <Image
              src="/assets/logo-full.svg"
              alt="OpenGym logo"
              fill={true}
              style={{ objectFit: 'contain', width: '100%', height: '100%' }}
            />
          </div>
        </div>
        <nav className="flex-1">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={classNames(
                pathname === item.href
                  ? 'bg-slate-50 border-slate-500 text-slate-700'
                  : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
              )}
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>
      <div className="flex-shrink-0 mt-auto">
        <div className="flex items-center px-4">
          <div className="flex-shrink-0">
            <Image
              className="h-8 w-8 rounded-full"
              src={user?.image || 'https://avatar.vercel.sh/leerob'}
              height={32}
              width={32}
              alt={`${user?.name || 'placeholder'} avatar`}
            />
          </div>
          <div className="ml-3">
            <div className="text-base font-medium text-gray-800">
              {user.name}
            </div>
            <div className="text-sm font-medium text-gray-500">
              {user.email}
            </div>
          </div>
        </div>
        <div className="mt-3 space-y-1">
          <button
            onClick={() => {
              Cookies.remove('user');
              router.push('/');
            }}
            className="w-full flex gap-2 px-4 py-2 text-left text-base font-medium text-gray-500 hover:bg-gray-100"
          >
            <ArrowLeftOnRectangleIcon className="h-6 w-6 text-gray-500" />
            Sign out
          </button>
        </div>
      </div>
    </aside>
  );
}
