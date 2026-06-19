import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="text-center py-6 px-4">
      <p className="text-sm text-gray-400">
        © 2026 Jejak Kebaikan — Dibuat dengan ❤️ oleh{' '}
        <Link href="/about" className="text-primary-500 hover:text-primary-700 transition-colors font-semibold">
          AIM
        </Link>
      </p>
    </footer>
  );
}
