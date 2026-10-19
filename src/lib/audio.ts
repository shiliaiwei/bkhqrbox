import { playSound } from './assets';

/**
 * Synthesizes harmonious dual-tone chime on payment confirmation
 */
export function playSuccessChime(): void {
  try {
    if (typeof window === 'undefined') return;
    const AudioContextClass =
      window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'triangle';

    const now = ctx.currentTime;
    osc1.frequency.setValueAtTime(659.25, now); // E5
    osc1.frequency.setValueAtTime(830.61, now + 0.12); // G#5
    osc1.frequency.setValueAtTime(987.77, now + 0.24); // B5
    osc2.frequency.setValueAtTime(1318.51, now + 0.24); // E6

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 1.25);
    osc2.stop(now + 1.25);
  } catch (err) {
    console.warn('Audio chime playback unsupported in this environment:', err);
  }
}

/**
 * Plays physical coin drop sound on reward or balance update
 */
export async function playCoinRewardSound(volume = 0.85): Promise<void> {
  await playSound('coin-hit-1', { volume });
}

/**
 * Plays payment confirmation sound combining oscillator chime and coin effect
 */
export async function playPaymentConfirmationSound(): Promise<void> {
  playSuccessChime();
  setTimeout(() => {
    playSound('bonus-coin', { volume: 0.75 }).catch(() => {});
  }, 180);
}

/**
 * Plays tactile click sound on button press
 */
export async function playTactileClickSound(): Promise<void> {
  await playSound('click', { volume: 0.45 });
}

export { playSound } from './assets';
