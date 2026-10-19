import {
  BankingAssetKey,
  CoachName,
  SoundEffectName,
  PlaySoundOptions,
} from '@/types/assets';

/**
 * Banking card and currency graphic asset URLs.
 */
export const BANKING_ASSETS: Record<BankingAssetKey, string> = {
  'banknote-watermark': '/backgrounds/cardbanknote.svg',
  'card-dragon': '/backgrounds/card-dragon.svg',
  'card-liberty': '/backgrounds/card-liberty.svg',
  'currency-usd': '/images/banking/currency-usd.webp',
  'currency-usd-symbol': '/images/banking/currency-usd-symbol.webp',
  'currency-khr': '/images/banking/currency-khr.webp',
  'currency-khr-symbol': '/images/banking/currency-khr-symbol.webp',
  'currency-khr-flower': '/images/banking/currency-khr-flower.png',
};

/**
 * Coach avatars and icons.
 */
export const COACH_ASSETS: Record<CoachName, { avatar: string; icon: string }> = {
  Anna: { avatar: '/images/coaches/coach_avatar_Anna.png', icon: '/images/coaches/coach_icon_Anna.png' },
  Ben: { avatar: '/images/coaches/coach_avatar_Ben.png', icon: '/images/coaches/coach_icon_Ben.png' },
  Canty: { avatar: '/images/coaches/coach_avatar_Canty.png', icon: '/images/coaches/coach_icon_Canty.png' },
  Danny: { avatar: '/images/coaches/coach_avatar_Danny.png', icon: '/images/coaches/coach_icon_Danny.png' },
  Dante: { avatar: '/images/coaches/coach_avatar_Dante.png', icon: '/images/coaches/coach_icon_Dante.png' },
  David: { avatar: '/images/coaches/coach_avatar_David.png', icon: '/images/coaches/coach_icon_David.png' },
  Hikaru: { avatar: '/images/coaches/coach_avatar_Hikaru.png', icon: '/images/coaches/coach_icon_Hikaru.png' },
  Judit: { avatar: '/images/coaches/coach_avatar_Judit.png', icon: '/images/coaches/coach_icon_Judit.png' },
  Levy: { avatar: '/images/coaches/coach_avatar_Levy.png', icon: '/images/coaches/coach_icon_Levy.png' },
  Mae: { avatar: '/images/coaches/coach_avatar_Mae.png', icon: '/images/coaches/coach_icon_Mae.png' },
  Magnus: { avatar: '/images/coaches/coach_avatar_Magnus.png', icon: '/images/coaches/coach_icon_Magnus.png' },
  Nadia: { avatar: '/images/coaches/coach_avatar_Nadia.png', icon: '/images/coaches/coach_icon_Nadia.png' },
  Tania: { avatar: '/images/coaches/coach_avatar_Tania.png', icon: '/images/coaches/coach_icon_Tania.png' },
  Vishy: { avatar: '/images/coaches/coach_avatar_Vishy.png', icon: '/images/coaches/coach_icon_Vishy.png' },
};

/**
 * Sound effect public URL registry.
 */
