'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface LockOverlayProps {
  message?: string;
}

export default function LockOverlay({ message = 'Daftar untuk membuka semua cerita!' }: LockOverlayProps) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center z-10"
    >
      <span className="text-4xl mb-2">🔒</span>
      <p className="text-sm font-semibold text-gray-600 text-center px-4 mb-3">{message}</p>
      <button
        onClick={() => router.push('/auth/register')}
        className="btn-primary text-sm px-5 py-2"
      >
        Daftar Gratis
      </button>
    </motion.div>
  );
}
