
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { LoginButton } from './components/buttons';
import { redirect } from 'next/navigation';

export default async function LoginPage () {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }

  return (
    <article
      className='w-full h-screen app-card app-center'
    >
      <div className="">
        <LoginButton />
      </div>
    </article>
  );
}