export const SOUND_ASSETS: Record<SoundEffectName, string> = {
  "bonus-coin-flip": "/sounds/coins/bonus-coin-flip.mp3",
  "bonus-coin": "/sounds/coins/bonus-coin.mp3",
  "coin-hit-1": "/sounds/coins/coin-hit-1.mp3",
  "coin-hit-2": "/sounds/coins/coin-hit-2.mp3",
  "coin-hit-3": "/sounds/coins/coin-hit-3.mp3",
  "daily-bonus-123": "/sounds/coins/daily-bonus-123.mp3",
  "points-halo": "/sounds/coins/points-halo.mp3",
  "points-hit-1": "/sounds/coins/points-hit-1.mp3",
  "points-hit-2": "/sounds/coins/points-hit-2.mp3",
  "points-hit-3": "/sounds/coins/points-hit-3.mp3",
  "progression-bonus-points-content-swap": "/sounds/coins/progression-bonus-points-content-swap.mp3",
  "progression-bonus-points": "/sounds/coins/progression-bonus-points.mp3",
  "puzzle-path-daily-bonus-123": "/sounds/coins/puzzle-path-daily-bonus-123.mp3",
  "reward-points-coin": "/sounds/coins/reward-points-coin.mp3",
  "affirm-avatar": "/sounds/ui/affirm-avatar.mp3",
  "affirm-lock": "/sounds/ui/affirm-lock.mp3",
  "affirm": "/sounds/ui/affirm.mp3",
  "click": "/sounds/ui/click.mp3",
  "comment": "/sounds/ui/comment.mp3",
  "decline": "/sounds/ui/decline.mp3",
  "error-onboard": "/sounds/ui/error-onboard.mp3",
  "fail-blip-hi": "/sounds/ui/fail-blip-hi.mp3",
  "game_actions_click": "/sounds/ui/game_actions_click.mp3",
  "hop-land": "/sounds/ui/hop-land.mp3",
  "intercom_failed": "/sounds/ui/intercom_failed.mp3",
  "intercom_operator": "/sounds/ui/intercom_operator.mp3",
  "intercom_received": "/sounds/ui/intercom_received.mp3",
  "intercom_sent": "/sounds/ui/intercom_sent.mp3",
  "notification": "/sounds/ui/notification.mp3",
  "notifications_notify": "/sounds/ui/notifications_notify.mp3",
  "notify": "/sounds/ui/notify.mp3",
  "pop-bell-notifications": "/sounds/ui/pop-bell-notifications.mp3",
  "pop-land-standard": "/sounds/ui/pop-land-standard.mp3",
  "post": "/sounds/ui/post.mp3",
  "react-hover": "/sounds/ui/react-hover.mp3",
  "react": "/sounds/ui/react.mp3",
  "screen-drop": "/sounds/ui/screen-drop.mp3",
  "takeaway-navigate": "/sounds/ui/takeaway-navigate.mp3",
  "arena-end": "/sounds/game/arena-end.mp3",
  "arena-start": "/sounds/game/arena-start.mp3",
  "arena_arena-end": "/sounds/game/arena_arena-end.mp3",
  "arena_arena-start": "/sounds/game/arena_arena-start.mp3",
  "brilliant": "/sounds/game/brilliant.mp3",
  "capture": "/sounds/game/capture.mp3",
  "castle": "/sounds/game/castle.mp3",
  "correct": "/sounds/game/correct.mp3",
  "countdown-1": "/sounds/game/countdown-1.mp3",
  "countdown-blip": "/sounds/game/countdown-blip.mp3",
  "countdown-go": "/sounds/game/countdown-go.mp3",
  "crm_capture": "/sounds/game/crm_capture.mp3",
  "crm_capture_1": "/sounds/game/crm_capture_1.mp3",
  "daily-puzzle-heartbeat": "/sounds/game/daily-puzzle-heartbeat.mp3",
  "delight_brilliant": "/sounds/game/delight_brilliant.mp3",
  "drawoffer": "/sounds/game/drawoffer.mp3",
  "event-end": "/sounds/game/event-end.mp3",
  "event-start": "/sounds/game/event-start.mp3",
  "event-warning-60s": "/sounds/game/event-warning-60s.mp3",
  "event-warning": "/sounds/game/event-warning.mp3",
  "event_event-end": "/sounds/game/event_event-end.mp3",
  "event_event-start": "/sounds/game/event_event-start.mp3",
  "game-draw": "/sounds/game/game-draw.mp3",
  "game-end": "/sounds/game/game-end.mp3",
  "game-lose": "/sounds/game/game-lose.mp3",
  "game-start": "/sounds/game/game-start.mp3",
  "game-win": "/sounds/game/game-win.mp3",
  "game_actions_capture": "/sounds/game/game_actions_capture.mp3",
  "game_actions_castle": "/sounds/game/game_actions_castle.mp3",
  "game_actions_drawoffer": "/sounds/game/game_actions_drawoffer.mp3",
  "game_actions_illegal": "/sounds/game/game_actions_illegal.mp3",
  "game_actions_move-check": "/sounds/game/game_actions_move-check.mp3",
  "game_actions_move-opponent": "/sounds/game/game_actions_move-opponent.mp3",
  "game_actions_move-self": "/sounds/game/game_actions_move-self.mp3",
  "game_actions_premove": "/sounds/game/game_actions_premove.mp3",
  "game_actions_promote": "/sounds/game/game_actions_promote.mp3",
  "game_draw": "/sounds/game/game_draw.mp3",
  "game_end": "/sounds/game/game_end.mp3",
  "game_events_game-draw": "/sounds/game/game_events_game-draw.mp3",
  "game_events_game-end": "/sounds/game/game_events_game-end.mp3",
  "game_events_game-lose": "/sounds/game/game_events_game-lose.mp3",
  "game_events_game-start": "/sounds/game/game_events_game-start.mp3",
  "game_events_game-win": "/sounds/game/game_events_game-win.mp3",
  "game_lose": "/sounds/game/game_lose.mp3",
  "game_win": "/sounds/game/game_win.mp3",
  "go": "/sounds/game/go.mp3",
  "heartbeat-synthetic": "/sounds/game/heartbeat-synthetic.mp3",
  "illegal": "/sounds/game/illegal.mp3",
  "incorrect": "/sounds/game/incorrect.mp3",
  "move-check": "/sounds/game/move-check.mp3",
  "move-opponent": "/sounds/game/move-opponent.mp3",
  "move-self": "/sounds/game/move-self.mp3",
  "move_check": "/sounds/game/move_check.mp3",
  "move_opponent": "/sounds/game/move_opponent.mp3",
  "premove": "/sounds/game/premove.mp3",
  "promote": "/sounds/game/promote.mp3",
  "puzzle-correct": "/sounds/game/puzzle-correct.mp3",
  "puzzle-incorrect": "/sounds/game/puzzle-incorrect.mp3",
  "puzzle-path-correct": "/sounds/game/puzzle-path-correct.mp3",
  "puzzles_puzzle_path_puzzle-path-correct": "/sounds/game/puzzles_puzzle_path_puzzle-path-correct.mp3",
  "raw_castle": "/sounds/game/raw_castle.mp3",
  "raw_promote": "/sounds/game/raw_promote.mp3",
  "result": "/sounds/game/result.mp3",
  "tenseconds": "/sounds/game/tenseconds.mp3",
  "timer_and_countdown_tenseconds": "/sounds/game/timer_and_countdown_tenseconds.mp3",
  "bot-glow-flair": "/sounds/progression/bot-glow-flair.mp3",
  "initial-pawn": "/sounds/progression/initial-pawn.mp3",
  "l1-champion": "/sounds/progression/l1-champion.mp3",
  "l1-legend": "/sounds/progression/l1-legend.mp3",
  "l1-stone": "/sounds/progression/l1-stone.mp3",
  "l2-silver": "/sounds/progression/l2-silver.mp3",
  "last-square-tier-hop": "/sounds/progression/last-square-tier-hop.mp3",
  "lesson-fail": "/sounds/progression/lesson-fail.mp3",
  "lesson-pass": "/sounds/progression/lesson-pass.mp3",
  "lessons_lesson-fail": "/sounds/progression/lessons_lesson-fail.mp3",
  "lessons_lesson-pass": "/sounds/progression/lessons_lesson-pass.mp3",
  "level-up-award": "/sounds/progression/level-up-award.mp3",
  "onboarding_signup_signup_screen_signup-pawn-animation": "/sounds/progression/onboarding_signup_signup_screen_signup-pawn-animation.mp3",
  "pawn-teleport-depart": "/sounds/progression/pawn-teleport-depart.mp3",
  "prestige-pawn-to-podium": "/sounds/progression/prestige-pawn-to-podium.mp3",
  "prestige-screen-drop-alt": "/sounds/progression/prestige-screen-drop-alt.mp3",
  "prestige-up-award-mobile": "/sounds/progression/prestige-up-award-mobile.mp3",
  "prog-bar-glow": "/sounds/progression/prog-bar-glow.mp3",
  "progression-milestone-reached": "/sounds/progression/progression-milestone-reached.mp3",
  "progression-reward-appears": "/sounds/progression/progression-reward-appears.mp3",
  "puzzle-path-disappear": "/sounds/progression/puzzle-path-disappear.mp3",
  "puzzle-path-easter-egg-cannon": "/sounds/progression/puzzle-path-easter-egg-cannon.mp3",
  "puzzle-path-easter-egg-door": "/sounds/progression/puzzle-path-easter-egg-door.mp3",
  "puzzle-path-easter-egg-fanfare": "/sounds/progression/puzzle-path-easter-egg-fanfare.mp3",
  "puzzle-path-easter-egg-frog": "/sounds/progression/puzzle-path-easter-egg-frog.mp3",
  "puzzle-path-easter-egg-goat": "/sounds/progression/puzzle-path-easter-egg-goat.mp3",
  "puzzle-path-easter-egg-gong": "/sounds/progression/puzzle-path-easter-egg-gong.mp3",
  "puzzle-path-easter-egg-gramophone": "/sounds/progression/puzzle-path-easter-egg-gramophone.mp3",
  "puzzle-path-easter-egg-piano": "/sounds/progression/puzzle-path-easter-egg-piano.mp3",
  "puzzle-path-easter-egg-shimmer": "/sounds/progression/puzzle-path-easter-egg-shimmer.mp3",
  "puzzle-path-easter-egg-stones": "/sounds/progression/puzzle-path-easter-egg-stones.mp3",
  "puzzle-path-jump-land": "/sounds/progression/puzzle-path-jump-land.mp3",
  "puzzle-path-jump-with-glasses": "/sounds/progression/puzzle-path-jump-with-glasses.mp3",
  "puzzle-path-level-up-new": "/sounds/progression/puzzle-path-level-up-new.mp3",
  "puzzle-path-level-up": "/sounds/progression/puzzle-path-level-up.mp3",
  "puzzle-path-podium": "/sounds/progression/puzzle-path-podium.mp3",
  "puzzle-path-prestige-new": "/sounds/progression/puzzle-path-prestige-new.mp3",
  "puzzle-path-reappear": "/sounds/progression/puzzle-path-reappear.mp3",
  "puzzle-path-screen-drop": "/sounds/progression/puzzle-path-screen-drop.mp3",
  "puzzle-path-scroll": "/sounds/progression/puzzle-path-scroll.mp3",
  "puzzle-path-tier-up-new": "/sounds/progression/puzzle-path-tier-up-new.mp3",
  "puzzle-path-tier-up": "/sounds/progression/puzzle-path-tier-up.mp3",
  "puzzles_puzzle_path_puzzle-path-level-up": "/sounds/progression/puzzles_puzzle_path_puzzle-path-level-up.mp3",
  "puzzles_puzzle_path_puzzle-path-tier-up": "/sounds/progression/puzzles_puzzle_path_puzzle-path-tier-up.mp3",
  "r1-bronze": "/sounds/progression/r1-bronze.mp3",
  "r1-wood": "/sounds/progression/r1-wood.mp3",
  "r2-crystal": "/sounds/progression/r2-crystal.mp3",
  "r2-elite": "/sounds/progression/r2-elite.mp3",
  "r2-stone": "/sounds/progression/r2-stone.mp3",
  "r2-wood": "/sounds/progression/r2-wood.mp3",
  "reappear-mobile": "/sounds/progression/reappear-mobile.mp3",
  "results_and_feedback_training-result-bad": "/sounds/progression/results_and_feedback_training-result-bad.mp3",
  "results_and_feedback_training-result-good": "/sounds/progression/results_and_feedback_training-result-good.mp3",
  "results_and_feedback_training-result-ok": "/sounds/progression/results_and_feedback_training-result-ok.mp3",
  "signup-pawn-animation": "/sounds/progression/signup-pawn-animation.mp3",
  "skill-highlight": "/sounds/progression/skill-highlight.mp3",
  "skill-mastery": "/sounds/progression/skill-mastery.mp3",
  "skill-progress": "/sounds/progression/skill-progress.mp3",
  "skill-unlocked": "/sounds/progression/skill-unlocked.mp3",
  "streak-flame-milestone": "/sounds/progression/streak-flame-milestone.mp3",
  "streak-flame-normal": "/sounds/progression/streak-flame-normal.mp3",
  "tier-up-award": "/sounds/progression/tier-up-award.mp3",
  "training-result-bad": "/sounds/progression/training-result-bad.mp3",
  "training-result-good": "/sounds/progression/training-result-good.mp3",
  "training-result-ok": "/sounds/progression/training-result-ok.mp3"
};

