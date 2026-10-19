# Asset Library & Media Catalog (`docs/assets-catalog.md`)

This document provides technical reference and integration guidance for the unified media asset catalog maintained under `resources/` and mirrored in `public/`.

---

## 1. Directory Layout

The assets are structured into standard repository modules:

```
resources/
├── fonts/                      # Inter, Nunito Sans, and Sora typography families
├── banking-cards/              # Responsive vector backgrounds (banknote, dragon, liberty) & badges
├── coaches/                    # 28 Coach avatars & icons (14 personalities)
├── avatars/                    # 154 Player and personality avatars
├── sounds/
│   ├── coins/                  # 14 Coin drops, points, bonus SFX
│   ├── ui/                     # 24 UI clicks, notifications, intercom, feedback SFX
│   ├── game/                   # 65 Moves, captures, checks, clocks, match state SFX
│   └── progression/            # 65 Levels, milestones, skill unlocks, puzzle SFX
├── catalog.json                # Structured metadata catalog (376 assets)
└── README.md                   # Brand resources documentation
```

All assets are mirrored in `public/` for Next.js static asset delivery:
* `/fonts/`
* `/backgrounds/` (`cardbanknote.svg`, `card-dragon.svg`, `card-liberty.svg`)
* `/images/banking/`, `/images/coaches/`, `/images/avatars/`
* `/sounds/coins/`, `/sounds/ui/`, `/sounds/game/`, `/sounds/progression/`

---

## 2. TypeScript Types (`src/types/assets.ts`)

```typescript
import {
  BankingAssetKey,
  CoachName,
  SoundEffectName,
  CoinSoundName,
  UiSoundName,
  GameSoundName,
  ProgressionSoundName,
} from '@/types/assets';
```

### 2.1 Banking Asset Keys

* `banknote-watermark`: Responsive Banknote Guilloche Security Watermark SVG (`/backgrounds/cardbanknote.svg`)
* `card-dragon`: Responsive Dragon Vector Watermark Background SVG (`/backgrounds/card-dragon.svg`)
* `card-liberty`: Responsive Liberty Star Crest Watermark Background SVG (`/backgrounds/card-liberty.svg`)
* `currency-usd`: USD Currency Badge (`/images/banking/currency-usd.webp`)
* `currency-usd-symbol`: USD Symbol Glyph (`/images/banking/currency-usd-symbol.webp`)
* `currency-khr`: KHR Currency Badge (`/images/banking/currency-khr.webp`)
* `currency-khr-symbol`: KHR Symbol Glyph (`/images/banking/currency-khr-symbol.webp`)
* `currency-khr-flower`: PKA KHR Flower Emblem (`/images/banking/currency-khr-flower.png`)

### 2.2 Coach Personas

14 supported coaches:
`Anna`, `Ben`, `Canty`, `Danny`, `Dante`, `David`, `Hikaru`, `Judit`, `Levy`, `Mae`, `Magnus`, `Nadia`, `Tania`, `Vishy`.

### 2.3 Sound Categories

* `coins`: Physical coin hits, rewards, daily bonuses, points counters.
* `ui`: Tactile clicks, notifications, intercom events, modal animations, state toggles.
* `game`: Move pieces, captures, check alerts, time countdowns, victory and defeat fanfares.
* `progression`: Level promotions, tier awards, skill mastery unlocked, puzzle completion.

---

## 3. Runtime API (`src/lib/assets.ts` & `src/lib/audio.ts`)

### 3.1 Resolving Asset URLs

```typescript
import {
  getBankingAssetUrl,
  getCoachAvatarUrl,
  getCoachIconUrl,
  getSoundUrl,
} from '@/lib/assets';

// Returns '/images/banking/account-usd.png'
const cardUrl = getBankingAssetUrl('account-usd');

// Returns '/images/coaches/coach_avatar_Hikaru.png'
const avatarUrl = getCoachAvatarUrl('Hikaru');

// Returns '/sounds/coins/coin-hit-1.mp3'
const soundUrl = getSoundUrl('coin-hit-1');
```

### 3.2 Sound Playback Engine

```typescript
import { playSound, preloadSounds } from '@/lib/assets';
import {
  playCoinRewardSound,
  playPaymentConfirmationSound,
  playTactileClickSound,
} from '@/lib/audio';

// Preload critical interaction sounds on mount
preloadSounds(['click', 'coin-hit-1', 'bonus-coin', 'notification']);

// Trigger playback with custom volume
await playSound('coin-hit-1', { volume: 0.75 });

// Standard payment confirmation combining synthesized harmonic chime and coin drop
await playPaymentConfirmationSound();
```

---

## 4. Typography Integration

Font files located in `public/fonts/`:
* **Inter**: `inter.ttf`
* **Nunito Sans**: `nunito_sans_regular.ttf`, `nunito_sans_bold.ttf`
* **Sora**: `sora_light.otf`, `sora_regular.otf`, `sora_semi_bold.otf`, `sora_bold.otf`, `sora_extra_bold.otf`
