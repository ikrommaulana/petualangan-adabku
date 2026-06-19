'use client';

import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <button
            onClick={() => router.back()}
            className="btn-child bg-white text-gray-700 text-sm px-4 py-2 mb-4"
          >
            ← Kembali
          </button>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card-child mb-6"
        >
          <div className="text-center mb-6">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-7xl mb-4"
            >
              🌟
            </motion.div>
            <h1 className="text-3xl font-bold text-primary-700">Tentang Kami</h1>
          </div>

          <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
            <p>
              <strong className="text-gray-800">Jejak Kebaikan</strong> adalah aplikasi interaktif
              yang dirancang khusus untuk anak-anak belajar adab dan akhlak Islam melalui cerita
              yang menyenangkan.
            </p>
            <p>
              Misi kami adalah menanamkan nilai-nilai kebaikan sejak dini dengan cara yang
              menyenangkan dan mudah dipahami oleh anak-anak.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card-child mb-6"
        >
          <h2 className="text-2xl font-bold text-primary-700 mb-4 text-center">
            👤 Pemilik & Pengembang
          </h2>
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-5xl mb-4 shadow-lg">
              🧑‍💻
            </div>
            <h3 className="text-xl font-bold text-gray-800">AIM</h3>
            <p className="text-gray-500 text-sm mb-2">Owner & Developer</p>
            <div className="mt-3 flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-xl">
              <span className="text-lg">📧</span>
              <a
                href="mailto:me@aim-project.id"
                className="text-primary-600 font-semibold hover:text-primary-800 transition-colors"
              >
                me@aim-project.id
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="card-child mb-6"
        >
          <h2 className="text-2xl font-bold text-primary-700 mb-4 text-center">
            💬 Kritik & Saran
          </h2>
          <div className="text-center">
            <p className="text-gray-600 text-lg mb-4">
              Kami sangat menghargai masukan Anda untuk mengembangkan aplikasi ini menjadi lebih baik.
            </p>
            <div className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl border-2 border-primary-200">
              <span className="text-2xl">✉️</span>
              <div className="text-left">
                <p className="text-sm text-gray-500">Kirim kritik & saran ke:</p>
                <a
                  href="mailto:me@aim-project.id"
                  className="text-primary-700 font-bold text-lg hover:text-primary-900 transition-colors"
                >
                  me@aim-project.id
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