/**
 * Resolves banking asset public URL.
 */
export function getBankingAssetUrl(key: BankingAssetKey): string {
  return BANKING_ASSETS[key];
}

/**
 * Resolves coach avatar public URL.
 */
export function getCoachAvatarUrl(name: CoachName): string {
  return COACH_ASSETS[name]?.avatar ?? '';
}

/**
 * Resolves coach icon public URL.
 */
export function getCoachIconUrl(name: CoachName): string {
  return COACH_ASSETS[name]?.icon ?? '';
}

/**
 * Resolves sound effect URL.
 */
export function getSoundUrl(name: SoundEffectName): string {
  return SOUND_ASSETS[name] ?? '';
}

const audioCache = new Map<string, HTMLAudioElement>();

/**
 * Preload sound effects for instant latency-free playback.
 */
export function preloadSounds(names: SoundEffectName[]): void {
  if (typeof window === 'undefined') return;
  for (const name of names) {
    const url = getSoundUrl(name);
    if (url && !audioCache.has(url)) {
      const audio = new Audio(url);
      audio.preload = 'auto';
      audioCache.set(url, audio);
    }
  }
}

/**
 * Plays a sound effect with optional volume and loop controls.
 */
export async function playSound(
  name: SoundEffectName,
  options: PlaySoundOptions = {}
): Promise<HTMLAudioElement | null> {
  if (typeof window === 'undefined') return null;

  const url = getSoundUrl(name);
  if (!url) {
    console.warn(`[assets] Sound not found: ${name}`);
    return null;
  }

  try {
    const { volume = 0.8, loop = false, onEnded } = options;
    const audio = new Audio(url);
    audio.volume = Math.max(0, Math.min(1, volume));
    audio.loop = loop;

    if (onEnded) {
      audio.addEventListener('ended', onEnded, { once: true });
    }

    await audio.play();
    return audio;
  } catch (err) {
    console.warn(`[assets] Audio playback blocked or failed for ${name}:`, err);
    return null;
  }
}

/**
 * Stops an active sound effect.
 */
export function stopSound(audio: HTMLAudioElement | null): void {
  if (!audio) return;
  try {
    audio.pause();
    audio.currentTime = 0;
  } catch (err) {
    console.warn('[assets] Error stopping audio:', err);
  }
}
