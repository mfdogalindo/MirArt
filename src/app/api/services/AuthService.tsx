import 'server-only';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function notAuthorized () {
   const session = await getServerSession(authOptions);
   let result = false;

   let authorizedUsers = process.env.AUTHORIZED_USERS ? process.env.AUTHORIZED_USERS.split(',') : [];

   if(session && session.user?.email){
      result = authorizedUsers.includes(session.user?.email);
   }
   return !result;
}