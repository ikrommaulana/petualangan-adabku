'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  getChildProfiles,
  getMissionProgress,
  verifyMission,
  addPointsToChild,
} from '@/lib/firebase-services';
import { ChildProfile, MissionProgress } from '@/types';
import { dailyMissions } from '@/data/missions';
import { motion } from 'motion/react';
import Link from 'next/link';

export default function ParentMissionsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [children, setChildren] = useState<ChildProfile[]>([]);
  const [selectedChild, setSelectedChild] = useState<ChildProfile | null>(null);
  const [missions, setMissions] = useState<MissionProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const today = new Date().toISOString().split('T')[0];

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
      if (kids.length > 0) {
        setSelectedChild(kids[0]);
        loadMissions(kids[0].id);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMissions = async (childId: string) => {
    try {
      const progress = await getMissionProgress(childId, today);
      setMissions(progress);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSelectChild = (child: ChildProfile) => {
    setSelectedChild(child);
    loadMissions(child.id);
  };

  const handleVerify = async (missionProgress: MissionProgress) => {
    try {
      await verifyMission(missionProgress.id);
      const mission = dailyMissions.find((m) => m.id === missionProgress.missionId);
      if (mission && selectedChild) {
        await addPointsToChild(selectedChild.id, mission.points);
        loadMissions(selectedChild.id);
      }
    } catch (error) {
      console.error('Error verifying:', error);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} className="text-6xl">📋</motion.div>
      </div>
    );
  }

  const pending = missions.filter((m) => m.completed && !m.verifiedByParent);
  const verified = missions.filter((m) => m.verifiedByParent);

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/dashboard" className="text-2xl">⬅️</Link>
          <h1 className="text-2xl font-bold text-gray-800">📋 Verifikasi Misi</h1>
        </div>

        {children.length > 1 && (
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {children.map((child) => (
              <button
                key={child.id}
                onClick={() => handleSelectChild(child)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
                  selectedChild?.id === child.id
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-white text-gray-600'
                }`}
              >
                <span className="text-xl">{child.gender === 'laki-laki' ? '👦' : '👧'}</span>
                {child.name}
              </button>
            ))}
          </div>
        )}

        {selectedChild && (
          <>
            {pending.length > 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
                <h2 className="text-lg font-bold text-accent-700 mb-3">⏳ Menunggu Verifikasi ({pending.length})</h2>
                {pending.map((mission) => {
                  const missionData = dailyMissions.find((m) => m.id === mission.missionId);
                  return (
                    <motion.div
                      key={mission.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="card-child mb-3 border-2 border-accent-300"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-4xl">{missionData?.emoji || '📋'}</span>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800">{missionData?.title || mission.missionId}</h3>
                          <p className="text-sm text-gray-600">{missionData?.description}</p>
                        </div>
                        <button
                          onClick={() => handleVerify(mission)}
                          className="btn-success text-sm"
                        >
                          ✅ Verifikasi
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <div className="card-child text-center py-8 mb-6">
                <span className="text-5xl block mb-3">✅</span>
                <p className="text-gray-600 font-semibold">Tidak ada misi yang menunggu verifikasi</p>
              </div>
            )}

            {verified.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-success-700 mb-3">✅ Sudah Diverifikasi ({verified.length})</h2>
                {verified.map((mission) => {
                  const missionData = dailyMissions.find((m) => m.id === mission.missionId);
                  return (
                    <div key={mission.id} className="card-child mb-3 bg-success-50 border border-success-200">
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">{missionData?.emoji || '📋'}</span>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-700">{missionData?.title || mission.missionId}</h3>
                        </div>
                        <span className="text-success-600 font-bold">✅</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
