import { ChildProfile } from '@/types';

const GUEST_CHILD_ID = 'guest_child';

export function isGuestUser(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('guestMode') === 'true';
}

export function getGuestChild(): ChildProfile {
  const saved = localStorage.getItem('guestChild');
  if (saved) {
    try { return JSON.parse(saved); } catch {}
  }
  const fresh: ChildProfile = {
    id: GUEST_CHILD_ID,
    parentId: 'guest',
    name: 'Tamu',
    age: 6,
    gender: 'laki-laki',
    photoURL: '',
    avatarURL: '',
    akhlakPoints: 0,
    level: 1,
    badges: [],
    cosmetics: [],
    completedStories: [],
    completedLessons: [],
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem('guestChild', JSON.stringify(fresh));
  return fresh;
}

export function updateGuestChild(data: Partial<ChildProfile>) {
  const current = getGuestChild();
  const updated = { ...current, ...data };
  localStorage.setItem('guestChild', JSON.stringify(updated));
  return updated;
}

export function isStoryLockedForGuest(storyIndex: number): boolean {
  return storyIndex > 0;
}

export function isMissionLockedForGuest(missionIndex: number): boolean {
  return missionIndex > 0;
}
