/**
 * Type-safe asset registry and catalog types for soramitsu brand, banking cards, and sounds.
 * Conforms to resources/catalog.json metadata standard.
 */

export type FontFamily = 'Sora' | 'Nunito Sans' | 'Inter';

export interface FontAssetInfo {
  filename: string;
  family: FontFamily;
  weight: '300' | '400' | '600' | '700' | '800';
  format: 'otf' | 'ttf';
  publicPath: string;
}

export type BankingAssetKey =
  | 'banknote-watermark'
  | 'card-dragon'
  | 'card-liberty'
  | 'currency-usd'
  | 'currency-usd-symbol'
  | 'currency-khr'
  | 'currency-khr-symbol'
  | 'currency-khr-flower';

export type CoachName =
  | 'Anna'
  | 'Ben'
  | 'Canty'
  | 'Danny'
  | 'Dante'
  | 'David'
  | 'Hikaru'
  | 'Judit'
  | 'Levy'
  | 'Mae'
  | 'Magnus'
  | 'Nadia'
  | 'Tania'
  | 'Vishy';

export type SoundCategory = 'coins' | 'ui' | 'game' | 'progression';

export type CoinSoundName =
  | 'bonus-coin' | 'bonus-coin-flip' | 'coin-hit-1' | 'coin-hit-2' | 'coin-hit-3' | 'daily-bonus-123' | 'points-halo' | 'points-hit-1' | 'points-hit-2' | 'points-hit-3' | 'progression-bonus-points' | 'progression-bonus-points-content-swap' | 'puzzle-path-daily-bonus-123' | 'reward-points-coin';

export type UiSoundName =
  | 'affirm' | 'affirm-avatar' | 'affirm-lock' | 'click' | 'comment' | 'decline' | 'error-onboard' | 'fail-blip-hi' | 'game_actions_click' | 'hop-land' | 'intercom_failed' | 'intercom_operator' | 'intercom_received' | 'intercom_sent' | 'notification' | 'notifications_notify' | 'notify' | 'pop-bell-notifications' | 'pop-land-standard' | 'post' | 'react' | 'react-hover' | 'screen-drop' | 'takeaway-navigate';

export type GameSoundName =
  | 'arena-end' | 'arena-start' | 'arena_arena-end' | 'arena_arena-start' | 'brilliant' | 'capture' | 'castle' | 'correct' | 'countdown-1' | 'countdown-blip' | 'countdown-go' | 'crm_capture' | 'crm_capture_1' | 'daily-puzzle-heartbeat' | 'delight_brilliant' | 'drawoffer' | 'event-end' | 'event-start' | 'event-warning' | 'event-warning-60s' | 'event_event-end' | 'event_event-start' | 'game-draw' | 'game-end' | 'game-lose' | 'game-start' | 'game-win' | 'game_actions_capture' | 'game_actions_castle' | 'game_actions_drawoffer' | 'game_actions_illegal' | 'game_actions_move-check' | 'game_actions_move-opponent' | 'game_actions_move-self' | 'game_actions_premove' | 'game_actions_promote' | 'game_draw' | 'game_end' | 'game_events_game-draw' | 'game_events_game-end' | 'game_events_game-lose' | 'game_events_game-start' | 'game_events_game-win' | 'game_lose' | 'game_win' | 'go' | 'heartbeat-synthetic' | 'illegal' | 'incorrect' | 'move-check' | 'move-opponent' | 'move-self' | 'move_check' | 'move_opponent' | 'premove' | 'promote' | 'puzzle-correct' | 'puzzle-incorrect' | 'puzzle-path-correct' | 'puzzles_puzzle_path_puzzle-path-correct' | 'raw_castle' | 'raw_promote' | 'result' | 'tenseconds' | 'timer_and_countdown_tenseconds';

export type ProgressionSoundName =
  | 'bot-glow-flair' | 'initial-pawn' | 'l1-champion' | 'l1-legend' | 'l1-stone' | 'l2-silver' | 'last-square-tier-hop' | 'lesson-fail' | 'lesson-pass' | 'lessons_lesson-fail' | 'lessons_lesson-pass' | 'level-up-award' | 'onboarding_signup_signup_screen_signup-pawn-animation' | 'pawn-teleport-depart' | 'prestige-pawn-to-podium' | 'prestige-screen-drop-alt' | 'prestige-up-award-mobile' | 'prog-bar-glow' | 'progression-milestone-reached' | 'progression-reward-appears' | 'puzzle-path-disappear' | 'puzzle-path-easter-egg-cannon' | 'puzzle-path-easter-egg-door' | 'puzzle-path-easter-egg-fanfare' | 'puzzle-path-easter-egg-frog' | 'puzzle-path-easter-egg-goat' | 'puzzle-path-easter-egg-gong' | 'puzzle-path-easter-egg-gramophone' | 'puzzle-path-easter-egg-piano' | 'puzzle-path-easter-egg-shimmer' | 'puzzle-path-easter-egg-stones' | 'puzzle-path-jump-land' | 'puzzle-path-jump-with-glasses' | 'puzzle-path-level-up' | 'puzzle-path-level-up-new' | 'puzzle-path-podium' | 'puzzle-path-prestige-new' | 'puzzle-path-reappear' | 'puzzle-path-screen-drop' | 'puzzle-path-scroll' | 'puzzle-path-tier-up' | 'puzzle-path-tier-up-new' | 'puzzles_puzzle_path_puzzle-path-level-up' | 'puzzles_puzzle_path_puzzle-path-tier-up' | 'r1-bronze' | 'r1-wood' | 'r2-crystal' | 'r2-elite' | 'r2-stone' | 'r2-wood' | 'reappear-mobile' | 'results_and_feedback_training-result-bad' | 'results_and_feedback_training-result-good' | 'results_and_feedback_training-result-ok' | 'signup-pawn-animation' | 'skill-highlight' | 'skill-mastery' | 'skill-progress' | 'skill-unlocked' | 'streak-flame-milestone' | 'streak-flame-normal' | 'tier-up-award' | 'training-result-bad' | 'training-result-good' | 'training-result-ok';

export type SoundEffectName =
  | CoinSoundName
  | UiSoundName
  | GameSoundName
  | ProgressionSoundName;

export interface SoundAssetInfo {
  id: SoundEffectName;
  category: SoundCategory;
  filename: string;
  format: 'mp3';
  publicPath: string;
}

export interface PlaySoundOptions {
  volume?: number;
  loop?: boolean;
  onEnded?: () => void;
}
