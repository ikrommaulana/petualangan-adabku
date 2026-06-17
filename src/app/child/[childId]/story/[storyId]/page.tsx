'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  getChildProfile,
  saveStoryProgress,
  updateStoryProgress,
  getStoryProgress,
  addPointsToChild,
  addBadgeToChild,
  markStoryCompleted,
} from '@/lib/firebase-services';
import { getGuestChild, updateGuestChild } from '@/lib/guest';
import { getStoryById } from '@/data/stories';
import { ChildProfile, StoryScene, StoryChoice, Story } from '@/types';
import { speak, stopSpeaking } from '@/lib/tts';
import { motion, AnimatePresence } from 'framer-motion';

export default function StoryPage() {
  const params = useParams();
  const childId = params.childId as string;
  const storyId = params.storyId as string;
  const { user, loading: authLoading, isGuest } = useAuth();
  const router = useRouter();

  const [child, setChild] = useState<ChildProfile | null>(null);
  const [story, setStory] = useState<Story | null>(null);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<StoryChoice | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [progressId, setProgressId] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ttsEnabled, setTtsEnabled] = useState(true);

  useEffect(() => {
    if (!authLoading && !user && !isGuest) {
      router.push('/auth/login');
      return;
    }
    if (isGuest) {
      loadGuestData();
    } else if (user) {
      loadData();
    }
    return () => stopSpeaking();
  }, [user, authLoading, isGuest]);

  const loadGuestData = async () => {
    try {
      const storyData = getStoryById(storyId);
      if (!storyData) {
        router.push(`/child/${childId}/world`);
        return;
      }
      setStory(storyData);
      setChild(getGuestChild());

      const saved = localStorage.getItem(`guestStory_${storyId}`);
      if (saved) {
        try {
          const p = JSON.parse(saved);
          if (p.completed) {
            setIsCompleted(true);
            setCurrentSceneIndex(storyData.scenes.length - 1);
          } else {
            setCurrentSceneIndex(p.currentSceneIndex || 0);
            setTotalPoints(p.pointsEarned || 0);
          }
        } catch {}
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadData = async () => {
    try {
      const [profile, storyData] = await Promise.all([
        getChildProfile(childId),
        Promise.resolve(getStoryById(storyId)),
      ]);

      setChild(profile);
      if (!storyData) {
        router.push(`/child/${childId}/world`);
        return;
      }
      setStory(storyData);

      const existingProgress = await getStoryProgress(childId, storyId);
      if (existingProgress) {
        if (existingProgress.completed) {
          setIsCompleted(true);
          setCurrentSceneIndex(storyData.scenes.length - 1);
        } else {
          setCurrentSceneIndex(existingProgress.currentSceneIndex);
          setTotalPoints(existingProgress.pointsEarned);
          setProgressId(existingProgress.id);
        }
      } else {
        const newProgressId = await saveStoryProgress({
          childId,
          storyId,
          currentSceneIndex: 0,
          choicesMade: [],
          completed: false,
          pointsEarned: 0,
          startedAt: new Date().toISOString(),
        });
        setProgressId(newProgressId);
      }
    } catch (error) {
      console.error('Error loading story:', error);
    } finally {
      setLoading(false);
    }
  };

  const currentScene = story?.scenes[currentSceneIndex];

  const handleNarrate = useCallback(() => {
    if (!currentScene || !ttsEnabled) return;
    speak(currentScene.narration);
  }, [currentScene, ttsEnabled]);

  useEffect(() => {
    if (currentScene && ttsEnabled) {
      const timer = setTimeout(() => speak(currentScene.narration), 500);
      return () => clearTimeout(timer);
    }
  }, [currentSceneIndex, ttsEnabled]);

  const handleChoice = async (choice: StoryChoice) => {
    if (showFeedback) return;
    setSelectedChoice(choice);
    setShowFeedback(true);
    stopSpeaking();

    const pointsEarned = choice.points;
    setTotalPoints((prev) => prev + pointsEarned);

    if (isGuest) {
      if (pointsEarned > 0) {
        const guest = getGuestChild();
        updateGuestChild({
          akhlakPoints: guest.akhlakPoints + pointsEarned,
          level: Math.floor((guest.akhlakPoints + pointsEarned) / 100) + 1,
        });
      }
      localStorage.setItem(`guestStory_${storyId}`, JSON.stringify({
        currentSceneIndex,
        pointsEarned: totalPoints + pointsEarned,
        completed: false,
      }));
    } else {
      if (pointsEarned > 0) {
        await addPointsToChild(childId, pointsEarned);
      }

      if (progressId) {
        await updateStoryProgress(progressId, {
          currentSceneIndex: currentSceneIndex,
          choicesMade: [
            ...(story?.scenes.slice(0, currentSceneIndex).map((_, i) => ({
              sceneId: story.scenes[i].id,
              choiceId: '',
              isCorrect: true,
            })) || []),
            { sceneId: currentScene!.id, choiceId: choice.id, isCorrect: choice.isCorrect },
          ],
          pointsEarned: totalPoints + pointsEarned,
        });
      }
    }

    if (ttsEnabled) {
      speak(choice.feedback);
    }
  };

  const handleNextScene = async () => {
    if (!story) return;
    stopSpeaking();

    const nextSceneId = selectedChoice?.nextSceneId;

    if (!nextSceneId || currentSceneIndex >= story.scenes.length - 1) {
      await completeStory();
      return;
    }

    const nextIndex = story.scenes.findIndex((s) => s.id === nextSceneId);
    if (nextIndex >= 0) {
      setCurrentSceneIndex(nextIndex);
    } else {
      setCurrentSceneIndex((prev) => prev + 1);
    }
    setSelectedChoice(null);
    setShowFeedback(false);
  };

  const completeStory = async () => {
    setIsCompleted(true);
    setShowCompletion(true);
    stopSpeaking();

    if (isGuest) {
      const guest = getGuestChild();
      if (!guest.completedStories.includes(storyId)) {
        updateGuestChild({
          completedStories: [...guest.completedStories, storyId],
          completedLessons: guest.completedLessons.includes(story!.lesson)
            ? guest.completedLessons
            : [...guest.completedLessons, story!.lesson],
        });
      }
      localStorage.setItem(`guestStory_${storyId}`, JSON.stringify({
        currentSceneIndex: story!.scenes.length - 1,
        pointsEarned: totalPoints,
        completed: true,
      }));
    } else {
      await markStoryCompleted(childId, storyId, story!.lesson);

      if (progressId) {
        await updateStoryProgress(progressId, {
          completed: true,
          completedAt: new Date().toISOString(),
          pointsEarned: totalPoints,
        });
      }

      if (story!.rewardBadge) {
        await addBadgeToChild(childId, story!.rewardBadge);
      }
    }

    if (ttsEnabled) {
      speak('Alhamdulillah! Kamu telah menyelesaikan cerita ini! Hebat sekali!');
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} className="text-6xl">📖</motion.div>
      </div>
    );
  }

  if (!story || !currentScene) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Cerita tidak ditemukan</p>
      </div>
    );
  }

  const sceneIllustration = currentScene.illustration;

  return (
    <div className="min-h-screen flex flex-col px-4 py-4">
      <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => router.push(`/child/${childId}/world/${story.world}`)}
            className="text-2xl"
          >
            ⬅️
          </button>
          <h1 className="text-lg font-bold text-gray-800 text-center flex-1 px-2 truncate">{story.title}</h1>
          <button onClick={() => setTtsEnabled(!ttsEnabled)} className="text-2xl">
            {ttsEnabled ? '🔊' : '🔇'}
          </button>
        </div>

        <div className="progress-bar mb-4">
          <div
            className="progress-fill"
            style={{ width: `${((currentSceneIndex + 1) / story.scenes.length) * 100}%` }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col"
          >
            <div className="comic-panel mb-4">
              <div className="bg-gradient-to-br from-primary-50 to-secondary-50 p-8 flex items-center justify-center min-h-[200px]">
                <div className="text-center">
                  <div className="text-2xl md:text-lg leading-relaxed text-gray-700 whitespace-pre-line">
                    {sceneIllustration}
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-lg text-gray-700 leading-relaxed">{currentScene.narration}</p>
                {currentScene.characterDialogue && (
                  <div className="mt-3 p-3 bg-primary-50 rounded-xl">
                    <p className="text-primary-800 font-semibold italic">&ldquo;{currentScene.characterDialogue}&rdquo;</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-3 mb-4">
              {!showFeedback && currentScene.choices.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-center text-gray-500 font-semibold mb-3">Apa yang harus dilakukan?</p>
                  {currentScene.choices.map((choice, index) => (
                    <motion.button
                      key={choice.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      onClick={() => handleChoice(choice)}
                      className="choice-neutral mb-2"
                    >
                      <span className="mr-2">{index === 1 ? '🟡' : '🟢'}</span>
                      {choice.text}
                    </motion.button>
                  ))}
                </motion.div>
              )}

              {showFeedback && selectedChoice && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`p-4 rounded-2xl border-3 ${
                    selectedChoice.isCorrect
                      ? 'bg-success-50 border-success-300'
                      : 'bg-orange-50 border-orange-300'
                  }`}
                >
                  <div className="text-center mb-3">
                    <span className="text-4xl">
                      {selectedChoice.isCorrect ? '🌟' : '💭'}
                    </span>
                    <p className="text-lg font-bold mt-2">
                      {selectedChoice.isCorrect ? 'Bagus Sekali!' : 'Hmm, Coba Lagi Ya!'}
                    </p>
                  </div>
                  <p className="text-gray-700 text-center">{selectedChoice.feedback}</p>
                  {selectedChoice.points > 0 && (
                    <motion.p
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: 'spring' }}
                      className="text-center text-accent-600 font-bold text-xl mt-2"
                    >
                      +{selectedChoice.points} Poin Akhlak! 💎
                    </motion.p>
                  )}
                  <div className="text-center mt-4">
                    <button onClick={handleNextScene} className="btn-primary">
                      {currentSceneIndex >= story.scenes.length - 1 ? '🎉 Selesai' : '➡️ Lanjutkan'}
                    </button>
                  </div>
                </motion.div>
              )}

              {currentScene.choices.length === 0 && !showCompletion && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <button onClick={completeStory} className="btn-success text-lg">
                    🎉 Selesaikan Cerita
                  </button>
                </motion.div>
              )}
            </div>

            <div className="text-center text-sm text-gray-500">
              Adegan {currentSceneIndex + 1} dari {story.scenes.length} · 💎 {totalPoints} Poin
            </div>
          </motion.div>
        </AnimatePresence>

        {showCompletion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full text-center"
            >
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-7xl mb-4"
              >
                🎉
              </motion.div>
              <h2 className="text-2xl font-bold text-primary-700 mb-2">Alhamdulillah!</h2>
              <p className="text-gray-600 mb-4">Kamu telah menyelesaikan cerita &ldquo;{story.title}&rdquo;!</p>
              <div className="flex justify-center gap-4 mb-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-accent-600">{totalPoints}</p>
                  <p className="text-sm text-gray-500">Poin Didapat</p>
                </div>
                {story.rewardBadge && (
                  <div className="text-center">
                    <p className="text-3xl">🏅</p>
                    <p className="text-sm text-gray-500">Badge Baru!</p>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => router.push(`/child/${childId}/world/${story.world}`)}
                  className="btn-primary w-full"
                >
                  📚 Cerita Lain
                </button>
                <button
                  onClick={() => router.push(`/child/${childId}/world`)}
                  className="btn-secondary w-full"
                >
                  🌍 Pilih Dunia
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
