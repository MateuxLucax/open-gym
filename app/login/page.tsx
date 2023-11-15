'use client';

import {
  ArrowRightOnRectangleIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { Button, Card, Metric, TextInput } from '@tremor/react';
import Spacer from '../components/spacer';
import React from 'react';

export default function LoginPage() {
  const [isLoading, setIsLoading] = React.useState(false);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    console.log('handleLogin', event.currentTarget);

    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;

    if (!email || !password) {
      setIsLoading(false);
      return;
    }

    if (email != 'mateuxlucax@gmail.com' || password != '123456') {
      setIsLoading(false);
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const data = {
      email,
      name: 'Mateus Lucas'
    };

    setIsLoading(false);
  }

  return (
    <main className="flex flex-col h-full justify-center align-middle">
      <Card className="max-w-xs mx-auto">
        <Metric>Entrar</Metric>
        <Spacer height={16} />
        <form onSubmit={handleLogin}>
          <TextInput icon={UserIcon} placeholder="Digite aqui seu email..." />
          <Spacer height={8} />
          <TextInput placeholder="Digite sua senha aqui..." type="password" />
          <Spacer height={16} />
          <Button
            loading={isLoading}
            icon={ArrowRightOnRectangleIcon}
            type="submit"
          >
            Login
          </Button>
        </form>
      </Card>
    </main>
  );
}
