import { Story } from '@/types';

export const stories: Story[] = [
  {
    id: 'story_salam_home',
    title: 'Salam untuk Keluarga',
    description: 'Belajar mengucapkan salam saat pulang ke rumah',
    world: 'rumah',
    lesson: 'salam',
    difficulty: 'mudah',
    minAge: 4,
    maxAge: 10,
    rewardBadge: 'salam_master',
    scenes: [
      {
        id: 'salam_home_1',
        sceneNumber: 1,
        illustration: '🏠 Anak berjalan pulang ke rumah setelah bermain. Ibu membukakan pintu.',
        narration: 'Hari sudah sore. Setelah bermain di luar, kamu pulang ke rumah. Ibu sudah menunggu di depan pintu.',
        choices: [
          { id: 'c1a', text: 'Langsung masuk tanpa bicara', isCorrect: false, points: 0, feedback: 'Wah, seharusnya kita mengucapkan salam dulu ya. Mengucapkan salam itu adab yang baik!', nextSceneId: 'salam_home_2_wrong' },
          { id: 'c1b', text: 'Assalamualaikum, Bu!', isCorrect: true, points: 10, feedback: 'Alhamdulillah! Mengucapkan salam itu sangat baik. Ibu pasti senang mendengarnya!', nextSceneId: 'salam_home_2_right' },
          { id: 'c1c', text: 'Hei, buka pintunya!', isCorrect: false, points: 0, feedback: 'Wah, itu kurang sopan ya. Kita harus bicara dengan lembut kepada orang tua.', nextSceneId: 'salam_home_2_wrong' },
        ],
      },
      {
        id: 'salam_home_2_right',
        sceneNumber: 2,
        illustration: '😊 Ibu tersenyum bahagia dan memeluk anaknya.',
        narration: 'Ibu tersenyum lebar mendengar salammu. "Waalaikumsalam, sayang! Masuklah, Ibu sudah siapkan makanan untukmu."',
        choices: [
          { id: 'c2a', text: 'Terima kasih, Bu! Aku sayang Ibu!', isCorrect: true, points: 10, feedback: 'Subhanallah! Berkata baik kepada orang tua itu pahalanya besar sekali!', nextSceneId: 'salam_home_3' },
          { id: 'c2b', text: 'Ya, lapar!', isCorrect: false, points: 5, feedback: 'Hmm, lebih baik berterima kasih dulu ya kepada Ibu yang sudah memasak.', nextSceneId: 'salam_home_3' },
        ],
      },
      {
        id: 'salam_home_2_wrong',
        sceneNumber: 2,
        illustration: '😟 Ibu terlihat sedih dan kecewa.',
        narration: 'Ibu terlihat sedih. "Nak, Ibu senang kamu pulang. Tapi Ibu lebih senang kalau kamu mengucapkan salam dulu."',
        choices: [
          { id: 'c2w', text: 'Maaf, Bu. Assalamualaikum!', isCorrect: true, points: 5, feedback: 'Alhamdulillah! Meminta maaf dan mengucapkan salam, meskipun terlambat, itu tetap baik!', nextSceneId: 'salam_home_3' },
        ],
      },
      {
        id: 'salam_home_3',
        sceneNumber: 3,
        illustration: '🕌 Keluarga berkumpul di meja makan bersama.',
        narration: 'Malam harinya, Ayah pulang dari masjid. Saat Ayah masuk rumah, kamu ingat tentang salam.',
        choices: [
          { id: 'c3a', text: 'Assalamualaikum, Ayah! Selamat datang!', isCorrect: true, points: 15, feedback: 'Masya Allah! Kamu sudah belajar dengan baik! Salam membuat hati senang.', nextSceneId: 'salam_home_end' },
          { id: 'c3b', text: 'Diam saja', isCorrect: false, points: 0, feedback: 'Yuk, kita biasakan menyambut Ayah dengan salam!', nextSceneId: 'salam_home_end' },
        ],
      },
      {
        id: 'salam_home_end',
        sceneNumber: 4,
        illustration: '🌟 Keluarga bahagia berkumpul bersama.',
        narration: 'Alhamdulillah! Hari ini kamu belajar bahwa mengucapkan salam membuat hati orang lain senang. Salam itu doa dan adab yang baik!',
        choices: [],
      },
    ],
  },
  {
    id: 'story_respect_parent',
    title: 'Patuh kepada Orang Tua',
    description: 'Belajar patuh dan menghormati orang tua di rumah',
    world: 'rumah',
    lesson: 'menghormati_orangtua',
    difficulty: 'mudah',
    minAge: 4,
    maxAge: 10,
    rewardBadge: 'anak_sholeh',
    scenes: [
      {
        id: 'respect_1',
        sceneNumber: 1,
        illustration: '🎮 Anak sedang bermain game di tablet. Ibu memanggil dari dapur.',
        narration: 'Kamu sedang asyik bermain game. Tiba-tiba Ibu memanggilmu dari dapur. "Nak, tolong bantu Ibu ya!"',
        choices: [
          { id: 'ra', text: 'Sebentar, Bu! Aku selesai dulu ya!', isCorrect: true, points: 10, feedback: 'Baik! Menjawab dengan sopan dan tidak langsung menolak itu adab yang baik.', nextSceneId: 'respect_2a' },
          { id: 'rb', text: 'Tidak mau! Aku sedang main!', isCorrect: false, points: 0, feedback: 'Wah, menolak permintaan orang tua dengan kasar itu tidak baik. Ingat, surga ada di bawah telapak kaki Ibu.', nextSceneId: 'respect_2b' },
          { id: 'rc', text: 'Langsung berhenti bermain dan menemui Ibu', isCorrect: true, points: 15, feedback: 'Subhanallah! Langsung menuruti permintaan orang tua itu luar biasa!', nextSceneId: 'respect_2a' },
        ],
      },
      {
        id: 'respect_2a',
        sceneNumber: 2,
        illustration: '👩‍🍳 Anak membantu Ibu di dapur dengan senang hati.',
        narration: 'Kamu menemui Ibu di dapur. Ibu minta bantuan mengambilkan sayuran dari kulkas.',
        choices: [
          { id: 'r2a1', text: 'Ambilkan dengan senang hati', isCorrect: true, points: 10, feedback: 'Alhamdulillah! Membantu orang tua itu ibadah yang pahalanya besar!', nextSceneId: 'respect_3' },
          { id: 'r2a2', text: 'Ambilkan sambil mengeluh', isCorrect: false, points: 5, feedback: 'Hmm, lebih baik dilakukan dengan ikhlas ya. Ibu pasti lelah memasak untuk kita.', nextSceneId: 'respect_3' },
        ],
      },
      {
        id: 'respect_2b',
        sceneNumber: 2,
        illustration: '😢 Ibu terlihat sedih dan kecewa.',
        narration: 'Ibu terlihat sedih. "Ibu hanya minta sedikit bantuan, Nak. Ibu sudah sangat lelah memasak untukmu setiap hari."',
        choices: [
          { id: 'r2b1', text: 'Maaf, Bu. Aku akan bantu sekarang!', isCorrect: true, points: 5, feedback: 'Alhamdulillah! Meminta maaf dan menuruti orang tua itu baik sekali.', nextSceneId: 'respect_3' },
        ],
      },
      {
        id: 'respect_3',
        sceneNumber: 3,
        illustration: '🌟 Ibu dan anak makan bersama dengan bahagia.',
        narration: 'Setelah makan malam, Ayah bercerita tentang pentingnya berbakti kepada orang tua. "Barang siapa yang berbakti kepada orang tuanya, maka dia akan masuk surga."',
        choices: [
          { id: 'r3a', text: 'Aku akan selalu berbakti kepada Ayah dan Ibu!', isCorrect: true, points: 15, feedback: 'Masya Allah! Semoga kamu menjadi anak yang selalu berbakti kepada orang tua. Aamiin!', nextSceneId: 'respect_end' },
        ],
      },
      {
        id: 'respect_end',
        sceneNumber: 4,
        illustration: '🏠 Keluarga bahagia berkumpul di ruang keluarga.',
        narration: 'Kamu belajar bahwa menghormati dan menuruti orang tua itu sangat penting. Orang tua sangat sayang kepada kita, jadi kita harus sayang kepada mereka juga!',
        choices: [],
      },
    ],
  },
  {
    id: 'story_respect_teacher',
    title: 'Menghormati Guru',
    description: 'Belajar menghormati dan mendengarkan guru di sekolah',
    world: 'sekolah',
    lesson: 'menghormati_guru',
    difficulty: 'mudah',
    minAge: 5,
    maxAge: 10,
    rewardBadge: 'murid_teladan',
    scenes: [
      {
        id: 'teacher_1',
        sceneNumber: 1,
        illustration: '🏫 Pagi hari di sekolah. Guru memasuki kelas.',
        narration: 'Pagi hari di sekolah. Bu Guru masuk ke kelas. Semua murid berdiri.',
        choices: [
          { id: 'ta', text: 'Berdiri dan mengucapkan salam kepada Bu Guru', isCorrect: true, points: 10, feedback: 'Bagus sekali! Menghormati guru dengan berdiri dan mengucapkan salam itu adab yang baik.', nextSceneId: 'teacher_2' },
          { id: 'tb', text: 'Tetap duduk dan bermain dengan teman', isCorrect: false, points: 0, feedback: 'Wah, seharusnya kita berdiri saat guru masuk. Itu tanda hormat.', nextSceneId: 'teacher_2_wrong' },
        ],
      },
      {
        id: 'teacher_2',
        sceneNumber: 2,
        illustration: '📖 Bu Guru menjelaskan pelajaran di depan kelas.',
        narration: 'Bu Guru menjelaskan pelajaran tentang binatang. Teman di sebelahmu mengajak bermain.',
        choices: [
          { id: 't2a', text: 'Dengarkan Bu Guru dengan baik', isCorrect: true, points: 10, feedback: 'Alhamdulillah! Mendengarkan pelajaran dengan baik itu sangat penting.', nextSceneId: 'teacher_3' },
          { id: 't2b', text: 'Bermain dengan teman di belakang', isCorrect: false, points: 0, feedback: 'Hmm, bermain saat guru mengajar itu kurang baik. Kita harus fokus belajar.', nextSceneId: 'teacher_3' },
        ],
      },
      {
        id: 'teacher_2_wrong',
        sceneNumber: 2,
        illustration: '😟 Bu Guru terlihat kecewa.',
        narration: 'Bu Guru melihatmu tidak berdiri. "Anak-anak, berdiri saat guru masuk itu tanda kita menghormati guru."',
        choices: [
          { id: 't2w', text: 'Berdiri dan minta maaf', isCorrect: true, points: 5, feedback: 'Alhamdulillah! Meminta maaf dan berbuat baik itu terpuji.', nextSceneId: 'teacher_3' },
        ],
      },
      {
        id: 'teacher_3',
        sceneNumber: 3,
        illustration: '❓ Bu Guru memberikan pertanyaan kepada kelas.',
        narration: 'Bu Guru bertanya, "Siapa yang tahu nama hewan terbesar di laut?" Kamu tahu jawabannya!',
        choices: [
          { id: 't3a', text: 'Angkat tangan dengan sopan dan jawab', isCorrect: true, points: 15, feedback: 'Hebat! Mengangkat tangan sebelum berbicara itu adab yang baik di kelas.', nextSceneId: 'teacher_end' },
          { id: 't3b', text: 'Teriak jawabannya dari tempat duduk', isCorrect: false, points: 0, feedback: 'Wah, seharusnya angkat tangan dulu ya. Itu lebih sopan.', nextSceneId: 'teacher_end' },
        ],
      },
      {
        id: 'teacher_end',
        sceneNumber: 4,
        illustration: '🌟 Bu Guru tersenyum dan memberikan bintang.',
        narration: 'Bu Guru tersenyum bangga. "Bagus sekali! Kamu murid yang sopan dan pintar!" Hari ini kamu belajar bahwa menghormati guru itu sangat penting!',
        choices: [],
      },
    ],
  },
  {
    id: 'story_honesty',
    title: 'Kejujuran itu Berharga',
    description: 'Belajar berkata jujur meskipun sulit',
    world: 'rumah',
    lesson: 'jujur',
    difficulty: 'sedang',
    minAge: 5,
    maxAge: 10,
    rewardBadge: 'jujur_sejati',
    scenes: [
      {
        id: 'honest_1',
        sceneNumber: 1,
        illustration: '🫙 Anak tidak sengaja menjatuhkan toples di dapur.',
        narration: 'Kamu sedang berlari di dapur dan tidak sengaja menjatuhkan toples kue Ibu. Toples itu pecah! Ibu mendengar suara dari ruang lain.',
        choices: [
          { id: 'ha', text: 'Beritahu Ibu dengan jujur', isCorrect: true, points: 15, feedback: 'Subhanallah! Berkata jujur meskipun sulit itu tanda orang beriman.', nextSceneId: 'honest_2a' },
          { id: 'hb', text: 'Sembunyi dan biarkan Ibu yang menemukan', isCorrect: false, points: 0, feedback: 'Wah, menyembunyikan kesalahan itu tidak baik. Jujur itu lebih baik!', nextSceneId: 'honest_2b' },
          { id: 'hc', text: 'Salahkan kucing yang lewat', isCorrect: false, points: 0, feedback: 'Menyalahkan orang lain padahal kita yang salah itu namanya berbohong.', nextSceneId: 'honest_2b' },
        ],
      },
      {
        id: 'honest_2a',
        sceneNumber: 2,
        illustration: '👩 Ibu mendengarkan dengan tenang dan tersenyum.',
        narration: 'Ibu datang dan melihat toples yang pecah. Ibu berkata, "Terima kasih sudah jujur, Nak. Toples bisa diganti, tapi kejujuranmu sangat berharga."',
        choices: [
          { id: 'h2a1', text: 'Aku minta maaf, Bu. Aku akan hati-hati.', isCorrect: true, points: 10, feedback: 'Alhamdulillah! Jujur dan minta maaf, itulah adab yang sempurna!', nextSceneId: 'honest_3' },
        ],
      },
      {
        id: 'honest_2b',
        sceneNumber: 2,
        illustration: '🔍 Ibu menemukan toples pecah dan bertanya.',
        narration: 'Ibu menemukan toples pecah dan bertanya, "Siapa yang menjatuhkan toples ini?"',
        choices: [
          { id: 'h2b1', text: 'Aku, Bu. Maafkan aku.', isCorrect: true, points: 10, feedback: 'Alhamdulillah! Akhirnya kamu jujur. Ibu pasti memaafkanmu.', nextSceneId: 'honest_3' },
          { id: 'h2b2', text: 'Tetap berbohong', isCorrect: false, points: 0, feedback: 'Allah tidak suka orang yang berbohong. Yuk, kita coba jujur!', nextSceneId: 'honest_3' },
        ],
      },
      {
        id: 'honest_3',
        sceneNumber: 3,
        illustration: '📖 Ayah bercerita tentang hadits tentang jujur.',
        narration: 'Ayah bercerita: "Rasulullah shallallahu alaihi wasallam bersabda: Hendaklah kamu selalu jujur, karena kejujuran membawa kebaikan." Kamu belajar hari ini!',
        choices: [
          { id: 'h3a', text: 'Aku akan selalu jujur!', isCorrect: true, points: 15, feedback: 'Masya Allah! Semoga kamu menjadi orang yang selalu jujur. Aamiin!', nextSceneId: 'honest_end' },
        ],
      },
      {
        id: 'honest_end',
        sceneNumber: 4,
        illustration: '💎 Bintang kejujuran bersinar terang.',
        narration: 'Alhamdulillah! Kamu belajar bahwa kejujuran itu sangat berharga. Orang yang jujur dicintai Allah dan manusia!',
        choices: [],
      },
    ],
  },
  {
    id: 'story_sharing',
    title: 'Senangnya Berbagi',
    description: 'Belajar berbagi dengan teman di taman bermain',
    world: 'bermain',
    lesson: 'berbagi',
    difficulty: 'mudah',
    minAge: 4,
    maxAge: 8,
    rewardBadge: 'rajin_berbagi',
    scenes: [
      {
        id: 'share_1',
        sceneNumber: 1,
        illustration: '🧁 Anak membawa banyak kue di taman bermain.',
        narration: 'Kamu membawa banyak kue ke taman bermain. Temanmu, Ali, duduk sendirian karena dia tidak punya bekal.',
        choices: [
          { id: 'sha', text: 'Tawarkan kue kepada Ali', isCorrect: true, points: 15, feedback: 'Masya Allah! Berbagi dengan teman itu sangat mulia!', nextSceneId: 'share_2' },
          { id: 'shb', text: 'Makan sendiri saja', isCorrect: false, points: 0, feedback: 'Wah, temanmu kelihatan lapar. Berbagi itu menyenangkan, lho!', nextSceneId: 'share_2_wrong' },
        ],
      },
      {
        id: 'share_2',
        sceneNumber: 2,
        illustration: '😊 Ali menerima kue dengan senang hati.',
        narration: 'Ali tersenyum bahagia. "Terima kasih! Kamu baik sekali!" Kalian berdua makan kue bersama sambil tertawa.',
        choices: [
          { id: 's2a', text: 'Sama-sama, Ali! Kita teman!', isCorrect: true, points: 10, feedback: 'Subhanallah! Berbagi membuat persahabatan semakin erat!', nextSceneId: 'share_3' },
        ],
      },
      {
        id: 'share_2_wrong',
        sceneNumber: 2,
        illustration: '😢 Ali terlihat sedih.',
        narration: 'Ali melihatmu makan dan terlihat sedih. Ibu Ali belum datang membawakan makanan.',
        choices: [
          { id: 's2w', text: 'Berikan kue kepada Ali', isCorrect: true, points: 10, feedback: 'Alhamdulillah! Akhirnya kamu berbagi. Ali pasti sangat senang!', nextSceneId: 'share_3' },
        ],
      },
      {
        id: 'share_3',
        sceneNumber: 3,
        illustration: '🤝 Teman-teman bermain bersama dengan gembira.',
        narration: 'Teman-teman yang lain juga mulai berbagi mainan dan makanan. Semua senang bermain bersama!',
        choices: [
          { id: 's3a', text: 'Ayo bermain bersama!', isCorrect: true, points: 15, feedback: 'Alhamdulillah! Berbagi membuat semua orang bahagia!', nextSceneId: 'share_end' },
        ],
      },
      {
        id: 'share_end',
        sceneNumber: 4,
        illustration: '🌈 Semua teman bermain bersama dengan ceria.',
        narration: 'Rasulullah shallallahu alaihi wasallam bersabda: "Orang yang paling dicintai Allah adalah yang paling bermanfaat bagi orang lain." Hari ini kamu bermanfaat untuk temanmu!',
        choices: [],
      },
    ],
  },
  {
    id: 'story_mosque',
    title: 'Adab di Masjid',
    description: 'Belajar adab dan sopan santun di masjid',
    world: 'masjid',
    lesson: 'adab_masjid',
    difficulty: 'sedang',
    minAge: 5,
    maxAge: 10,
    rewardBadge: 'penjaga_masjid',
    scenes: [
      {
        id: 'mosque_1',
        sceneNumber: 1,
        illustration: '🕌 Anak berjalan menuju masjid dengan Ayah.',
        narration: 'Kamu pergi ke masjid bersama Ayah untuk sholat Maghrib berjamaah. Di depan pintu masjid, kamu ingat sesuatu.',
        choices: [
          { id: 'ma', text: 'Masuk dengan kaki kanan dan baca doa masuk masjid', isCorrect: true, points: 15, feedback: 'Alhamdulillah! Masuk masjid dengan kaki kanan dan berdoa itu adab yang baik!', nextSceneId: 'mosque_2' },
          { id: 'mb', text: 'Langsung lari masuk', isCorrect: false, points: 0, feedback: 'Wah, masuk masjid harus tenang dan berdoa dulu ya.', nextSceneId: 'mosque_2_wrong' },
        ],
      },
      {
        id: 'mosque_2',
        sceneNumber: 2,
        illustration: '🤫 Anak duduk tenang menunggu iqamah.',
        narration: 'Di dalam masjid, ada beberapa orang sedang berdoa. Kamu harus duduk dengan tenang.',
        choices: [
          { id: 'm2a', text: 'Duduk tenang dan berdoa', isCorrect: true, points: 10, feedback: 'Bagus! Menjaga ketenangan di masjid itu sangat penting.', nextSceneId: 'mosque_3' },
          { id: 'm2b', text: 'Berlari-lari dan berbicara keras', isCorrect: false, points: 0, feedback: 'Masjid itu tempat ibadah. Kita harus tenang dan sopan.', nextSceneId: 'mosque_3' },
        ],
      },
      {
        id: 'mosque_2_wrong',
        sceneNumber: 2,
        illustration: '👨 Ayah mengingatkan dengan lembut.',
        narration: 'Ayah menahan tanganmu. "Nak, masuk masjid harus tenang. Pakai kaki kanan dan baca doa dulu ya."',
        choices: [
          { id: 'm2w', text: 'Baik, Yah. Maaf.', isCorrect: true, points: 5, feedback: 'Alhamdulillah! Menuruti nasihat Ayah itu baik.', nextSceneId: 'mosque_3' },
        ],
      },
      {
        id: 'mosque_3',
        sceneNumber: 3,
        illustration: '🧎 Sholat berjamaah dimulai.',
        narration: 'Iqamah dikumandangkan. Sholat Maghrib dimulai. Kamu berdiri di shaf belakang bersama anak-anak lain.',
        choices: [
          { id: 'm3a', text: 'Sholat dengan khusyuk dan rapi', isCorrect: true, points: 15, feedback: 'Subhanallah! Sholat dengan khusyuk itu sangat baik!', nextSceneId: 'mosque_end' },
          { id: 'm3b', text: 'Melihat-lihat sekeliling', isCorrect: false, points: 0, feedback: 'Sholat harus khusyuk ya. Fokus kepada Allah.', nextSceneId: 'mosque_end' },
        ],
      },
      {
        id: 'mosque_end',
        sceneNumber: 4,
        illustration: '🌟 Anak dan Ayah keluar masjid dengan bahagia.',
        narration: 'Setelah sholat, kamu keluar masjid dengan tenang. Ayah tersenyum bangga. "Alhamdulillah, kamu sudah belajar adab di masjid dengan baik!"',
        choices: [],
      },
    ],
  },
  {
    id: 'story_eating',
    title: 'Makan dengan Adab',
    description: 'Belajar adab makan yang baik',
    world: 'rumah',
    lesson: 'adab_makan',
    difficulty: 'mudah',
    minAge: 4,
    maxAge: 8,
    rewardBadge: 'sopan_makan',
    scenes: [
      {
        id: 'eat_1',
        sceneNumber: 1,
        illustration: '🍽️ Makan malam di meja makan bersama keluarga.',
        narration: 'Saatnya makan malam! Ibu sudah menyediakan makanan yang lezat di meja makan.',
        choices: [
          { id: 'ea', text: 'Ucapkan Bismillah sebelum makan', isCorrect: true, points: 10, feedback: 'Alhamdulillah! Membaca Bismillah sebelum makan itu sunnah yang baik!', nextSceneId: 'eat_2' },
          { id: 'eb', text: 'Langsung makan tanpa berdoa', isCorrect: false, points: 0, feedback: 'Jangan lupa baca Bismillah dulu ya sebelum makan!', nextSceneId: 'eat_2_wrong' },
        ],
      },
      {
        id: 'eat_2',
        sceneNumber: 2,
        illustration: '🤚 Anak mengambil makanan dengan tangan kanan.',
        narration: 'Kamu mengambil nasi dan lauk. Ada banyak makanan enak!',
        choices: [
          { id: 'e2a', text: 'Makan dengan tangan kanan dan tidak berlebihan', isCorrect: true, points: 10, feedback: 'Bagus! Makan dengan tangan kanan dan tidak berlebihan itu adab yang baik.', nextSceneId: 'eat_3' },
          { id: 'e2b', text: 'Ambil banyak makanan di piring sampai penuh', isCorrect: false, points: 0, feedback: 'Islam mengajarkan kita untuk tidak berlebihan ya. Ambil secukupnya saja.', nextSceneId: 'eat_3' },
        ],
      },
      {
        id: 'eat_2_wrong',
        sceneNumber: 2,
        illustration: '👨 Ayah mengingatkan dengan lembut.',
        narration: 'Ayah berkata, "Nak, jangan lupa baca Bismillah dulu. Itu adab makan yang baik."',
        choices: [
          { id: 'e2w', text: 'Bismillah! Maaf, Yah.', isCorrect: true, points: 5, feedback: 'Alhamdulillah! Tidak apa terlambat, yang penting kita ingat untuk berdoa.', nextSceneId: 'eat_3' },
        ],
      },
      {
        id: 'eat_3',
        sceneNumber: 3,
        illustration: '😊 Keluarga makan bersama dengan bahagia.',
        narration: 'Setelah selesai makan, saatnya berdoa. Kamu ingat ada doa setelah makan.',
        choices: [
          { id: 'e3a', text: 'Ucapkan Alhamdulillah setelah makan', isCorrect: true, points: 15, feedback: 'Subhanallah! Membaca doa setelah makan sebagai tanda syukur kepada Allah.', nextSceneId: 'eat_end' },
          { id: 'e3b', text: 'Langsung berdiri dan pergi', isCorrect: false, points: 0, feedback: 'Jangan lupa ucapkan Alhamdulillah sebagai rasa syukur ya!', nextSceneId: 'eat_end' },
        ],
      },
      {
        id: 'eat_end',
        sceneNumber: 4,
        illustration: '🌟 Keluarga duduk bersama setelah makan.',
        narration: 'Alhamdulillah! Hari ini kamu belajar adab makan yang baik: Bismillah, tangan kanan, tidak berlebihan, dan Alhamdulillah. Semoga Allah senang melihatmu!',
        choices: [],
      },
    ],
  },
  {
    id: 'story_permission',
    title: 'Meminta Izin dengan Sopan',
    description: 'Belajar meminta izin dengan baik',
    world: 'sekolah',
    lesson: 'minta_izin',
    difficulty: 'mudah',
    minAge: 4,
    maxAge: 8,
    rewardBadge: 'sopan_santun',
    scenes: [
      {
        id: 'permit_1',
        sceneNumber: 1,
        illustration: '📚 Di kelas, Bu Guru sedang mengajar.',
        narration: 'Di kelas, Bu Guru sedang mengajar. Tiba-tiba kamu merasa sakit perut dan ingin ke toilet.',
        choices: [
          { id: 'pa', text: 'Angkat tangan dan minta izin ke toilet', isCorrect: true, points: 10, feedback: 'Bagus! Meminta izin dengan sopan itu adab yang baik!', nextSceneId: 'permit_2' },
          { id: 'pb', text: 'Langsung keluar tanpa izin', isCorrect: false, points: 0, feedback: 'Wah, keluar kelas tanpa izin itu tidak sopan. Harus minta izin dulu.', nextSceneId: 'permit_2_wrong' },
        ],
      },
      {
        id: 'permit_2',
        sceneNumber: 2,
        illustration: '😊 Bu Guru mengizinkan dengan senyuman.',
        narration: 'Bu Guru tersenyum dan mengizinkanmu. "Silahkan, hati-hati ya!" Kamu keluar dengan tenang.',
        choices: [
          { id: 'p2a', text: 'Terima kasih, Bu Guru!', isCorrect: true, points: 10, feedback: 'Alhamdulillah! Berterima kasih itu adab yang baik.', nextSceneId: 'permit_3' },
        ],
      },
      {
        id: 'permit_2_wrong',
        sceneNumber: 2,
        illustration: '😟 Bu Guru terkejut dan mengejar.',
        narration: 'Bu Guru terkejut melihatmu keluar. "Nak, kenapa tidak minta izin dulu? Guru khawatir kamu kenapa-kenapa."',
        choices: [
          { id: 'p2w', text: 'Maaf, Bu. Saya sakit perut.', isCorrect: true, points: 5, feedback: 'Alhamdulillah, akhirnya kamu minta maaf. Lain kali minta izin dulu ya!', nextSceneId: 'permit_3' },
        ],
      },
      {
        id: 'permit_3',
        sceneNumber: 3,
        illustration: '🏠 Di rumah, kamu ingin mengambil camilan dari dapur.',
        narration: 'Setelah pulang sekolah, kamu ingin mengambil camilan. Ibu sedang istirahat.',
        choices: [
          { id: 'p3a', text: 'Permisi, Bu. Boleh aku ambil camilan?', isCorrect: true, points: 15, feedback: 'Masya Allah! Meminta izin kepada orang tua sebelum mengambil sesuatu itu adab yang sempurna!', nextSceneId: 'permit_end' },
          { id: 'p3b', text: 'Langsung ambil tanpa izin', isCorrect: false, points: 0, feedback: 'Sebaiknya minta izin dulu ya. Itu lebih sopan.', nextSceneId: 'permit_end' },
        ],
      },
      {
        id: 'permit_end',
        sceneNumber: 4,
        illustration: '🌟 Anak tersenyum bangga.',
        narration: 'Alhamdulillah! Kamu belajar bahwa meminta izin itu penting. Rasulullah mengajarkan kita untuk meminta izin sebelum memasuki atau mengambil sesuatu.',
        choices: [],
      },
    ],
  },
  {
    id: 'story_clean_class',
    title: 'Menjaga Kebersihan Kelas',
    description: 'Belajar menjaga kebersihan lingkungan sekolah',
    world: 'sekolah',
    lesson: 'kebersihan',
    difficulty: 'mudah',
    minAge: 4,
    maxAge: 10,
    rewardBadge: 'rajin_kelas',
    scenes: [
      {
        id: 'clean_class_1',
        sceneNumber: 1,
        illustration: '🏫 Kelas selesai pelajaran. Ada sampah di lantai.',
        narration: 'Bel pulang sekolah sudah berbunyi. Kamu melihat ada banyak sampah di bawah meja. Botol minuman, bungkus snack, dan kertas berserakan.',
        choices: [
          { id: 'cc1a', text: 'Ambil sapu dan bersihkan kelas', isCorrect: true, points: 15, feedback: 'Subhanallah! Menjaga kebersihan itu sebagian dari iman!', nextSceneId: 'clean_class_2' },
          { id: 'cc1b', text: 'Biarkan saja, nanti ada petugas kebersihan', isCorrect: false, points: 0, feedback: 'Wah, menjaga kebersihan itu tanggung jawab kita bersama, lho!', nextSceneId: 'clean_class_2_wrong' },
          { id: 'cc1c', text: 'Langsung pulang saja', isCorrect: false, points: 0, feedback: 'Hmm, kelas yang kotor tidak nyaman untuk belajar. Yuk, kita bersihkan!', nextSceneId: 'clean_class_2_wrong' },
        ],
      },
      {
        id: 'clean_class_2',
        sceneNumber: 2,
        illustration: '🧹 Anak menyapu lantai kelas dengan semangat.',
        narration: 'Kamu mengambil sapu dan mulai menyapu. Temanmu, Rina, melihatmu dan ikut membantu. "Aku bantu ya!"',
        choices: [
          { id: 'cc2a', text: 'Terima kasih, Rina! Ayo bersihkan bersama!', isCorrect: true, points: 10, feedback: 'Alhamdulillah! Kerja bersama itu lebih ringan dan menyenangkan!', nextSceneId: 'clean_class_3' },
        ],
      },
      {
        id: 'clean_class_2_wrong',
        sceneNumber: 2,
        illustration: '😟 Bu Guru melihat kelas yang kotor.',
        narration: 'Bu Guru masuk dan melihat kelas yang kotor. "Anak-anak, kebersihan kelas adalah tanggung jawab kita bersama. Kebersihan itu sebagian dari iman."',
        choices: [
          { id: 'cc2w', text: 'Maaf, Bu. Kami akan bersihkan sekarang!', isCorrect: true, points: 5, feedback: 'Alhamdulillah! Meminta maaf dan langsung berbuat baik itu terpuji.', nextSceneId: 'clean_class_3' },
        ],
      },
      {
        id: 'clean_class_3',
        sceneNumber: 3,
        illustration: '✨ Kelas menjadi bersih dan rapi.',
        narration: 'Setelah dibersihkan, kelas menjadi sangat rapi dan harum. Bu Guru tersenyum bangga melihat kelas yang bersih.',
        choices: [
          { id: 'cc3a', text: 'Senangnya kelas kita bersih!', isCorrect: true, points: 15, feedback: 'Masya Allah! Kelas yang bersih membuat belajar jadi lebih nyaman!', nextSceneId: 'clean_class_end' },
        ],
      },
      {
        id: 'clean_class_end',
        sceneNumber: 4,
        illustration: '🌟 Kelas bersih dan anak-anak senang.',
        narration: 'Alhamdulillah! Hari ini kamu belajar bahwa menjaga kebersihan itu sangat penting. Rasulullah shallallahu alaihi wasallam bersabda: "Kebersihan itu sebagian dari iman."',
        choices: [],
      },
    ],
  },
  {
    id: 'story_no_cheating',
    title: 'Tidak Mencontek',
    description: 'Belajar jujur saat ujian di sekolah',
    world: 'sekolah',
    lesson: 'kejujuran_sekolah',
    difficulty: 'sedang',
    minAge: 5,
    maxAge: 10,
    rewardBadge: 'jujur_ujian',
    scenes: [
      {
        id: 'cheat_1',
        sceneNumber: 1,
        illustration: '📝 Ujian matematika di kelas. Soal sangat sulit.',
        narration: 'Hari ini ada ujian matematika. Soalnya sangat sulit! Teman di sebelahmu sudah selesai dan lembar jawabannya terlihat jelas.',
        choices: [
          { id: 'ch1a', text: 'Tetap fokus mengerjakan sendiri', isCorrect: true, points: 15, feedback: 'Subhanallah! Jujur meskipun sulit itu tanda orang yang beriman!', nextSceneId: 'cheat_2' },
          { id: 'ch1b', text: 'Melihat jawaban teman', isCorrect: false, points: 0, feedback: 'Wah, mencontek itu sama dengan berbohong, lho. Allah Maha Melihat!', nextSceneId: 'cheat_2_wrong' },
        ],
      },
      {
        id: 'cheat_2',
        sceneNumber: 2,
        illustration: '😰 Anak menatap soal dengan bingung.',
        narration: 'Kamu menatap soal nomor 5 yang sangat sulit. Kamu sudah berusaha tapi belum menemukan jawabannya. Waktu hampir habis!',
        choices: [
          { id: 'ch2a', text: 'Coba jawab dengan kemampuan sendiri', isCorrect: true, points: 10, feedback: 'Baik! Berusaha dengan jujur lebih baik daripada nilai bagus dari mencontek.', nextSceneId: 'cheat_3' },
          { id: 'ch2b', text: 'Tanya teman di sebelah', isCorrect: false, points: 0, feedback: 'Hmm, saat ujian kita harus mandiri ya. Tanya jawaban itu sama dengan mencontek.', nextSceneId: 'cheat_3' },
        ],
      },
      {
        id: 'cheat_2_wrong',
        sceneNumber: 2,
        illustration: '😟 Bu Guru memperhatikan dari depan.',
        narration: 'Bu Guru melihatmu melihat jawaban teman. Bu Guru mendekat dan berkata pelan, "Nak, nilai yang jujur lebih berharga dari nilai sempurna yang curang."',
        choices: [
          { id: 'ch2w', text: 'Maaf, Bu. Saya tidak akan mencontek lagi.', isCorrect: true, points: 5, feedback: 'Alhamdulillah! Mengakui kesalahan dan berjanji untuk jujur itu baik.', nextSceneId: 'cheat_3' },
        ],
      },
      {
        id: 'cheat_3',
        sceneNumber: 3,
        illustration: '📋 Bu Guru mengumumkan hasil ujian.',
        narration: 'Beberapa hari kemudian, Bu Guru mengembalikan hasil ujian. Kamu mendapat nilai 70. Tidak sempurna, tapi ini hasil kerja kerasmu sendiri!',
        choices: [
          { id: 'ch3a', text: 'Alhamdulillah, aku puas dengan usahaku!', isCorrect: true, points: 15, feedback: 'Masya Allah! Nilai yang jujur lebih berharga. Allah senang melihat kejujuranmu!', nextSceneId: 'cheat_end' },
        ],
      },
      {
        id: 'cheat_end',
        sceneNumber: 4,
        illustration: '💎 Bintang kejujuran bersinar.',
        narration: 'Alhamdulillah! Kamu belajar bahwa nilai jujur lebih berharga dari nilai curang. Rasulullah shallallahu alaihi wasallam bersabda: "Hendaklah kamu selalu jujur, karena kejujuran membawa kebaikan."',
        choices: [],
      },
    ],
  },
  {
    id: 'story_sportivitas',
    title: 'Bermain dengan Adil',
    description: 'Belajar sportif saat bermain olahraga di sekolah',
    world: 'sekolah',
    lesson: 'sportivitas',
    difficulty: 'sedang',
    minAge: 5,
    maxAge: 10,
    rewardBadge: 'sportif',
    scenes: [
      {
        id: 'sport_1',
        sceneNumber: 1,
        illustration: '⚽ Anak-anak bermain sepak bola di lapangan sekolah.',
        narration: 'Saat jam olahraga, kamu bermain sepak bola. Timmu sedang kalah 0-1. Kamu melihat wasit tidak melihat saat bola keluar lapangan.',
        choices: [
          { id: 'sp1a', text: 'Jujur bilang bola keluar', isCorrect: true, points: 15, feedback: 'Subhanallah! Sportif dan jujur dalam bermain itu sangat terpuji!', nextSceneId: 'sport_2' },
          { id: 'sp1b', text: 'Diam saja, biar timmu dapat untung', isCorrect: false, points: 0, feedback: 'Wah, bermain curang itu tidak adil. Menang dengan curang bukan menang yang sesungguhnya.', nextSceneId: 'sport_2_wrong' },
        ],
      },
      {
        id: 'sport_2',
        sceneNumber: 2,
        illustration: '🏃 Pertandingan semakin seru.',
        narration: 'Pertandingan berlangsung ketat. Temanmu dari tim lawan terjatuh saat berlari. Dia terlihat kesakitan.',
        choices: [
          { id: 'sp2a', text: 'Hentikan permainan dan bantu temanmu', isCorrect: true, points: 10, feedback: 'Alhamdulillah! Menolong teman meskipun dari tim lawan itu sangat mulia!', nextSceneId: 'sport_3' },
          { id: 'sp2b', text: 'Manfaatkan kesempatan untuk mencetak gol', isCorrect: false, points: 0, feedback: 'Hmm, menang dengan cara seperti itu tidak sportif ya. Kita harus peduli pada teman.', nextSceneId: 'sport_3' },
        ],
      },
      {
        id: 'sport_2_wrong',
        sceneNumber: 2,
        illustration: '😟 Teman dari tim lawan melihatmu dengan kecewa.',
        narration: 'Teman dari tim lawan tahu bola sebenarnya keluar. "Hei, itu bola keluar! Kamu tidak jujur!" Semua teman mulai bertengkar.',
        choices: [
          { id: 'sp2w', text: 'Maaf, kamu benar. Bola keluar tadi.', isCorrect: true, points: 5, feedback: 'Alhamdulillah! Mengakui kesalahan itu butuh keberanian. Kamu hebat!', nextSceneId: 'sport_3' },
        ],
      },
      {
        id: 'sport_3',
        sceneNumber: 3,
        illustration: '🤝 Semua anak berjabat tangan setelah pertandingan.',
        narration: 'Pertandingan selesai. Timmu kalah 0-2, tapi semua teman senang karena bermain dengan adil dan menyenangkan.',
        choices: [
          { id: 'sp3a', text: 'Selamat ya! Kalian bermain bagus!', isCorrect: true, points: 15, feedback: 'Masya Allah! Menerima kekalahan dengan lapang dada itu tanda jiwa yang besar!', nextSceneId: 'sport_end' },
        ],
      },
      {
        id: 'sport_end',
        sceneNumber: 4,
        illustration: '⭐ Semua anak tertawa bahagia.',
        narration: 'Alhamdulillah! Hari ini kamu belajar bahwa bermain dengan adil itu lebih penting dari menang. Yang terpenting adalah menjaga persahabatan dan berlaku jujur!',
        choices: [],
      },
    ],
  },
  {
    id: 'story_khotbah',
    title: 'Adab Mendengarkan Khotbah',
    description: 'Belajar adab mendengarkan khotbah Jumat di masjid',
    world: 'masjid',
    lesson: 'adab_khotbah',
    difficulty: 'sedang',
    minAge: 6,
    maxAge: 10,
    rewardBadge: 'pendengar_khotbah',
    scenes: [
      {
        id: 'khotbah_1',
        sceneNumber: 1,
        illustration: '🕌 Hari Jumat. Khotib sedang berkhutbah di mimbar.',
        narration: 'Hari Jumat. Kamu sudah berwudhu dan duduk di masjid. Khotib mulai berkhutbah. Teman di sebelahmu mengajak berbicara.',
        choices: [
          { id: 'kh1a', text: 'Dengarkan khotbah dengan tenang', isCorrect: true, points: 15, feedback: 'Alhamdulillah! Mendengarkan khotbah dengan tenang itu sunnah yang sangat dianjurkan!', nextSceneId: 'khotbah_2' },
          { id: 'kh1b', text: 'Bisik-bisik dengan teman', isCorrect: false, points: 0, feedback: 'Wah, berbicara saat khotbah itu kurang baik. Rasulullah melarang kita berbicara saat khotbah.', nextSceneId: 'khotbah_2_wrong' },
        ],
      },
      {
        id: 'khotbah_2',
        sceneNumber: 2,
        illustration: '📖 Khotib bercerita tentang pentingnya berbakti kepada orang tua.',
        narration: 'Khotib bercerita tentang pentingnya berbakti kepada orang tua. Kamu mendengarkan dengan penuh perhatian dan mengambil pelajaran.',
        choices: [
          { id: 'kh2a', text: 'Perhatikan dan catat pelajarannya di hati', isCorrect: true, points: 10, feedback: 'Subhanallah! Mendengarkan dan mengamalkan isi khotbah itu sangat baik!', nextSceneId: 'khotbah_3' },
        ],
      },
      {
        id: 'khotbah_2_wrong',
        sceneNumber: 2,
        illustration: '👨 Seorang bapak mengingatkan dengan isyarat.',
        narration: 'Seorang bapak di depanmu menoleh dan mengisyaratkan agar diam. "Ssst, dengarkan khotbahnya, Nak."',
        choices: [
          { id: 'kh2w', text: 'Diam dan fokus mendengarkan', isCorrect: true, points: 5, feedback: 'Alhamdulillah! Mendengarkan nasihat orang tua itu baik.', nextSceneId: 'khotbah_3' },
        ],
      },
      {
        id: 'khotbah_3',
        sceneNumber: 3,
        illustration: '🧎 Sholat Jumat dimulai setelah khotbah.',
        narration: 'Khotbah selesai. Sholat Jumat dimulai. Kamu sholat dengan khusyuk dan tenang mengikuti imam.',
        choices: [
          { id: 'kh3a', text: 'Sholat dengan khusyuk dan rapi', isCorrect: true, points: 15, feedback: 'Masya Allah! Sholat Jumat dengan khusyuk itu sangat mulia!', nextSceneId: 'khotbah_end' },
        ],
      },
      {
        id: 'khotbah_end',
        sceneNumber: 4,
        illustration: '🌟 Anak keluar masjid dengan senyum bahagia.',
        narration: "Alhamdulillah! Kamu belajar bahwa mendengarkan khotbah dengan tenang itu sangat penting. Rasulullah shallallahu alaihi wasallam bersabda: 'Jika kamu berkata kepada temanmu diamlah pada hari Jumat saat imam berkhutbah, maka kamu telah berkata sia-sia.'",
        choices: [],
      },
    ],
  },
  {
    id: 'story_clean_mosque',
    title: 'Menjaga Kebersihan Masjid',
    description: 'Belajar menjaga kebersihan rumah Allah',
    world: 'masjid',
    lesson: 'kebersihan_masjid',
    difficulty: 'mudah',
    minAge: 4,
    maxAge: 10,
    rewardBadge: 'penjaga_masjid_bersih',
    scenes: [
      {
        id: 'cln_mosq_1',
        sceneNumber: 1,
        illustration: '🕌 Anak masuk masjid dan melihat ada sampah di karpet.',
        narration: 'Kamu datang ke masjid untuk sholat Ashar. Saat masuk, kamu melihat ada bungkus permen di atas karpet sajadah.',
        choices: [
          { id: 'cm1a', text: 'Ambil sampahnya dan buang ke tempat sampah', isCorrect: true, points: 15, feedback: 'Subhanallah! Menjaga kebersihan masjid itu ibadah yang sangat mulia!', nextSceneId: 'cln_mosq_2' },
          { id: 'cm1b', text: 'Biarkan saja, bukan sampahku', isCorrect: false, points: 0, feedback: 'Wah, masjid itu rumah Allah. Kita semua harus menjaganya!', nextSceneId: 'cln_mosq_2_wrong' },
        ],
      },
      {
        id: 'cln_mosq_2',
        sceneNumber: 2,
        illustration: '🧹 Anak membersihkan area masjid dengan semangat.',
        narration: 'Kamu membuang sampah dan melihat ada debu di rak sepatu. Kamu membersihkannya juga!',
        choices: [
          { id: 'cm2a', text: 'Bersihkan rak sepatu dengan senang hati', isCorrect: true, points: 10, feedback: 'Alhamdulillah! Membersihkan masjid dengan ikhlas itu pahalanya besar!', nextSceneId: 'cln_mosq_3' },
        ],
      },
      {
        id: 'cln_mosq_2_wrong',
        sceneNumber: 2,
        illustration: '👨 Seorang bapak memperhatikanmu.',
        narration: 'Seorang bapak melihatmu acuh terhadap sampah. "Nak, masjid ini rumah Allah. Menjaga kebersihan masjid itu ibadah, lho."',
        choices: [
          { id: 'cm2w', text: 'Baik, Pak. Saya akan bersihkan!', isCorrect: true, points: 5, feedback: 'Alhamdulillah! Mendengarkan nasihat dan langsung berbuat baik itu terpuji.', nextSceneId: 'cln_mosq_3' },
        ],
      },
      {
        id: 'cln_mosq_3',
        sceneNumber: 3,
        illustration: '✨ Masjid menjadi bersih dan wangi.',
        narration: 'Masjid menjadi bersih dan rapi. Beberapa jamaah tersenyum kepadamu. "Terima kasih, Nak. Kamu anak yang baik!"',
        choices: [
          { id: 'cm3a', text: 'Sama-sama! Ini rumah kita bersama!', isCorrect: true, points: 15, feedback: 'Masya Allah! Menjaga masjid dengan rendah hati itu sangat terpuji!', nextSceneId: 'cln_mosq_end' },
        ],
      },
      {
        id: 'cln_mosq_end',
        sceneNumber: 4,
        illustration: '🌟 Masjid yang bersih dan indah.',
        narration: 'Alhamdulillah! Hari ini kamu belajar bahwa menjaga kebersihan masjid itu sangat mulia. Rasulullah shallallahu alaihi wasallam bersabda: "Kebersihan itu sebagian dari iman." Masjid yang bersih membuat ibadah lebih khusyuk!',
        choices: [],
      },
    ],
  },
  {
    id: 'story_nice_words',
    title: 'Tidak Berkata Kasar',
    description: 'Belajar berkata baik saat bermain dengan teman',
    world: 'bermain',
    lesson: 'perkataan_baik',
    difficulty: 'mudah',
    minAge: 4,
    maxAge: 8,
    rewardBadge: 'mulut_manis',
    scenes: [
      {
        id: 'nice_1',
        sceneNumber: 1,
        illustration: '🎮 Anak-anak bermain game bersama di taman.',
        narration: 'Kamu bermain game bersama teman-teman di taman. Tiba-tiba kamu kalah dalam permainan. Kamu merasa kesal!',
        choices: [
          { id: 'nw1a', text: 'Ucapkan "Bagus sekali! Kamu hebat!"', isCorrect: true, points: 15, feedback: 'Subhanallah! Menerima kekalahan dengan perkataan baik itu luar biasa!', nextSceneId: 'nice_2' },
          { id: 'nw1b', text: 'Berkata "Kamu curang! Tidak adil!"', isCorrect: false, points: 0, feedback: 'Wah, berkata kasar saat kalah itu tidak baik. Yuk, kita belajar berkata baik!', nextSceneId: 'nice_2_wrong' },
          { id: 'nw1c', text: 'Diam saja sambil marah', isCorrect: false, points: 0, feedback: 'Hmm, marah boleh tapi jangan sampai berkata kasar ya. Komunikasi dengan baik!', nextSceneId: 'nice_2_wrong' },
        ],
      },
      {
        id: 'nice_2',
        sceneNumber: 2,
        illustration: '😊 Teman tersenyum senang dipuji.',
        narration: 'Temanmu tersenyum senang. "Terima kasih! Kamu juga hebat! Ayo main lagi!" Kalian berdua jadi semakin akrab.',
        choices: [
          { id: 'nw2a', text: 'Ayo! Main lagi yuk!', isCorrect: true, points: 10, feedback: 'Alhamdulillah! Perkataan baik membuat persahabatan semakin erat!', nextSceneId: 'nice_3' },
        ],
      },
      {
        id: 'nice_2_wrong',
        sceneNumber: 2,
        illustration: '😢 Teman terlihat sedih dan kecewa.',
        narration: 'Temanmu terlihat sedih mendengar perkataanmu. "Kenapa kamu berkata seperti itu? Aku tidak curang." Dia berjalan pergi.',
        choices: [
          { id: 'nw2w', text: 'Maaf, aku tidak bermaksud kasar. Aku emosi saja tadi.', isCorrect: true, points: 5, feedback: 'Alhamdulillah! Meminta maaf setelah berkata kasar itu penting.', nextSceneId: 'nice_3' },
        ],
      },
      {
        id: 'nice_3',
        sceneNumber: 3,
        illustration: '🤝 Anak-anak bermain bersama dengan gembira.',
        narration: 'Semua teman senang bermain bersama. Kamu ingat hadits Rasulullah: "Barang siapa yang beriman kepada Allah dan hari akhir, maka hendaklah ia berkata baik atau diam."',
        choices: [
          { id: 'nw3a', text: 'Aku akan selalu berkata baik!', isCorrect: true, points: 15, feedback: 'Masya Allah! Semoga kamu menjadi anak yang selalu berkata baik. Aamiin!', nextSceneId: 'nice_end' },
        ],
      },
      {
        id: 'nice_end',
        sceneNumber: 4,
        illustration: '🍬 Anak tersenyum manis.',
        narration: 'Alhamdulillah! Hari ini kamu belajar bahwa perkataan baik itu sangat penting. Perkataan yang baik membuat teman senang dan Allah ridha!',
        choices: [],
      },
    ],
  },
  {
    id: 'story_sabar',
    title: 'Mengalah dan Tidak Egois',
    description: 'Belajar sabar dan mengalah saat bermain',
    world: 'bermain',
    lesson: 'kesabaran',
    difficulty: 'sedang',
    minAge: 5,
    maxAge: 10,
    rewardBadge: 'sabar_hebat',
    scenes: [
      {
        id: 'sabar_1',
        sceneNumber: 1,
        illustration: '🎨 Anak-anak mewarnai bersama di taman.',
        narration: 'Kamu dan teman-teman sedang mewarnai bersama. Ada hanya satu crayon warna merah, dan kamu sangat membutuhkannya. Temanmu, Budi, sedang menggunakannya.',
        choices: [
          { id: 'sb1a', text: 'Tunggu dengan sabar sampai Budi selesai', isCorrect: true, points: 15, feedback: 'Subhanallah! Sabar menunggu itu tanda orang yang hebat!', nextSceneId: 'sabar_2' },
          { id: 'sb1b', text: 'Ambil crayon dari tangan Budi', isCorrect: false, points: 0, feedback: 'Wah, merebut barang teman itu tidak baik. Sabar ya!', nextSceneId: 'sabar_2_wrong' },
          { id: 'sb1c', text: 'Marah dan menangis', isCorrect: false, points: 0, feedback: 'Hmm, marah dan menangis tidak menyelesaikan masalah. Coba sabar!', nextSceneId: 'sabar_2_wrong' },
        ],
      },
      {
        id: 'sabar_2',
        sceneNumber: 2,
        illustration: '😊 Budi memberikan crayon merah kepadamu.',
        narration: 'Budi selesai menggunakan crayon merah dan memberikannya padamu. "Nih, silahkan! Aku sudah selesai." Kamu tersenyum senang.',
        choices: [
          { id: 'sb2a', text: 'Terima kasih, Budi! Kamu baik!', isCorrect: true, points: 10, feedback: 'Alhamdulillah! Sabar dan berterima kasih itu kombinasi yang sempurna!', nextSceneId: 'sabar_3' },
        ],
      },
      {
        id: 'sabar_2_wrong',
        sceneNumber: 2,
        illustration: '😢 Budi terlihat kaget dan sedih.',
        narration: 'Budi terlihat kaget. "Hei, aku belum selesai! Itu tidak adil!" Teman-teman yang lain melihat kalian dengan cemas.',
        choices: [
          { id: 'sb2w', text: 'Maaf, Budi. Aku akan tunggu.', isCorrect: true, points: 5, feedback: 'Alhamdulillah! Mengakui kesalahan dan bersabar itu baik.', nextSceneId: 'sabar_3' },
        ],
      },
      {
        id: 'sabar_3',
        sceneNumber: 3,
        illustration: '🌈 Semua anak mewarnai dengan gembira.',
        narration: 'Setelah semua selesai, gambar kalian menjadi sangat indah. Semua orang saling memuji hasil karya masing-masing.',
        choices: [
          { id: 'sb3a', text: 'Wah, gambar Budi bagus sekali!', isCorrect: true, points: 15, feedback: 'Masya Allah! Memuji karya teman itu tanda hati yang besar dan tidak egois!', nextSceneId: 'sabar_end' },
        ],
      },
      {
        id: 'sabar_end',
        sceneNumber: 4,
        illustration: '🧘 Anak tersenyum tenang dan bahagia.',
        narration: 'Alhamdulillah! Hari ini kamu belajar bahwa sabar dan mengalah itu sangat mulia. Rasulullah shallallahu alaihi wasallam bersabda: "Bukanlah orang yang kuat itu yang kuat bergulat, tetapi orang yang kuat adalah yang mampu mengendalikan dirinya saat marah."',
        choices: [],
      },
    ],
  },
  {
    id: 'story_amanah',
    title: 'Menjaga Barang Teman',
    description: 'Belajar menjaga amanah dan kepercayaan teman',
    world: 'bermain',
    lesson: 'amanah',
    difficulty: 'sedang',
    minAge: 5,
    maxAge: 10,
    rewardBadge: 'teman_amanah',
    scenes: [
      {
        id: 'amanah_1',
        sceneNumber: 1,
        illustration: '🎒 Teman menitipkan tas saat istirahat.',
        narration: 'Saat istirahat sekolah, temanmu Hasan menitipkan tasnya padamu. "Tolong jaga tas aku ya, aku mau ke toilet."',
        choices: [
          { id: 'am1a', text: 'Baik, Hasan. Aku jaga baik-baik!', isCorrect: true, points: 15, feedback: 'Subhanallah! Menjaga barang titipan teman itu tanda orang yang amanah!', nextSceneId: 'amanah_2' },
          { id: 'am1b', text: 'Ya, tapi letakkan saja di situ', isCorrect: false, points: 0, feedback: 'Wah, kalau kita menerima amanah, harus dijaga dengan baik ya!', nextSceneId: 'amanah_2_wrong' },
        ],
      },
      {
        id: 'amanah_2',
        sceneNumber: 2,
        illustration: '👀 Ada anak lain yang ingin membuka tas Hasan.',
        narration: 'Saat Hasan pergi, ada anak lain yang datang. "Eh, tas Hasan! Buka yuk, mau lihat isinya!"',
        choices: [
          { id: 'am2a', text: 'Tidak boleh, ini titipan Hasan. Harus dijaga!', isCorrect: true, points: 10, feedback: 'Alhamdulillah! Menjaga amanah meskipun digoda itu luar biasa!', nextSceneId: 'amanah_3' },
          { id: 'am2b', text: 'Boleh, cuma lihat sebentar', isCorrect: false, points: 0, feedback: 'Hmm, membuka barang orang lain tanpa izin itu tidak baik. Itu melanggar amanah.', nextSceneId: 'amanah_3' },
        ],
      },
      {
        id: 'amanah_2_wrong',
        sceneNumber: 2,
        illustration: '😟 Hasan kembali dan melihat tasnya dibuka.',
        narration: 'Hasan kembali dan melihat tasnya sudah dibuka. "Hei, kenapa tasku dibuka? Aku titipkan padamu karena percaya!"',
        choices: [
          { id: 'am2w', text: 'Maaf, Hasan. Aku tidak akan mengulanginya.', isCorrect: true, points: 5, feedback: 'Alhamdulillah! Meminta maaf dan berjanji untuk amanah itu baik.', nextSceneId: 'amanah_3' },
        ],
      },
      {
        id: 'amanah_3',
        sceneNumber: 3,
        illustration: '😊 Hasan menerima tasnya dengan selamat.',
        narration: 'Hasan kembali dan menerima tasnya dengan selamat. "Terima kasih ya! Kamu teman yang bisa dipercaya!" Kamu merasa bangga.',
        choices: [
          { id: 'am3a', text: 'Sama-sama, Hasan! Kita teman!', isCorrect: true, points: 15, feedback: 'Masya Allah! Menjadi teman yang amanah itu sangat berharga!', nextSceneId: 'amanah_end' },
        ],
      },
      {
        id: 'amanah_end',
        sceneNumber: 4,
        illustration: '🤝 Dua anak bersalaman dengan gembira.',
        narration: 'Alhamdulillah! Hari ini kamu belajar bahwa menjaga amanah itu sangat penting. Rasulullah shallallahu alaihi wasallam bersabda: "Tidak ada iman bagi orang yang tidak amanah."',
        choices: [],
      },
    ],
  },
  {
    id: 'story_clean_room',
    title: 'Menjaga Kebersihan Kamar',
    description: 'Belajar menjaga kebersihan kamar sendiri',
    world: 'rumah',
    lesson: 'kebersihan_rumah',
    difficulty: 'mudah',
    minAge: 4,
    maxAge: 8,
    rewardBadge: 'kamar_rapi',
    scenes: [
      {
        id: 'cln_room_1',
        sceneNumber: 1,
        illustration: '🛏️ Kamar berantakan dengan mainan berserakan.',
        narration: 'Pagi hari. Kamu bangun tidur dan melihat kamar sangat berantakan. Boneka, buku, dan mainan berserangan di lantai. Ibu memanggil dari dapur.',
        choices: [
          { id: 'cr1a', text: 'Langsung rapikan kamar sebelum bermain', isCorrect: true, points: 15, feedback: 'Subhanallah! Merapikan kamar sendiri itu tanda anak yang mandiri!', nextSceneId: 'cln_room_2' },
          { id: 'cr1b', text: 'Biarkan saja, nanti juga dirapikan Ibu', isCorrect: false, points: 0, feedback: 'Wah, kamar sendiri itu tanggung jawab kita, lho. Ibu sudah banyak pekerjaan.', nextSceneId: 'cln_room_2_wrong' },
        ],
      },
      {
        id: 'cln_room_2',
        sceneNumber: 2,
        illustration: '🧹 Anak menyapu dan merapikan kamar.',
        narration: 'Kamu mulai merapikan. Boneka ditaruh di rak, buku disusun di meja, dan mainan dimasukkan ke kotak. Kamar mulai rapi!',
        choices: [
          { id: 'cr2a', text: 'Lanjutkan sampai kamar benar-benar bersih', isCorrect: true, points: 10, feedback: 'Alhamdulillah! Menyelesaikan pekerjaan sampai tuntas itu sangat baik!', nextSceneId: 'cln_room_3' },
        ],
      },
      {
        id: 'cln_room_2_wrong',
        sceneNumber: 2,
        illustration: '👩 Ibu melihat kamar yang berantakan.',
        narration: 'Ibu masuk ke kamar dan melihat berantakan. "Nak, kamar itu tanggung jawabmu. Ibu capek kalau harus selalu merapikan kamar kamu."',
        choices: [
          { id: 'cr2w', text: 'Maaf, Bu. Aku akan rapikan sekarang!', isCorrect: true, points: 5, feedback: 'Alhamdulillah! Mendengarkan Ibu dan langsung berbuat baik itu terpuji.', nextSceneId: 'cln_room_3' },
        ],
      },
      {
        id: 'cln_room_3',
        sceneNumber: 3,
        illustration: '✨ Kamar menjadi bersih, rapi, dan wangi.',
        narration: 'Kamar sudah bersih dan rapi! Ibu datang dan tersenyum bangga. "Wah, kamar kamu rapi sekali! Anak Ibu hebat!"',
        choices: [
          { id: 'cr3a', text: 'Terima kasih, Bu! Aku akan jaga terus!', isCorrect: true, points: 15, feedback: 'Masya Allah! Berjanji menjaga kebersihan itu mulia!', nextSceneId: 'cln_room_end' },
        ],
      },
      {
        id: 'cln_room_end',
        sceneNumber: 4,
        illustration: '🛏️ Kamar rapi dan anak tersenyum bangga.',
        narration: 'Alhamdulillah! Hari ini kamu belajar bahwa menjaga kebersihan kamar itu tanggung jawab kita. Rasulullah shallallahu alaihi wasallam menyukai kebersihan. Yuk, jaga kamar tetap rapi setiap hari!',
        choices: [],
      },
    ],
  },
  {
    id: 'story_hormat_lansia',
    title: 'Berbakti kepada Kakek Nenek',
    description: 'Belajar menghormati dan menyayangi kakek nenek',
    world: 'rumah',
    lesson: 'hormat_lansia',
    difficulty: 'mudah',
    minAge: 4,
    maxAge: 10,
    rewardBadge: 'cucu_teladan',
    scenes: [
      {
        id: 'lansia_1',
        sceneNumber: 1,
        illustration: '👴 Nenek datang berkunjung ke rumah.',
        narration: 'Nenek datang berkunjung ke rumah setelah perjalanan jauh. Nenek terlihat lelah membawa tas berat.',
        choices: [
          { id: 'ln1a', text: 'Sambut Nenek dan bantu bawakan tasnya', isCorrect: true, points: 15, feedback: 'Subhanallah! Menyambut dan membantu Nenek itu sangat mulia!', nextSceneId: 'lansia_2' },
          { id: 'ln1b', text: 'Sibuk bermain game, tidak peduli', isCorrect: false, points: 0, feedback: 'Wah, Nenek datang jauh-jauh. Sambut dengan senyum ya!', nextSceneId: 'lansia_2_wrong' },
        ],
      },
      {
        id: 'lansia_2',
        sceneNumber: 2,
        illustration: '☕ Anak menyuguhi Nenek minuman.',
        narration: 'Nenek duduk di kursi. Kamu melihat Nenek kehausan. Ibu sedang di dapur menyiapkan makanan.',
        choices: [
          { id: 'ln2a', text: 'Ambilkan minum untuk Nenek', isCorrect: true, points: 10, feedback: 'Alhamdulillah! Melayani orang tua dan lansia itu ibadah yang besar!', nextSceneId: 'lansia_3' },
          { id: 'ln2b', text: 'Tunggu Ibu saja yang mengambilkan', isCorrect: false, points: 0, feedback: 'Hmm, kamu bisa membantu sendiri, lho. Nenek pasti senang dilayani cucunya!', nextSceneId: 'lansia_3' },
        ],
      },
      {
        id: 'lansia_2_wrong',
        sceneNumber: 2,
        illustration: '😢 Nenek terlihat sedih dan kecewa.',
        narration: 'Nenek melihatmu sibuk bermain tanpa menyapanya. Nenek terlihat sedih. "Nenek datang jauh-jauh ingin bertemu cucu tersayang."',
        choices: [
          { id: 'ln2w', text: 'Maaf, Nek! Aku senang Nenek datang!', isCorrect: true, points: 5, feedback: 'Alhamdulillah! Meminta maaf dan menyayangi Nenek itu baik.', nextSceneId: 'lansia_3' },
        ],
      },
      {
        id: 'lansia_3',
        sceneNumber: 3,
        illustration: '💕 Anak dan Nenek duduk bersama bercerita.',
        narration: 'Kamu duduk di samping Nenek dan mendengarkan cerita masa kecil Nenek. Nenek tersenyum bahagia ditemani cucunya.',
        choices: [
          { id: 'ln3a', text: 'Cerita Nenek menarik sekali, Nek!', isCorrect: true, points: 15, feedback: 'Masya Allah! Mendengarkan cerita orang tua dan lansia itu sangat bermakna!', nextSceneId: 'lansia_end' },
        ],
      },
      {
        id: 'lansia_end',
        sceneNumber: 4,
        illustration: '👴💕 Nenek memeluk cucunya dengan penuh sayang.',
        narration: 'Alhamdulillah! Hari ini kamu belajar bahwa menghormati dan menyayangi kakek nenek itu sangat mulia. Rasulullah shallallahu alaihi wasallam bersabda: "Bukanlah golongan kami orang yang tidak menyayangi yang muda dan tidak menghormati yang tua."',
        choices: [],
      },
    ],
  },
];

export function getStoriesByWorld(world: string): Story[] {
  return stories.filter((s) => s.world === world);
}

export function getStoryById(id: string): Story | undefined {
  return stories.find((s) => s.id === id);
}

export function getStoriesByLesson(lesson: string): Story[] {
  return stories.filter((s) => s.lesson === lesson);
}
