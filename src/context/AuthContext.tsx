'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isGuest: boolean;
  enterGuestMode: () => void;
  exitGuestMode: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isGuest: false,
  enterGuestMode: () => {},
  exitGuestMode: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const guestFlag = localStorage.getItem('guestMode');
    if (guestFlag === 'true') {
      setIsGuest(true);
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
      if (firebaseUser) {
        localStorage.removeItem('guestMode');
        setIsGuest(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const enterGuestMode = () => {
    localStorage.setItem('guestMode', 'true');
    setIsGuest(true);
  };

  const exitGuestMode = () => {
    localStorage.removeItem('guestMode');
    localStorage.removeItem('guestChildId');
    setIsGuest(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, isGuest, enterGuestMode, exitGuestMode }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
