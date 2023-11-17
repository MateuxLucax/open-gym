'use client';

import {
  ArrowRightOnRectangleIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { Button, Card, Metric, TextInput } from '@tremor/react';
import Spacer from './components/spacer';
import React from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const validEmail = 'mateuxlucax@gmail.com';
const validPassword = '12345678';

export default function IndexPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isLoading) return;

    setIsLoading(true);

    if (email !== validEmail) {
      setEmailError('Email inválido');
      setIsLoading(false);
      return;
    } else {
      setEmailError('');
    }

    if (password !== validPassword) {
      setPasswordError('Senha inválida');
      setIsLoading(false);
      return;
    } else {
      setPasswordError('');
    }

    const randomWait = Math.random() * 1000;
    await new Promise((resolve) => setTimeout(resolve, randomWait));

    setIsLoading(false);
    const user = {
      email,
      name: 'Mateus Lucas',
      image: 'https://avatars.githubusercontent.com/u/35275029?v=4'
    };

    Cookies.set('user', JSON.stringify(user));
    router.push('/dashboard');
  }

  return (
    <Card className="max-w-md my-auto mx-auto">
      <Metric>Entrar</Metric>
      <Spacer height={16} />
      <form onSubmit={handleSubmit}>
        <TextInput
          required
          icon={UserIcon}
          error={!!emailError}
          errorMessage={emailError}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite aqui seu email..."
        />
        <Spacer height={8} />
        <TextInput
          placeholder="Digite sua senha aqui..."
          required
          error={!!passwordError}
          errorMessage={passwordError}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
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
  );
}
