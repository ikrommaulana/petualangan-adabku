'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  getChildProfiles,
  getAllStoryProgress,
  getWeeklyMissionProgress,
  getMissionProgress,
  verifyMission,
} from '@/lib/firebase-services';
import { ChildProfile, StoryProgress, MissionProgress } from '@/types';
import { badges } from '@/data/worlds';
import { motion } from 'motion/react';
import Link from 'next/link';

export default function ReportsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [children, setChildren] = useState<ChildProfile[]>([]);
  const [selectedChild, setSelectedChild] = useState<ChildProfile | null>(null);
  const [storyProgress, setStoryProgress] = useState<StoryProgress[]>([]);
  const [missionProgress, setMissionProgress] = useState<MissionProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'missions' | 'stories'>('overview');

  const today = new Date().toISOString().split('T')[0];
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);

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
        loadChildData(kids[0].id);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadChildData = async (childId: string) => {
    try {
      const [stories, missions] = await Promise.all([
        getAllStoryProgress(childId),
        getWeeklyMissionProgress(childId, weekStart.toISOString().split('T')[0], weekEnd.toISOString().split('T')[0]),
      ]);
      setStoryProgress(stories);
      setMissionProgress(missions);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSelectChild = (child: ChildProfile) => {
    setSelectedChild(child);
    loadChildData(child.id);
  };

  const handleVerifyMission = async (progressId: string) => {
    try {
      await verifyMission(progressId);
      if (selectedChild) {
        loadChildData(selectedChild.id);
      }
    } catch (error) {
      console.error('Error verifying:', error);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} className="text-6xl">📊</motion.div>
      </div>
    );
  }

  const completedStories = storyProgress.filter((s) => s.completed);
  const totalPoints = completedStories.reduce((sum, s) => sum + s.pointsEarned, 0);
  const completedMissions = missionProgress.filter((m) => m.completed);
  const verifiedMissions = missionProgress.filter((m) => m.verifiedByParent);
  const pendingVerifications = missionProgress.filter((m) => m.completed && !m.verifiedByParent);

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-2xl">⬅️</Link>
            <h1 className="text-2xl font-bold text-gray-800">📊 Laporan Orang Tua</h1>
          </div>
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
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="card-child mb-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-200 to-secondary-200 flex items-center justify-center text-3xl">
                  {selectedChild.gender === 'laki-laki' ? '👦' : '👧'}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{selectedChild.name}</h2>
                  <p className="text-gray-500">{selectedChild.age} tahun</p>
                </div>
                <div className="ml-auto flex gap-3">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-accent-600">⭐ {selectedChild.level}</p>
                    <p className="text-xs text-gray-500">Level</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary-600">💎 {selectedChild.akhlakPoints}</p>
                    <p className="text-xs text-gray-500">Poin</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="flex gap-2 mb-6">
              {[
                { id: 'overview' as const, label: '📊 Ringkasan' },
                { id: 'missions' as const, label: '📋 Misi', badge: pendingVerifications.length },
                { id: 'stories' as const, label: '📖 Cerita' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all relative ${
                    activeTab === tab.id
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'bg-white text-gray-600'
                  }`}
                >
                  {tab.label}
                  {tab.badge && tab.badge > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {tab.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {activeTab === 'overview' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="card-child text-center">
                    <p className="text-3xl font-bold text-primary-600">{completedStories.length}</p>
                    <p className="text-sm text-gray-500">Cerita Selesai</p>
                  </div>
                  <div className="card-child text-center">
                    <p className="text-3xl font-bold text-success-600">{completedMissions.length}</p>
                    <p className="text-sm text-gray-500">Misi Selesai</p>
                  </div>
                  <div className="card-child text-center">
                    <p className="text-3xl font-bold text-accent-600">{totalPoints}</p>
                    <p className="text-sm text-gray-500">Poin Minggu Ini</p>
                  </div>
                  <div className="card-child text-center">
                    <p className="text-3xl font-bold text-secondary-600">{selectedChild.badges.length}</p>
                    <p className="text-sm text-gray-500">Badge</p>
                  </div>
                </div>

                <div className="card-child mb-6">
                  <h3 className="text-lg font-bold text-gray-700 mb-3">🏅 Badge yang Diraih</h3>
                  <div className="flex flex-wrap gap-3">
                    {badges.map((badge) => {
                      const earned = selectedChild.badges.includes(badge.id);
                      return (
                        <div
                          key={badge.id}
                          className={`flex items-center gap-2 px-3 py-2 rounded-xl ${
                            earned ? 'bg-accent-50 border border-accent-200' : 'bg-gray-50 opacity-40'
                          }`}
                        >
                          <span className="text-xl">{earned ? badge.emoji : '🔒'}</span>
                          <span className="text-sm font-semibold">{badge.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="card-child">
                  <h3 className="text-lg font-bold text-gray-700 mb-3">📚 Pelajaran yang Dipelajari</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedChild.completedLessons.length > 0 ? (
                      selectedChild.completedLessons.map((lesson) => (
                        <span key={lesson} className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-semibold">
                          {lesson.replace(/_/g, ' ')}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-400">Belum ada pelajaran yang diselesaikan</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'missions' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {pendingVerifications.length > 0 && (
                  <div className="card-child mb-4 border-2 border-accent-300 bg-accent-50">
                    <h3 className="text-lg font-bold text-accent-800 mb-3">⏳ Menunggu Verifikasi</h3>
                    {pendingVerifications.map((mission) => (
                      <div key={mission.id} className="flex items-center justify-between p-3 bg-white rounded-xl mb-2">
                        <div>
                          <p className="font-bold text-gray-800">{mission.missionId}</p>
                          <p className="text-sm text-gray-500">Anak mengaku sudah menyelesaikan misi</p>
                        </div>
                        <button
                          onClick={() => handleVerifyMission(mission.id)}
                          className="btn-success text-sm px-4 py-2"
                        >
                          ✅ Verifikasi
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="card-child">
                  <h3 className="text-lg font-bold text-gray-700 mb-3">📋 Misi Minggu Ini</h3>
                  {missionProgress.length > 0 ? (
                    missionProgress.map((mission) => (
                      <div key={mission.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl mb-2">
                        <span className="text-xl">{mission.verifiedByParent ? '✅' : mission.completed ? '⏳' : '❌'}</span>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-700">{mission.missionId}</p>
                          <p className="text-xs text-gray-500">{mission.date}</p>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                          mission.verifiedByParent
                            ? 'bg-success-100 text-success-700'
                            : mission.completed
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-gray-100 text-gray-500'
                        }`}>
                          {mission.verifiedByParent ? 'Diverifikasi' : mission.completed ? 'Menunggu' : 'Belum'}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-center py-4">Belum ada misi minggu ini</p>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'stories' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="card-child">
                  <h3 className="text-lg font-bold text-gray-700 mb-3">📖 Cerita yang Dibaca</h3>
                  {completedStories.length > 0 ? (
                    completedStories.map((progress) => (
                      <div key={progress.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl mb-2">
                        <span className="text-xl">📖</span>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-700">{progress.storyId.replace(/_/g, ' ')}</p>
                          <p className="text-xs text-gray-500">
                            {progress.completedAt ? new Date(progress.completedAt).toLocaleDateString('id-ID') : 'Sedang berlangsung'}
                          </p>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-primary-100 text-primary-700">
                          💎 {progress.pointsEarned} poin
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-center py-4">Belum ada cerita yang diselesaikan</p>
                  )}
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
