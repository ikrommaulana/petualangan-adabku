'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getChildProfile } from '@/lib/firebase-services';
import { getGuestChild } from '@/lib/guest';
import { ChildProfile } from '@/types';
import { badges, cosmetics } from '@/data/worlds';
import { motion } from 'motion/react';
import Link from 'next/link';

export default function RewardsPage() {
  const params = useParams();
  const childId = params.childId as string;
  const { user, loading: authLoading, isGuest } = useAuth();
  const router = useRouter();
  const [child, setChild] = useState<ChildProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'badges' | 'cosmetics' | 'level'>('badges');

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
    if (user) {
      loadChild();
    }
  }, [user, authLoading, isGuest, childId]);

  const loadChild = async () => {
    try {
      const profile = await getChildProfile(childId);
      setChild(profile);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} className="text-6xl">🏆</motion.div>
      </div>
    );
  }

  if (!child) return null;

  const levelThresholds = [0, 50, 150, 300, 500, 800, 1200, 1700, 2300, 3000];
  const currentLevelPoints = levelThresholds[child.level - 1] || 0;
  const nextLevelPoints = levelThresholds[child.level] || 3000;
  const progressToNext = ((child.akhlakPoints - currentLevelPoints) / (nextLevelPoints - currentLevelPoints)) * 100;

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Link href={`/child/${childId}/world`} className="text-2xl">⬅️</Link>
          <h1 className="text-2xl font-bold text-gray-800">🏆 Pencapaian</h1>
        </div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="card-child mb-6 text-center"
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-accent-300 to-accent-500 flex items-center justify-center text-4xl mb-3">
            {child.avatarURL ? (
              <img src={child.avatarURL} alt={child.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              child.gender === 'laki-laki' ? '👦' : '👧'
            )}
          </div>
          <h2 className="text-xl font-bold text-gray-800">{child.name}</h2>
          <div className="mt-3 flex justify-center gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-accent-600">⭐ {child.level}</p>
              <p className="text-sm text-gray-500">Level</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary-600">💎 {child.akhlakPoints}</p>
              <p className="text-sm text-gray-500">Poin Akhlak</p>
            </div>
          </div>
          {child.level < 10 && (
            <div className="mt-4">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${Math.min(progressToNext, 100)}%` }} />
              </div>
              <p className="text-xs text-gray-500 mt-1">{child.akhlakPoints}/{nextLevelPoints} poin ke level berikutnya</p>
            </div>
          )}
        </motion.div>

        <div className="flex gap-2 mb-6">
          {[
            { id: 'badges' as const, label: '🏅 Badge', count: child.badges.length },
            { id: 'cosmetics' as const, label: '👗 Koleksi', count: child.cosmetics.length },
            { id: 'level' as const, label: '⭐ Level', count: child.level },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'bg-white text-gray-600'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {activeTab === 'badges' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {badges.map((badge, index) => {
              const earned = child.badges.includes(badge.id);
              return (
                <motion.div
                  key={badge.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={earned ? 'badge-earned' : 'badge-locked'}
                >
                  <span className="text-4xl">{earned ? badge.emoji : '🔒'}</span>
                  <p className="text-sm font-bold mt-2">{badge.name}</p>
                  <p className="text-xs text-gray-500">{badge.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {activeTab === 'cosmetics' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {cosmetics.map((cosmetic, index) => {
              const owned = child.cosmetics.includes(cosmetic.id);
              return (
                <motion.div
                  key={cosmetic.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`card-child text-center ${owned ? '' : 'opacity-60'}`}
                >
                  <span className="text-4xl">{cosmetic.emoji}</span>
                  <p className="text-sm font-bold mt-2">{cosmetic.name}</p>
                  <p className="text-xs text-gray-500">
                    {owned ? '✅ Dimiliki' : `💎 ${cosmetic.pointsRequired} poin`}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {activeTab === 'level' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card-child">
            <h3 className="text-lg font-bold text-gray-700 mb-4">Level & Poin</h3>
            <div className="flex flex-col gap-3">
              {levelThresholds.map((threshold, index) => {
                const level = index + 1;
                const isReached = child.level >= level;
                return (
                  <div
                    key={level}
                    className={`flex items-center gap-3 p-3 rounded-xl ${
                      isReached ? 'bg-accent-50 border-2 border-accent-200' : 'bg-gray-50 border-2 border-gray-200'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      isReached ? 'bg-accent-400 text-white' : 'bg-gray-300 text-gray-500'
                    }`}>
                      {level}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-700">Level {level}</p>
                      <p className="text-sm text-gray-500">{threshold} poin</p>
                    </div>
                    {isReached && <span className="text-xl">✅</span>}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
