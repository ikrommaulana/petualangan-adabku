'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getChildProfile } from '@/lib/firebase-services';
import { getGuestChild } from '@/lib/guest';
import { ChildProfile } from '@/types';
import { worlds } from '@/data/worlds';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function WorldPage() {
  const params = useParams();
  const childId = params.childId as string;
  const { user, loading: authLoading, isGuest } = useAuth();
  const router = useRouter();
  const [child, setChild] = useState<ChildProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user && !isGuest) {
      router.push('/auth/login');
      return;
    }
    if (isGuest && childId === 'guest_child') {
      setChild(getGuestChild());
      setLoading(false);
      return;
    }
    if (user && childId) {
      loadChild();
    }
  }, [user, authLoading, isGuest, childId]);

  const loadChild = async () => {
    try {
      const profile = await getChildProfile(childId);
      setChild(profile);
    } catch (error) {
      console.error('Error loading child:', error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} className="text-6xl">🌍</motion.div>
      </div>
    );
  }

  if (!child) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Profil anak tidak ditemukan</p>
          <Link href="/dashboard" className="btn-primary mt-4 inline-block">Kembali</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => router.push(isGuest ? '/' : '/dashboard')} className="text-2xl">🏠</button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-200 to-secondary-200 flex items-center justify-center text-xl">
              {child.avatarURL ? (
                <img src={child.avatarURL} alt={child.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                child.gender === 'laki-laki' ? '👦' : '👧'
              )}
            </div>
            <div>
              <p className="font-bold text-gray-800">
                {child.name}
                {isGuest && <span className="ml-2 text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">Tamu</span>}
              </p>
              <p className="text-sm text-gray-500">⭐ Level {child.level} · 💎 {child.akhlakPoints} Poin</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href={`/child/${childId}/rewards`} className="text-2xl">🏆</Link>
            <Link href={`/child/${childId}/missions`} className="text-2xl">📋</Link>
          </div>
        </div>

        {isGuest && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-primary-50 border border-primary-200 rounded-2xl text-center"
          >
            <p className="text-sm text-primary-700 font-semibold">
              👀 Mode Tamu — <button onClick={() => router.push('/auth/register')} className="underline">Daftar</button> untuk membuka semua cerita dan menyimpan progress!
            </p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-primary-700">Pilih Dunia</h1>
          <p className="text-gray-500 mt-1">Mau berpetualang ke mana hari ini?</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {worlds.map((world, index) => (
            <motion.div
              key={world.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.15, type: 'spring' }}
            >
              <Link href={`/child/${childId}/world/${world.id}`}>
                <div className={`world-card bg-gradient-to-br ${world.gradient} min-h-[180px] flex flex-col items-center justify-center`}>
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    className="text-6xl mb-3"
                  >
                    {world.emoji}
                  </motion.div>
                  <h2 className="text-2xl font-bold text-shadow-sm">{world.name}</h2>
                  <p className="text-white/80 text-sm mt-1">{world.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {!isGuest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8"
          >
            <div className="card-child">
              <h3 className="text-lg font-bold text-gray-700 mb-3">📊 Progress Anak</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="text-center p-3 bg-primary-50 rounded-xl">
                  <p className="text-2xl font-bold text-primary-600">{child.completedStories.length}</p>
                  <p className="text-xs text-gray-500">Cerita Selesai</p>
                </div>
                <div className="text-center p-3 bg-secondary-50 rounded-xl">
                  <p className="text-2xl font-bold text-secondary-600">{child.completedLessons.length}</p>
                  <p className="text-xs text-gray-500">Pelajaran</p>
                </div>
                <div className="text-center p-3 bg-accent-50 rounded-xl">
                  <p className="text-2xl font-bold text-accent-600">{child.badges.length}</p>
                  <p className="text-xs text-gray-500">Badge</p>
                </div>
                <div className="text-center p-3 bg-success-50 rounded-xl">
                  <p className="text-2xl font-bold text-success-600">{child.level}</p>
                  <p className="text-xs text-gray-500">Level</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
