import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  addDoc,
  deleteDoc,
} from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { Parent, ChildProfile, StoryProgress, MissionProgress } from '@/types';

function compressImage(file: File, maxSize = 300): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let w = img.width;
        let h = img.height;
        if (w > h) { if (w > maxSize) { h = Math.round(h * maxSize / w); w = maxSize; } }
        else { if (h > maxSize) { w = Math.round(w * maxSize / h); h = maxSize; } }
        canvas.width = w;
        canvas.height = h;
        canvas.getContext('2d')!.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      };
      img.onerror = reject;
      img.src = reader.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function registerParent(email: string, password: string, displayName: string): Promise<Parent> {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(cred.user, { displayName });

  const parent: Parent = {
    uid: cred.user.uid,
    email,
    displayName,
    createdAt: new Date().toISOString(),
  };

  await setDoc(doc(db, 'parents', cred.user.uid), parent);
  return parent;
}

export async function loginParent(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function logoutParent() {
  return signOut(auth);
}

export async function createChildProfile(
  parentId: string,
  name: string,
  age: number,
  gender: 'laki-laki' | 'perempuan',
  photoFile?: File
): Promise<ChildProfile> {
  let photoURL = '';

  if (photoFile) {
    photoURL = await compressImage(photoFile);
  }

  const childData = {
    parentId,
    name,
    age,
    gender,
    photoURL,
    avatarURL: '',
    akhlakPoints: 0,
    level: 1,
    badges: [],
    cosmetics: [],
    completedStories: [],
    completedLessons: [],
    createdAt: new Date().toISOString(),
  };

  const docRef = await addDoc(collection(db, 'children'), childData);
  return { id: docRef.id, ...childData };
}

export async function getChildProfiles(parentId: string): Promise<ChildProfile[]> {
  const q = query(collection(db, 'children'), where('parentId', '==', parentId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as ChildProfile));
}

export async function getChildProfile(childId: string): Promise<ChildProfile | null> {
  const snap = await getDoc(doc(db, 'children', childId));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as ChildProfile;
}

export async function updateChildProfile(childId: string, data: Partial<ChildProfile>) {
  await updateDoc(doc(db, 'children', childId), data);
}

export async function uploadChildPhoto(childId: string, file: File): Promise<string> {
  const photoURL = await compressImage(file);
  await updateDoc(doc(db, 'children', childId), { photoURL });
  return photoURL;
}

export async function saveStoryProgress(progress: Omit<StoryProgress, 'id'>): Promise<string> {
  const docRef = await addDoc(collection(db, 'storyProgress'), progress);
  return docRef.id;
}

export async function updateStoryProgress(progressId: string, data: Partial<StoryProgress>) {
  await updateDoc(doc(db, 'storyProgress', progressId), data);
}

export async function getStoryProgress(childId: string, storyId: string): Promise<StoryProgress | null> {
  const q = query(
    collection(db, 'storyProgress'),
    where('childId', '==', childId),
    where('storyId', '==', storyId)
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const docData = snap.docs[0];
  return { id: docData.id, ...docData.data() } as StoryProgress;
}

export async function getAllStoryProgress(childId: string): Promise<StoryProgress[]> {
  const q = query(collection(db, 'storyProgress'), where('childId', '==', childId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as StoryProgress));
}

export async function saveMissionProgress(progress: Omit<MissionProgress, 'id'>): Promise<string> {
  const docRef = await addDoc(collection(db, 'missionProgress'), progress);
  return docRef.id;
}

export async function verifyMission(progressId: string) {
  await updateDoc(doc(db, 'missionProgress', progressId), { verifiedByParent: true });
}

export async function getMissionProgress(childId: string, date: string): Promise<MissionProgress[]> {
  const q = query(
    collection(db, 'missionProgress'),
    where('childId', '==', childId),
    where('date', '==', date)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as MissionProgress));
}

export async function getWeeklyMissionProgress(childId: string, startDate: string, endDate: string): Promise<MissionProgress[]> {
  const q = query(
    collection(db, 'missionProgress'),
    where('childId', '==', childId),
    where('date', '>=', startDate),
    where('date', '<=', endDate)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as MissionProgress));
}

export async function addPointsToChild(childId: string, points: number) {
  const child = await getChildProfile(childId);
  if (!child) return;

  const newPoints = child.akhlakPoints + points;
  const newLevel = Math.floor(newPoints / 100) + 1;

  await updateDoc(doc(db, 'children', childId), {
    akhlakPoints: newPoints,
    level: Math.min(newLevel, 10),
  });
}

export async function addBadgeToChild(childId: string, badgeId: string) {
  const child = await getChildProfile(childId);
  if (!child || child.badges.includes(badgeId)) return;

  await updateDoc(doc(db, 'children', childId), {
    badges: [...child.badges, badgeId],
  });
}

export async function addCosmeticToChild(childId: string, cosmeticId: string) {
  const child = await getChildProfile(childId);
  if (!child || child.cosmetics.includes(cosmeticId)) return;

  await updateDoc(doc(db, 'children', childId), {
    cosmetics: [...child.cosmetics, cosmeticId],
  });
}

export async function markStoryCompleted(childId: string, storyId: string, lessonType: string) {
  const child = await getChildProfile(childId);
  if (!child) return;

  const updates: Partial<ChildProfile> = {};
  if (!child.completedStories.includes(storyId)) {
    updates.completedStories = [...child.completedStories, storyId];
  }
  if (!child.completedLessons.includes(lessonType)) {
    updates.completedLessons = [...child.completedLessons, lessonType];
  }

  await updateDoc(doc(db, 'children', childId), updates);
}
