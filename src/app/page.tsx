'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';

export default function Home() {
  const { user, loading, isGuest, enterGuestMode } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (user || isGuest)) {
      if (isGuest) {
        router.push('/child/guest_child/world');
      } else {
        router.push('/dashboard');
      }
    }
  }, [user, loading, isGuest, router]);

  if (loading) {
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

  const handleGuestPlay = () => {
    enterGuestMode();
    router.push('/child/guest_child/world');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="text-center mb-8"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-8xl mb-4"
        >
          🌟
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-bold text-primary-700 mb-2">
          Jejak Kebaikan
        </h1>
        <p className="text-lg text-gray-600 max-w-md mx-auto">
          Belajar adab dan akhlak Islam melalui cerita yang menyenangkan!
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex flex-col gap-3 w-full max-w-sm"
      >
        <button
          onClick={() => router.push('/auth/register')}
          className="btn-primary text-xl"
        >
          🚀 Mulai Jejak Kebaikan
        </button>
        <button
          onClick={() => router.push('/auth/login')}
          className="btn-secondary text-xl"
        >
          🔑 Masuk
        </button>
        <div className="flex items-center gap-3 my-2">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-sm text-gray-400">atau</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>
        <button
          onClick={handleGuestPlay}
          className="btn-child bg-white border-2 border-gray-200 text-gray-700 text-lg hover:border-primary-300 hover:bg-primary-50"
        >
          👀 Coba Gratis
        </button>
        <p className="text-xs text-gray-400 text-center">
          Akses terbatas — daftar untuk membuka semua cerita
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-lg"
      >
        {[
          { emoji: '🏠', label: 'Rumah' },
          { emoji: '🏫', label: 'Sekolah' },
          { emoji: '🕌', label: 'Masjid' },
          { emoji: '🎮', label: 'Bermain' },
        ].map((world, i) => (
          <motion.div
            key={world.label}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8 + i * 0.1, type: 'spring' }}
            className="flex flex-col items-center p-3 bg-white rounded-2xl shadow-md"
          >
            <span className="text-3xl">{world.emoji}</span>
            <span className="text-sm font-semibold text-gray-600 mt-1">{world.label}</span>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-8 flex flex-wrap justify-center gap-3"
      >
        {['🤝 Salam', '💝 Hormat', '💎 Jujur', '🎁 Berbagi'].map((item, i) => (
          <motion.span
            key={item}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.4 + i * 0.1 }}
            className="px-4 py-2 bg-white/70 rounded-full text-sm font-semibold text-gray-600 shadow-sm"
          >
            {item}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
