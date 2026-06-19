'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getChildProfiles, logoutParent } from '@/lib/firebase-services';
import { ChildProfile } from '@/types';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, loading: authLoading, isGuest, exitGuestMode } = useAuth();
  const router = useRouter();
  const [children, setChildren] = useState<ChildProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isGuest) {
      router.push('/child/guest_child/world');
      return;
    }
    if (!authLoading && !user) {
      router.push('/auth/login');
      return;
    }
    if (user) {
      loadChildren();
    }
  }, [user, authLoading, isGuest]);

  const loadChildren = async () => {
    if (!user) return;
    try {
      const kids = await getChildProfiles(user.uid);
      setChildren(kids);
    } catch (error) {
      console.error('Error loading children:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    if (isGuest) {
      exitGuestMode();
      router.push('/');
      return;
    }
    await logoutParent();
    router.push('/');
  };

  const selectChild = (child: ChildProfile) => {
    localStorage.setItem('currentChildId', child.id);
    router.push(`/child/${child.id}/world`);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="text-6xl"
        >
          🌙
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary-700">
              Assalamualaikum, {user?.displayName || 'Orang Tua'}! 👋
            </h1>
            <p className="text-gray-500 mt-1">Siapa yang mau berpetualang hari ini?</p>
          </div>
          <div className="flex gap-2">
            <Link href="/parent/reports" className="btn-child bg-white text-gray-700 text-sm px-4 py-2">
              📊 Laporan
            </Link>
            <Link href="/about" className="btn-child bg-white text-gray-700 text-sm px-4 py-2">
              ℹ️ About
            </Link>
            <button onClick={handleLogout} className="btn-child bg-gray-100 text-gray-600 text-sm px-4 py-2">
              🚪 Keluar
            </button>
          </div>
        </div>

        {children.length === 0 ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-7xl mb-4">👶</div>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">Belum Ada Profil Anak</h2>
            <p className="text-gray-500 mb-6">Buat profil anak untuk memulai Jejak Kebaikan!</p>
            <Link href="/child/create" className="btn-primary inline-block">
              ➕ Buat Profil Anak
            </Link>
          </motion.div>
        ) : (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {children.map((child, index) => (
                <motion.div
                  key={child.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1, type: 'spring' }}
                  onClick={() => selectChild(child)}
                  className="card-child cursor-pointer group"
                >
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary-200 to-secondary-200 flex items-center justify-center text-5xl mb-4 group-hover:scale-110 transition-transform">
                      {child.avatarURL ? (
                        <img src={child.avatarURL} alt={child.name} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        child.gender === 'laki-laki' ? '👦' : '👧'
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">{child.name}</h3>
                    <p className="text-gray-500 text-sm">{child.age} tahun</p>
                    <div className="mt-3 flex items-center justify-center gap-2">
                      <span className="px-3 py-1 bg-accent-100 text-accent-700 rounded-full text-sm font-bold">
                        ⭐ Level {child.level}
                      </span>
                      <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-bold">
                        💎 {child.akhlakPoints} Poin
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap justify-center gap-1">
                      {child.badges.slice(0, 3).map((badge) => (
                        <span key={badge} className="text-lg">🏅</span>
                      ))}
                      {child.badges.length > 3 && (
                        <span className="text-sm text-gray-500">+{child.badges.length - 3}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: children.length * 0.1, type: 'spring' }}
              >
                <Link
                  href="/child/create"
                  className="card-child flex flex-col items-center justify-center min-h-[250px] border-2 border-dashed border-gray-300 hover:border-primary-400 transition-colors group"
                >
                  <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">➕</div>
                  <p className="text-gray-500 font-semibold">Tambah Anak</p>
                </Link>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
