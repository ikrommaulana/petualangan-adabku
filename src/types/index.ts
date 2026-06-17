export interface Parent {
  uid: string;
  email: string;
  displayName: string;
  createdAt: string;
}

export interface ChildProfile {
  id: string;
  parentId: string;
  name: string;
  age: number;
  gender: 'laki-laki' | 'perempuan';
  photoURL: string;
  avatarURL: string;
  akhlakPoints: number;
  level: number;
  badges: string[];
  cosmetics: string[];
  completedStories: string[];
  completedLessons: string[];
  createdAt: string;
}

export interface StoryScene {
  id: string;
  sceneNumber: number;
  illustration: string;
  narration: string;
  characterDialogue?: string;
  choices: StoryChoice[];
}

export interface StoryChoice {
  id: string;
  text: string;
  isCorrect: boolean;
  points: number;
  feedback: string;
  nextSceneId: string | null;
}

export interface Story {
  id: string;
  title: string;
  description: string;
  world: WorldType;
  lesson: LessonType;
  difficulty: 'mudah' | 'sedang' | 'sulit';
  scenes: StoryScene[];
  rewardBadge?: string;
  rewardCosmetic?: string;
  minAge: number;
  maxAge: number;
}

export type WorldType = 'rumah' | 'sekolah' | 'masjid' | 'bermain';
export type LessonType =
  | 'salam'
  | 'menghormati_orangtua'
  | 'menghormati_guru'
  | 'jujur'
  | 'berbagi'
  | 'adab_masjid'
  | 'adab_makan'
  | 'minta_izin'
  | 'kebersihan'
  | 'kejujuran_sekolah'
  | 'sportivitas'
  | 'adab_khotbah'
  | 'kebersihan_masjid'
  | 'perkataan_baik'
  | 'kesabaran'
  | 'amanah'
  | 'kebersihan_rumah'
  | 'hormat_lansia';

export interface WorldInfo {
  id: WorldType;
  name: string;
  description: string;
  emoji: string;
  color: string;
  gradient: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  emoji: string;
  requirement: string;
}

export interface Cosmetic {
  id: string;
  name: string;
  type: 'hat' | 'glasses' | 'accessory' | 'background';
  emoji: string;
  pointsRequired: number;
}

export interface DailyMission {
  id: string;
  title: string;
  description: string;
  lesson: LessonType;
  emoji: string;
  points: number;
}

export interface MissionProgress {
  id: string;
  childId: string;
  missionId: string;
  date: string;
  completed: boolean;
  verifiedByParent: boolean;
  photoURL?: string;
}

export interface StoryProgress {
  id: string;
  childId: string;
  storyId: string;
  currentSceneIndex: number;
  choicesMade: { sceneId: string; choiceId: string; isCorrect: boolean }[];
  completed: boolean;
  pointsEarned: number;
  startedAt: string;
  completedAt?: string;
}

export interface WeeklyReport {
  weekStart: string;
  weekEnd: string;
  storiesCompleted: number;
  missionsCompleted: number;
  pointsEarned: number;
  lessonsLearned: string[];
  badgesEarned: string[];
}
