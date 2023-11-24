'use client';

import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid';
import { classNames, user } from '../utils';
import { Select, SelectItem } from '@tremor/react';
import {
  AcademicCapIcon,
  BanknotesIcon,
  CreditCardIcon,
  CubeIcon,
  HomeIcon,
  RectangleStackIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline';
import {
  AcademicCapIcon as AcademicCapIconSolid,
  BanknotesIcon as BanknotesIconSolid,
  CreditCardIcon as CreditCardIconSolid,
  CubeIcon as CubeIconSolid,
  HomeIcon as HomeIconSolid,
  RectangleStackIcon as RectangleStackIconSolid,
  UserGroupIcon as UserGroupIconSolid,
  WrenchScrewdriverIcon as WrenchScrewdriverIconSolid
} from '@heroicons/react/24/solid';

const navigation = [
  {
    name: 'Tela inicial',
    href: '/dashboard',
    icon: HomeIcon,
    selectedIcon: HomeIconSolid
  },
  {
    name: 'Produtos',
    href: '/dashboard/products',
    icon: CubeIcon,
    selectedIcon: CubeIconSolid
  },
  {
    name: 'Vendas',
    href: '/dashboard/sales',
    icon: CreditCardIcon,
    selectedIcon: CreditCardIconSolid
  },
  {
    name: 'Membros',
    href: '/dashboard/members',
    icon: UserGroupIcon,
    selectedIcon: UserGroupIconSolid
  },
  {
    name: 'Matriculas',
    href: '/dashboard/enrollments',
    icon: RectangleStackIcon,
    selectedIcon: RectangleStackIconSolid
  },
  {
    name: 'Equipamentos',
    href: '/dashboard/equipments',
    icon: WrenchScrewdriverIcon,
    selectedIcon: WrenchScrewdriverIconSolid
  },
  {
    name: 'Instrutores',
    href: '/dashboard/instructors',
    icon: AcademicCapIcon,
    selectedIcon: AcademicCapIconSolid
  },
  {
    name: 'Fluxo de Caixa',
    href: '/dashboard/cash-flow',
    icon: BanknotesIcon,
    selectedIcon: BanknotesIconSolid
  }
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white flex flex-col">
      <div className="flex-shrink-0">
        <div className="px-4 py-4">
          <div className="flex items-center justify-center h-12 relative w-full">
            <Image
              src="/assets/logo-full.svg"
              alt="OpenGym logo"
              fill
              style={{ objectFit: 'contain', width: '100%', height: '100%' }}
            />
          </div>
          <Select className="mt-4" disabled value="1">
            <SelectItem value="1">Rio do Sul</SelectItem>
          </Select>
        </div>
        <nav className="flex-1">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={classNames(
                'flex flex-row items-center gap-2',
                pathname === item.href
                  ? 'bg-slate-50 border-slate-500 text-slate-700'
                  : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
              )}
            >
              {pathname === item.href ? (
                <item.selectedIcon height={24} />
              ) : (
                <item.icon height={24} />
              )}
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
              src={user.image || 'https://avatar.vercel.sh/leerob'}
              height={32}
              width={32}
              alt={`${user.name || 'placeholder'} avatar`}
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
        <div className="my-4 space-y-1">
          <button
            onClick={() => {
              Cookies.remove('user');
              router.push('/');
            }}
            className="w-full flex gap-2 px-4 py-2 text-left text-base font-medium text-gray-500 hover:bg-gray-100"
          >
            <ArrowLeftOnRectangleIcon className="h-6 w-6 text-gray-500" />
            Sair
          </button>
        </div>
      </div>
    </aside>
  );
}
