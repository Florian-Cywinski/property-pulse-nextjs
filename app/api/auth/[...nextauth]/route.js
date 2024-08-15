// Whenever a GET or POST request is made to api/auth NextAuth(authOptions) is gonna take over

import { authOptions } from '@/utils/authOptions';
import NextAuth from 'next-auth/next';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
