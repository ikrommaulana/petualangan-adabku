import { WorldInfo, Badge, Cosmetic } from '@/types';

export const worlds: WorldInfo[] = [
  {
    id: 'rumah',
    name: 'Rumah',
    description: 'Belajar adab di rumah bersama keluarga',
    emoji: '🏠',
    color: 'bg-orange-400',
    gradient: 'from-orange-300 to-orange-500',
  },
  {
    id: 'sekolah',
    name: 'Sekolah',
    description: 'Belajar adab di sekolah bersama teman dan guru',
    emoji: '🏫',
    color: 'bg-blue-400',
    gradient: 'from-blue-300 to-blue-500',
  },
  {
    id: 'masjid',
    name: 'Masjid',
    description: 'Belajar adab di masjid',
    emoji: '🕌',
    color: 'bg-green-400',
    gradient: 'from-green-300 to-green-500',
  },
  {
    id: 'bermain',
    name: 'Bermain',
    description: 'Belajar adab saat bermain dengan teman',
    emoji: '🎮',
    color: 'bg-purple-400',
    gradient: 'from-purple-300 to-purple-500',
  },
];

export const badges: Badge[] = [
  { id: 'salam_master', name: 'Master Salam', description: 'Menyelesaikan semua cerita tentang salam', emoji: '🤝', requirement: 'salam' },
  { id: 'anak_sholeh', name: 'Anak Sholeh', description: 'Menghormati orang tua dengan sempurna', emoji: '💝', requirement: 'menghormati_orangtua' },
  { id: 'murid_teladan', name: 'Murid Teladan', description: 'Selalu menghormati guru', emoji: '📚', requirement: 'menghormati_guru' },
  { id: 'jujur_sejati', name: 'Jujur Sejati', description: 'Selalu berkata jujur', emoji: '💎', requirement: 'jujur' },
  { id: 'rajin_berbagi', name: 'Rajin Berbagi', description: 'Senang berbagi dengan teman', emoji: '🎁', requirement: 'berbagi' },
  { id: 'penjaga_masjid', name: 'Penjaga Masjid', description: 'Beradab baik di masjid', emoji: '🕌', requirement: 'adab_masjid' },
  { id: 'sopan_makan', name: 'Sopan Santun Makan', description: 'Makan dengan adab yang baik', emoji: '🍽️', requirement: 'adab_makan' },
  { id: 'sopan_santun', name: 'Sopan Santun', description: 'Selalu minta izin dengan baik', emoji: '🙋', requirement: 'minta_izin' },
  { id: 'petualang_level5', name: 'Petualang Hebat', description: 'Mencapai level 5', emoji: '⭐', requirement: 'level_5' },
  { id: 'poin_1000', name: 'Kolektor Poin', description: 'Mengumpulkan 1000 poin', emoji: '💰', requirement: 'points_1000' },
  { id: 'rajin_kelas', name: 'Rajin Kelas', description: 'Menjaga kebersihan kelas', emoji: '🧹', requirement: 'kebersihan' },
  { id: 'jujur_ujian', name: 'Jujur Ujian', description: 'Tidak mencontek saat ujian', emoji: '📝', requirement: 'kejujuran_sekolah' },
  { id: 'sportif', name: 'Pemain Sportif', description: 'Bermain dengan adil', emoji: '⚽', requirement: 'sportivitas' },
  { id: 'pendengar_khotbah', name: 'Pendengar Setia', description: 'Mendengarkan khotbah dengan baik', emoji: '🎤', requirement: 'adab_khotbah' },
  { id: 'penjaga_masjid_bersih', name: 'Penjaga Kebersihan', description: 'Menjaga kebersihan masjid', emoji: '✨', requirement: 'kebersihan_masjid' },
  { id: 'mulut_manis', name: 'Mulut Manis', description: 'Selalu berkata baik', emoji: '🍬', requirement: 'perkataan_baik' },
  { id: 'sabar_hebat', name: 'Sabar Hebat', description: 'Mengalah dan tidak egois', emoji: '🧘', requirement: 'kesabaran' },
  { id: 'teman_amanah', name: 'Teman Amanah', description: 'Menjaga barang teman', emoji: '🤝', requirement: 'amanah' },
  { id: 'kamar_rapi', name: 'Kamar Rapi', description: 'Menjaga kebersihan kamar', emoji: '🛏️', requirement: 'kebersihan_rumah' },
  { id: 'cucu_teladan', name: 'Cucu Teladan', description: 'Berbakti kepada kakek nenek', emoji: '👴', requirement: 'hormat_lansia' },
];

export const cosmetics: Cosmetic[] = [
  { id: 'hat_peci', name: 'Peci', type: 'hat', emoji: '🫅', pointsRequired: 50 },
  { id: 'hat_turban', name: 'Sorban', type: 'hat', emoji: '👳', pointsRequired: 100 },
  { id: 'hat_crown', name: 'Mahkota', type: 'hat', emoji: '👑', pointsRequired: 200 },
  { id: 'glasses_star', name: 'Kacamata Bintang', type: 'glasses', emoji: '⭐', pointsRequired: 75 },
  { id: 'glasses_heart', name: 'Kacamata Hati', type: 'glasses', emoji: '❤️', pointsRequired: 150 },
  { id: 'acc_scarf', name: 'Syal', type: 'accessory', emoji: '🧣', pointsRequired: 120 },
  { id: 'acc_medal', name: 'Medali', type: 'accessory', emoji: '🏅', pointsRequired: 250 },
  { id: 'bg_garden', name: 'Taman', type: 'background', emoji: '🌿', pointsRequired: 300 },
  { id: 'bg_stars', name: 'Bintang', type: 'background', emoji: '✨', pointsRequired: 500 },
  { id: 'bg_rainbow', name: 'Pelangi', type: 'background', emoji: '🌈', pointsRequired: 800 },
];
