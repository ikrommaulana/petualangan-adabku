import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { ChildProvider } from '@/context/ChildContext';
import PWARegister from '@/components/layout/PWARegister';
import PWAInstallPrompt from '@/components/layout/PWAInstallPrompt';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Jejak Kebaikan - Belajar Adab Islam',
  description: 'Aplikasi interaktif untuk anak-anak belajar adab dan akhlak Islam melalui cerita yang menyenangkan',
  manifest: '/manifest.json',
  keywords: ['adab', 'islam', 'anak', 'belajar', 'cerita interaktif', 'akhlak'],
  authors: [{ name: 'Jejak Kebaikan' }],
};

export const viewport: Viewport = {
  themeColor: '#32a5ff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" dir="ltr">
      <head>
        <link rel="icon" href="/icons/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <PWARegister />
        <PWAInstallPrompt />
        <AuthProvider>
          <ChildProvider>
            <div className="min-h-screen flex flex-col">
              <div className="flex-1">
                {children}
              </div>
              <Footer />
            </div>
          </ChildProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
