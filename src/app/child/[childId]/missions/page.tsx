'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  getChildProfile,
  getMissionProgress,
  saveMissionProgress,
  addPointsToChild,
} from '@/lib/firebase-services';
import { getGuestChild, updateGuestChild, isMissionLockedForGuest } from '@/lib/guest';
import { ChildProfile, MissionProgress } from '@/types';
import { getDailyMissions, dailyMissions } from '@/data/missions';
import { motion } from 'motion/react';
import Link from 'next/link';

export default function MissionsPage() {
  const params = useParams();
  const childId = params.childId as string;
  const { user, loading: authLoading, isGuest } = useAuth();
  const router = useRouter();
  const [child, setChild] = useState<ChildProfile | null>(null);
  const [todayMissions, setTodayMissions] = useState(getDailyMissions(3));
  const [missionProgress, setMissionProgress] = useState<MissionProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (!authLoading && !user && !isGuest) {
      router.push('/auth/login');
      return;
    }
    if (isGuest && childId === 'guest_child') {
      setChild(getGuestChild());
      const saved = localStorage.getItem('guestMissionProgress');
      if (saved) {
        try { setMissionProgress(JSON.parse(saved)); } catch {}
      }
      setLoading(false);
      return;
    }
    if (user) {
      loadData();
    }
  }, [user, authLoading, isGuest, childId]);

  const loadData = async () => {
    try {
      const [profile, progress] = await Promise.all([
        getChildProfile(childId),
        getMissionProgress(childId, today),
      ]);
      setChild(profile);
      setMissionProgress(progress);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteMission = async (missionId: string) => {
    const existing = missionProgress.find((p) => p.missionId === missionId);
    if (existing) return;

    const mission = dailyMissions.find((m) => m.id === missionId);
    if (!mission) return;

    if (isGuest) {
      const newProgress: MissionProgress = {
        id: `guest_${missionId}`,
        childId: 'guest_child',
        missionId,
        date: today,
        completed: true,
        verifiedByParent: false,
      };
      const updated = [...missionProgress, newProgress];
      setMissionProgress(updated);
      localStorage.setItem('guestMissionProgress', JSON.stringify(updated));

      const guest = getGuestChild();
      updateGuestChild({
        akhlakPoints: guest.akhlakPoints + mission.points,
        level: Math.floor((guest.akhlakPoints + mission.points) / 100) + 1,
      });
      setChild(getGuestChild());
      return;
    }

    try {
      await saveMissionProgress({
        childId,
        missionId,
        date: today,
        completed: true,
        verifiedByParent: false,
      });
      await addPointsToChild(childId, mission.points);
      loadData();
    } catch (error) {
      console.error('Error completing mission:', error);
    }
  };

  const isCompleted = (missionId: string) => {
    return missionProgress.some((p) => p.missionId === missionId && p.completed);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} className="text-6xl">📋</motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Link href={`/child/${childId}/world`} className="text-2xl">⬅️</Link>
          <h1 className="text-2xl font-bold text-gray-800">📋 Misi Harian</h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-accent-300 to-accent-500 rounded-3xl p-6 mb-6 text-white"
        >
          <h2 className="text-xl font-bold">Misi Hari Ini!</h2>
          <p className="text-white/80 mt-1">
            {isGuest ? 'Selesaikan misi pertama sebagai tamu!' : 'Selesaikan misi dan minta orang tua untuk memverifikasi'}
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          {todayMissions.map((mission, index) => {
            const completed = isCompleted(mission.id);
            const locked = isGuest && isMissionLockedForGuest(index);

            return (
              <motion.div
                key={mission.id}
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`card-child ${completed ? 'border-2 border-success-300 bg-success-50' : ''} ${locked ? 'opacity-60' : ''}`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{locked ? '🔒' : mission.emoji}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800">{mission.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{mission.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-accent-100 text-accent-700">
                        💎 {mission.points} poin
                      </span>
                      {completed && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-success-100 text-success-700">
                          ✅ Selesai
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    {locked ? (
                      <button
                        onClick={() => router.push('/auth/register')}
                        className="btn-primary text-xs px-3 py-1.5"
                      >
                        🔓 Buka
                      </button>
                    ) : !completed ? (
                      <button
                        onClick={() => handleCompleteMission(mission.id)}
                        className="btn-success text-sm px-4 py-2"
                      >
                        ✅ Selesai
                      </button>
                    ) : (
                      <span className="text-3xl">🌟</span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 card-child text-center"
        >
          <p className="text-gray-600">
            💡 <strong>Tips:</strong> {isGuest
              ? 'Daftar untuk menyimpan progress dan membuka semua misi!'
              : 'Setelah menyelesaikan misi, minta Ayah/Ibu untuk memverifikasi di menu orang tua!'
            }
          </p>
        </motion.div>
      </div>
    </div>
  );
}
