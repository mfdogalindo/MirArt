'use client';

import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

export const LoginButton = () => {
  return (
    <button className='button-primary' onClick={() => signIn()}>
      Iniciar sesion con Google
    </button>
  );
};

export const RegisterButton = () => {
  return (
    <Link className='text-blue-500 hover:text-blue-800' href='/register' style={{ marginRight: 10 }}>
      Register
    </Link>
  );
};

export const LogoutButton = () => {
  return (
    <button className='button-danger' onClick={() => signOut()}>
      Salir
    </button>
  );
};

export const ProfileButton = () => {
  return <Link className='text-blue-500 hover:text-blue-800' href='/profile'>Profile</Link>;
};