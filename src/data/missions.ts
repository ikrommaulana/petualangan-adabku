import { DailyMission } from '@/types';

export const dailyMissions: DailyMission[] = [
  {
    id: 'mission_salam',
    title: 'Mengucapkan Salam',
    description: 'Hari ini, ucapkan salam kepada 3 orang yang kamu temui!',
    lesson: 'salam',
    emoji: '🤝',
    points: 20,
  },
  {
    id: 'mission_help_parent',
    title: 'Membantu Orang Tua',
    description: 'Bantu Ibu atau Ayah melakukan satu pekerjaan rumah hari ini!',
    lesson: 'menghormati_orangtua',
    emoji: '💝',
    points: 25,
  },
  {
    id: 'mission_respect_teacher',
    title: 'Menghormati Guru',
    description: 'Sapa guru kamu dengan sopan dan dengarkan pelajaran dengan baik!',
    lesson: 'menghormati_guru',
    emoji: '📚',
    points: 20,
  },
  {
    id: 'mission_honest',
    title: 'Berkata Jujur',
    description: 'Ingat untuk selalu berkata jujur hari ini!',
    lesson: 'jujur',
    emoji: '💎',
    points: 15,
  },
  {
    id: 'mission_share',
    title: 'Berbagi dengan Teman',
    description: 'Bagikan makanan atau mainanmu dengan teman hari ini!',
    lesson: 'berbagi',
    emoji: '🎁',
    points: 20,
  },
  {
    id: 'mission_mosque',
    title: 'Adab di Masjid',
    description: 'Sholat berjamaah di masjid dengan tenang dan tertib!',
    lesson: 'adab_masjid',
    emoji: '🕌',
    points: 25,
  },
  {
    id: 'mission_eat',
    title: 'Makan dengan Adab',
    description: 'Makan dengan tangan kanan dan ucapkan Bismillah!',
    lesson: 'adab_makan',
    emoji: '🍽️',
    points: 15,
  },
  {
    id: 'mission_permission',
    title: 'Meminta Izin',
    description: 'Ingat untuk meminta izin sebelum mengambil sesuatu!',
    lesson: 'minta_izin',
    emoji: '🙋',
    points: 15,
  },
  {
    id: 'mission_clean',
    title: 'Menjaga Kebersihan',
    description: 'Bersihkan meja atau kamar kamu hari ini!',
    lesson: 'kebersihan',
    emoji: '🧹',
    points: 20,
  },
  {
    id: 'mission_no_cheat',
    title: 'Jujur dalam Belajar',
    description: 'Kerjakan tugas sendiri tanpa mencontek!',
    lesson: 'kejujuran_sekolah',
    emoji: '📝',
    points: 20,
  },
  {
    id: 'mission_fair_play',
    title: 'Bermain Adil',
    description: 'Bermain dengan sportif dan tidak curang!',
    lesson: 'sportivitas',
    emoji: '⚽',
    points: 20,
  },
  {
    id: 'mission_nice_words',
    title: 'Berkata Baik',
    description: 'Gunakan kata-kata yang baik dan sopan hari ini!',
    lesson: 'perkataan_baik',
    emoji: '🍬',
    points: 15,
  },
  {
    id: 'mission_patient',
    title: 'Bersabar Hari Ini',
    description: 'Latih kesabaranmu — mengalah dan tidak marah!',
    lesson: 'kesabaran',
    emoji: '🧘',
    points: 20,
  },
  {
    id: 'mission_trustworthy',
    title: 'Menjaga Amanah',
    description: 'Jaga barang titipan teman dengan baik!',
    lesson: 'amanah',
    emoji: '🤝',
    points: 20,
  },
  {
    id: 'mission_clean_room',
    title: 'Merapikan Kamar',
    description: 'Rapikan kamar sendiri sebelum bermain!',
    lesson: 'kebersihan_rumah',
    emoji: '🛏️',
    points: 15,
  },
  {
    id: 'mission_respect_elder',
    title: 'Menghormati Lansia',
    description: 'Sapa dan bantu orang yang lebih tua hari ini!',
    lesson: 'hormat_lansia',
    emoji: '👴',
    points: 25,
  },
];

export function getDailyMission(): DailyMission {
  const today = new Date();
  const dayIndex = (today.getFullYear() * 366 + today.getMonth() * 31 + today.getDate()) % dailyMissions.length;
  return dailyMissions[dayIndex];
}

export function getDailyMissions(count: number = 3): DailyMission[] {
  const today = new Date();
  const seed = today.getFullYear() * 366 + today.getMonth() * 31 + today.getDate();
  const shuffled = [...dailyMissions].sort((a, b) => {
    const hashA = (seed + a.id.charCodeAt(0)) % 100;
    const hashB = (seed + b.id.charCodeAt(0)) % 100;
    return hashA - hashB;
  });
  return shuffled.slice(0, count);
}
