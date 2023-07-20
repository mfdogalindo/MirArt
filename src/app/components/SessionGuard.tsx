import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import React from 'react';

interface AsyncGuardProps {
  children: React.ReactNode;
}

async function AsyncGuard ({ children }: AsyncGuardProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <div>
      {children}
    </div>
  );
}

export default function SessionGuard ({ children }: AsyncGuardProps) {
  return (
    <>
      <AsyncGuard>
        {children}
      </AsyncGuard>
    </>
  );
}