'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { createChildProfile } from '@/lib/firebase-services';
import { motion } from 'framer-motion';

export default function CreateChildPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [age, setAge] = useState(5);
  const [gender, setGender] = useState<'laki-laki' | 'perempuan'>('laki-laki');
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onload = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setError('');
    setLoading(true);

    try {
      const child = await createChildProfile(user.uid, name, age, gender, photo || undefined);
      router.push(`/child/${child.id}/world`);
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-6">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl mb-3"
          >
            👶
          </motion.div>
          <h1 className="text-3xl font-bold text-primary-700">Buat Profil Anak</h1>
          <p className="text-gray-500 mt-1">Isi data anak untuk memulai petualangan</p>
        </div>

        <div className="card-child">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex justify-center">
              <label className="cursor-pointer group">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center border-4 border-dashed border-primary-300 group-hover:border-primary-500 transition-colors overflow-hidden">
                  {photoPreview ? (
                    <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center">
                      <span className="text-4xl">📷</span>
                      <p className="text-xs text-gray-500 mt-1">Foto Anak</p>
                    </div>
                  )}
                </div>
                <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
              </label>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Anak</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-child"
                placeholder="Masukkan nama anak"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Usia: {age} tahun</label>
              <input
                type="range"
                min={4}
                max={10}
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer accent-primary-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>4 tahun</span>
                <span>10 tahun</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Jenis Kelamin</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setGender('laki-laki')}
                  className={`p-4 rounded-2xl border-2 transition-all text-center ${
                    gender === 'laki-laki'
                      ? 'border-blue-400 bg-blue-50 text-blue-700'
                      : 'border-gray-200 bg-white text-gray-600'
                  }`}
                >
                  <span className="text-3xl block mb-1">👦</span>
                  <span className="font-semibold">Laki-laki</span>
                </button>
                <button
                  type="button"
                  onClick={() => setGender('perempuan')}
                  className={`p-4 rounded-2xl border-2 transition-all text-center ${
                    gender === 'perempuan'
                      ? 'border-pink-400 bg-pink-50 text-pink-700'
                      : 'border-gray-200 bg-white text-gray-600'
                  }`}
                >
                  <span className="text-3xl block mb-1">👧</span>
                  <span className="font-semibold">Perempuan</span>
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-medium"
              >
                {error}
              </motion.div>
            )}

            <button type="submit" disabled={loading} className="btn-primary text-lg mt-2">
              {loading ? '⏳ Membuat profil...' : '🚀 Mulai Jejak Kebaikan!'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
