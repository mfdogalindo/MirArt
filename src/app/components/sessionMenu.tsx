/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useRef, useState } from 'react';
import { LogoutButton } from '../login/components/buttons';
import { Session } from 'next-auth';

export default function SessionMenu ({ session }: { session: Session}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<any>(null);

  useEffect(() => {
    const handleClickOutside = (event: { target: unknown; }) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuRef]);

  return (

    <div className='relative' ref={menuRef}>
      <div className='flex items-center justify-center  cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
        {session.user?.name && session.user?.image && (
          <img
            className='w-10 h-10 rounded-full border-2 border-purple-900'
            src={session.user?.image}
            alt={session.user?.name}
          />)}

      </div>
      {isOpen && (
        <div className='grid grid-cols-1 divide-y dark:divide-zinc-700 space-y-2 absolute top-9 right-2 z-10 bg-white dark:bg-zinc-900 border dark:border-zinc-700 rounded shadow-md p-2 mt-2 w-64'>
          <div className='flex w-full bg-zinc-100 dark:bg-black p-2 rounded-md'>
            {session.user?.name && session.user?.image && (
              <img
                className='w-14 h-14 rounded-full border-2 border-purple-900'
                src={session.user?.image}
                alt={session.user?.name}
              />
            )}
            <div className='pl-2'>
              <p className='text-sm text-zinc-500 dark:text-zinc-200 text-ellipsis overflow-hidden'>{session.user?.name}</p>
              <p className='text-sm text-zinc-500 dark:text-zinc-400 text-ellipsis overflow-hidden'>{session.user?.email}</p>
            </div>

          </div>
          <div className='pt-2'>
            <LogoutButton />
          </div>

        </div>
      )}
    </div>

  );
}