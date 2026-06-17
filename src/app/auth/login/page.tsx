'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginParent } from '@/lib/firebase-services';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await loginParent(email, password);
      router.push('/dashboard');
    } catch (err: any) {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Email atau password salah.');
      } else {
        setError('Terjadi kesalahan. Silakan coba lagi.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl mb-3"
          >
            🔑
          </motion.div>
          <h1 className="text-3xl font-bold text-primary-700">Masuk</h1>
          <p className="text-gray-500 mt-2">Selamat datang kembali!</p>
        </div>

        <div className="card-child">
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-child"
                placeholder="contoh@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-child"
                placeholder="Masukkan password"
                required
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-medium"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary text-lg mt-2"
            >
              {loading ? '⏳ Memproses...' : '🚀 Masuk'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500">
              Belum punya akun?{' '}
              <Link href="/auth/register" className="text-primary-600 font-bold hover:underline">
                Daftar di sini
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
