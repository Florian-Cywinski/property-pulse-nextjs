'use client';
import { createContext, useContext, useState, useEffect } from 'react'; // createContext is a function  // useContext is a hook
import getUnreadMessageCount from '@/app/actions/getUnreadMessageCount';
import { useSession } from 'next-auth/react';

// Create context
const GlobalContext = createContext();

// Create a provider (the app is wrapped in the provider in order to have access to that content so that every component in the app can get access to it)
export function GlobalProvider({ children }) {  // children is everything in the provider
  const [unreadCount, setUnreadCount] = useState(0);  // Every component has access to this state

  const { data: session } = useSession();

  useEffect(() => {
    if (session && session.user) {
      getUnreadMessageCount().then((res) => {
        if (res.count) setUnreadCount(res.count);
      });
    }
  }, [getUnreadMessageCount, session]);

  return (
    <GlobalContext.Provider
      value={{
        unreadCount,      // That every component has access to the state
        setUnreadCount,   // That every component can change the state
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

// Create a custom hook to access context
export function useGlobalContext() {
  return useContext(GlobalContext);
}
