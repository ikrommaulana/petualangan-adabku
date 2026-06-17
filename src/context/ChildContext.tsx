'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ChildProfile } from '@/types';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';

const GUEST_CHILD_ID = 'guest_child';

const guestChild: ChildProfile = {
  id: GUEST_CHILD_ID,
  parentId: 'guest',
  name: 'Tamu',
  age: 6,
  gender: 'laki-laki',
  photoURL: '',
  avatarURL: '',
  akhlakPoints: 0,
  level: 1,
  badges: [],
  cosmetics: [],
  completedStories: [],
  completedLessons: [],
  createdAt: new Date().toISOString(),
};

interface ChildContextType {
  currentChild: ChildProfile | null;
  setCurrentChild: (child: ChildProfile | null) => void;
  loading: boolean;
  refreshChild: () => Promise<void>;
}

const ChildContext = createContext<ChildContextType>({
  currentChild: null,
  setCurrentChild: () => {},
  loading: true,
  refreshChild: async () => {},
});

export function ChildProvider({ children }: { children: ReactNode }) {
  const { isGuest } = useAuth();
  const [currentChild, setCurrentChild] = useState<ChildProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshChild = async () => {
    if (isGuest) {
      const saved = localStorage.getItem('guestChild');
      if (saved) {
        try { setCurrentChild(JSON.parse(saved)); } catch { setCurrentChild(guestChild); }
      } else {
        setCurrentChild(guestChild);
        localStorage.setItem('guestChild', JSON.stringify(guestChild));
      }
      setLoading(false);
      return;
    }

    const stored = localStorage.getItem('currentChildId');
    if (!stored) {
      setCurrentChild(null);
      setLoading(false);
      return;
    }
    try {
      const docSnap = await getDoc(doc(db, 'children', stored));
      if (docSnap.exists()) {
        setCurrentChild({ id: docSnap.id, ...docSnap.data() } as ChildProfile);
      } else {
        localStorage.removeItem('currentChildId');
        setCurrentChild(null);
      }
    } catch {
      setCurrentChild(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    refreshChild();
  }, [isGuest]);

  const handleSetChild = (child: ChildProfile | null) => {
    setCurrentChild(child);
    if (isGuest) {
      if (child) {
        localStorage.setItem('guestChild', JSON.stringify(child));
      } else {
        localStorage.removeItem('guestChild');
      }
    } else {
      if (child) {
        localStorage.setItem('currentChildId', child.id);
      } else {
        localStorage.removeItem('currentChildId');
      }
    }
  };

  return (
    <ChildContext.Provider value={{ currentChild, setCurrentChild: handleSetChild, loading, refreshChild }}>
      {children}
    </ChildContext.Provider>
  );
}

export function useChild() {
  return useContext(ChildContext);
}
