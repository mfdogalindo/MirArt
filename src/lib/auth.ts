import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

/**
 * Proveedores de autenticación con NextAuth
 */
export const authOptions : AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_AUTH_ID || '',
      clientSecret: process.env.GOOGLE_AUTH_SECRET || ''
    })
  ],
  session: {
    strategy: 'jwt'
  }
};

export default NextAuth(authOptions);