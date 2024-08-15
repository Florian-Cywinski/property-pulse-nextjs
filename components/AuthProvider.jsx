'use client';
import { SessionProvider } from 'next-auth/react';

const AuthProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>; // To wrap the children (the content to be wrapped) in the SessionProvider
};
export default AuthProvider;
