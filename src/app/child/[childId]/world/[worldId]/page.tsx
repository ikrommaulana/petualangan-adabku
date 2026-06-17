'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getChildProfile } from '@/lib/firebase-services';
import { getGuestChild, isStoryLockedForGuest } from '@/lib/guest';
import { ChildProfile } from '@/types';
import { stories as allStories } from '@/data/stories';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function WorldDetailPage() {
  const params = useParams();
  const childId = params.childId as string;
  const worldId = params.worldId as string;
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

  const worldStories = allStories.filter((s) => s.world === worldId);

  const worldNames: Record<string, string> = {
    rumah: '🏠 Rumah',
    sekolah: '🏫 Sekolah',
    masjid: '🕌 Masjid',
    bermain: '🎮 Bermain',
  };

  const worldColors: Record<string, string> = {
    rumah: 'from-orange-300 to-orange-500',
    sekolah: 'from-blue-300 to-blue-500',
    masjid: 'from-green-300 to-green-500',
    bermain: 'from-purple-300 to-purple-500',
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} className="text-6xl">📖</motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => router.push(`/child/${childId}/world`)} className="text-2xl">⬅️</button>
          <h1 className="text-2xl font-bold text-gray-800">{worldNames[worldId] || worldId}</h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-gradient-to-r ${worldColors[worldId] || 'from-gray-300 to-gray-500'} rounded-3xl p-6 mb-6 text-white`}
        >
          <h2 className="text-xl font-bold">Pilih Cerita</h2>
          <p className="text-white/80 mt-1">Baca cerita dan belajar adab yang baik!</p>
        </motion.div>

        <div className="flex flex-col gap-4">
          {worldStories.map((story, index) => {
            const isCompleted = child?.completedStories.includes(story.id);
            const locked = isGuest && isStoryLockedForGuest(index);

            return (
              <motion.div
                key={story.id}
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {locked ? (
                  <div className={`card-child flex items-center gap-4 opacity-60 ${isCompleted ? 'border-2 border-success-300 bg-success-50' : ''}`}>
                    <div className="text-4xl">🔒</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800">{story.title}</h3>
                      <p className="text-sm text-gray-500">{story.description}</p>
                      <div className="flex gap-2 mt-2">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                          story.difficulty === 'mudah' ? 'bg-green-100 text-green-700' :
                          story.difficulty === 'sedang' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {story.difficulty === 'mudah' ? '⭐' : story.difficulty === 'sedang' ? '⭐⭐' : '⭐⭐⭐'} {story.difficulty}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => router.push('/auth/register')}
                      className="btn-primary text-xs px-3 py-1.5"
                    >
                      🔓 Buka
                    </button>
                  </div>
                ) : (
                  <Link href={`/child/${childId}/story/${story.id}`}>
                    <div className={`card-child flex items-center gap-4 ${isCompleted ? 'border-2 border-success-300 bg-success-50' : ''}`}>
                      <div className="text-4xl">
                        {isCompleted ? '✅' : '📖'}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800">{story.title}</h3>
                        <p className="text-sm text-gray-500">{story.description}</p>
                        <div className="flex gap-2 mt-2">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                            story.difficulty === 'mudah' ? 'bg-green-100 text-green-700' :
                            story.difficulty === 'sedang' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {story.difficulty === 'mudah' ? '⭐' : story.difficulty === 'sedang' ? '⭐⭐' : '⭐⭐⭐'} {story.difficulty}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-600">
                            Usia {story.minAge}-{story.maxAge} tahun
                          </span>
                        </div>
                      </div>
                      <div className="text-2xl">➡️</div>
                    </div>
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>

        {worldStories.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <p className="text-gray-500">Belum ada cerita di dunia ini</p>
          </div>
        )}
      </div>
    </div>
  );
}
