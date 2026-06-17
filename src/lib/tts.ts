let voicesLoaded = false;
let voices: SpeechSynthesisVoice[] = [];

function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      resolve([]);
      return;
    }

    const existing = window.speechSynthesis.getVoices();
    if (existing.length > 0) {
      voices = existing;
      voicesLoaded = true;
      resolve(voices);
      return;
    }

    window.speechSynthesis.onvoiceschanged = () => {
      voices = window.speechSynthesis.getVoices();
      voicesLoaded = true;
      resolve(voices);
    };

    setTimeout(() => {
      if (!voicesLoaded) {
        voices = window.speechSynthesis.getVoices();
        resolve(voices);
      }
    }, 1000);
  });
}

function findIndonesianVoice(): SpeechSynthesisVoice | null {
  const exact = voices.find((v) => v.lang === 'id-ID');
  if (exact) return exact;

  const startsWith = voices.find((v) => v.lang.startsWith('id'));
  if (startsWith) return startsWith;

  const localName = voices.find(
    (v) => v.name?.toLowerCase().includes('indonesian')
  );
  if (localName) return localName;

  return null;
}

export async function speak(text: string, rate: number = 0.85): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      resolve();
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';
    utterance.rate = rate;
    utterance.pitch = 1.1;
    utterance.volume = 1;

    if (!voicesLoaded) {
      loadVoices().then(() => {
        const voice = findIndonesianVoice();
        if (voice) utterance.voice = voice;
        utterance.onend = () => resolve();
        utterance.onerror = () => resolve();
        window.speechSynthesis.speak(utterance);
      });
    } else {
      const voice = findIndonesianVoice();
      if (voice) utterance.voice = voice;
      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();
      window.speechSynthesis.speak(utterance);
    }
  });
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

loadVoices();
