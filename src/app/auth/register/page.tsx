'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerParent } from '@/lib/firebase-services';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await registerParent(email, password, name);
      router.push('/dashboard');
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setError('Email sudah terdaftar. Silakan gunakan email lain.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password terlalu lemah. Gunakan minimal 6 karakter.');
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
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl mb-3"
          >
            👨‍👩‍👧‍👦
          </motion.div>
          <h1 className="text-3xl font-bold text-primary-700">Daftar Akun Orang Tua</h1>
          <p className="text-gray-500 mt-2">Buat akun untuk memulai Jejak Kebaikan</p>
        </div>

        <div className="card-child">
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Lengkap</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-child"
                placeholder="Masukkan nama Anda"
                required
              />
            </div>

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
                placeholder="Minimal 6 karakter"
                required
                minLength={6}
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
              {loading ? '⏳ Memproses...' : '✨ Daftar Sekarang'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500">
              Sudah punya akun?{' '}
              <Link href="/auth/login" className="text-primary-600 font-bold hover:underline">
                Masuk di sini
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
