'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getChildProfiles } from '@/lib/firebase-services';
import { ChildProfile } from '@/types';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ChildSelectPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [children, setChildren] = useState<ChildProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
      return;
    }
    if (user) {
      loadChildren();
    }
  }, [user, authLoading]);

  const loadChildren = async () => {
    if (!user) return;
    try {
      const kids = await getChildProfiles(user.uid);
      setChildren(kids);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const selectChild = (child: ChildProfile) => {
    localStorage.setItem('currentChildId', child.id);
    router.push(`/child/${child.id}/world`);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} className="text-6xl">👶</motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary-700">Siapa yang Berpetualang?</h1>
          <p className="text-gray-500 mt-2">Pilih profilmu</p>
        </div>

        <div className="flex flex-col gap-4">
          {children.map((child, index) => (
            <motion.button
              key={child.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1, type: 'spring' }}
              onClick={() => selectChild(child)}
              className="card-child flex items-center gap-4 text-left"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-200 to-secondary-200 flex items-center justify-center text-3xl">
                {child.gender === 'laki-laki' ? '👦' : '👧'}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">{child.name}</h3>
                <p className="text-gray-500">⭐ Level {child.level}</p>
              </div>
            </motion.button>
          ))}

          <Link href="/child/create" className="card-child flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 hover:border-primary-400 transition-colors py-6">
            <span className="text-2xl">➕</span>
            <span className="font-bold text-gray-500">Tambah Anak Baru</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
