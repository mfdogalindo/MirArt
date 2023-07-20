import { authOptions } from '@/lib/auth';
import NextAuth from 'next-auth';

/**
 * Handler para la autenticación de usuarios usando NextAuth
 */
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };