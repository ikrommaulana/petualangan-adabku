'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstallPrompt() {
  const [mounted, setMounted] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstall, setShowInstall] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstall(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowInstall(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = useCallback(async () => {
    if (!deferredPrompt) return;

    setIsInstalling(true);
    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowInstall(false);
      }
    } catch {
      // ignore
    } finally {
      setDeferredPrompt(null);
      setIsInstalling(false);
    }
  }, [deferredPrompt]);

  const handleDismiss = useCallback(() => {
    setShowInstall(false);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {showInstall && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          className="fixed bottom-4 left-4 right-4 z-50 sm:left-auto sm:right-4 sm:max-w-sm"
        >
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-primary-200 p-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-2xl shrink-0 shadow-md">
                📲
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-800 text-sm">Pasang Jejak Kebaikan</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Pasang aplikasi ini di HP kamu untuk akses lebih cepat!
                </p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={handleInstall}
                    disabled={isInstalling}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-bold rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all active:scale-95 disabled:opacity-50"
                  >
                    {isInstalling ? 'Memasang...' : 'Pasang'}
                  </button>
                  <button
                    onClick={handleDismiss}
                    className="px-3 py-2 text-gray-400 text-sm font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    Nanti
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
