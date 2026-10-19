---
name: skeuomorphic-purple-leather-wallet-design
description: Authoritative primary design standard and component architecture for 3D Skeuomorphic Purple Textured Leather Pocket & Stitched Card UI across Web, React, Next.js, and Telegram Mini Apps. Enforces realistic leather pebble textures, perimeter and curved-lip simulated thread stitching, stacked satin gradient cards with authentic Wei Coin typographic logos, frosted glassmorphism action buttons, tactile 3D bevels, ambient occlusion depth, official Keyline Icons, and the official LinkedIn-style corporate brand logo design standard.
---

# 3D SKEUOMORPHIC PURPLE TEXTURED LEATHER WALLET & STITCHED CARD DESIGN SYSTEM

This specification is the authoritative, permanent design system standard. All cards, wallet elements, action buttons, icons, and official brand logo implementations MUST strictly implement this standard.

---

## 1. Visual Anatomy & Physical Depth Hierarchy

The wallet interface consists of a three-tier physical depth assembly:

1. Back Leather Pocket Base:
   - Outer container establishing the physical leather sleeve (rounded-[38px]).
   - Deep royal purple leather tone with inset bevels and heavy ambient occlusion shadow.
2. Inserted Credit Card (Peek):
   - Sits physically inside the sleeve slot (w-[95%] mx-auto rounded-t-[26px]).
   - Satin finish gradient with guilloche banknote security watermark and specular light sheen.
   - Houses account credentials, monospace address, and numeric balance.
3. Front Leather Flap & Scooped Lip:
   - Overlaps the inserted card (-mt-10 rounded-t-[26px] rounded-b-[32px]).
   - Scooped curved edge with simulated thread stitching (M 2 2 Q 180 8 360 2).
   - Houses 3D milled-rim tactile action coin buttons.

---

## 2. Official SHILIAIWEI Brand Logo Specification (Zero Coin Association)

This specification defines the pure corporate brand logo identity. It is completely independent of currency, tokens, coins, or game mechanics.

### A. Concept & Structural Architecture
- Structural Layout: LinkedIn-style typographic badge architecture:
  - Base Wordmark: **SHILIAI** (heavy black typography).
  - Terminal Badge: **[WEI]** (high-contrast rounded rectangle container holding the letters WEI).
- Single-Line Mandatory Alignment:
  - The badge sits immediately adjacent to `SHILIAI` on the exact same horizontal baseline.
  - Spacing between wordmark and badge is strictly 2px–3px (like LinkedIn's `in` badge). Never allow wide voids, loose gaps, or line breaks.
- Independent Brand Mark:
  - This is strictly a corporate/platform identity mark. Never confuse, blend, or replace this with coin graphics, tokens, or financial currency tags.

### B. Vector Geometry Coordinates (122x32 ViewBox)
```svg
<svg width="122" height="32" viewBox="0 0 122 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- 1. Wordmark: SHILIAI -->
  <text
    x="0"
    y="24"
    fill="currentColor"
    font-size="24"
    font-family="system-ui, -apple-system, 'SF Pro Display', Roboto, sans-serif"
    font-weight="900"
    letter-spacing="-0.03em"
    textLength="72"
    lengthAdjust="spacingAndGlyphs"
  >
    SHILIAI
  </text>

  <!-- 2. Badge Container: [WEI] -->
  <rect x="75" y="4" width="44" height="23" rx="6" fill="#0098ea" />

  <!-- 3. Badge Text: WEI -->
  <text
    x="97"
    y="21"
    text-anchor="middle"
    fill="#ffffff"
    font-size="14"
    font-family="system-ui, -apple-system, 'SF Pro Display', Roboto, sans-serif"
    font-weight="900"
    letter-spacing="-0.01em"
  >
    WEI
  </text>
</svg>
```

### C. Standard Color Schemes
1. Sky Blue Corporate Scheme (Default):
   - Text (`SHILIAI`): `#0098ea`
   - Badge Container: `#0098ea`
   - Badge Text (`WEI`): `#ffffff`
2. White Inverted Scheme (For Dark / Colored Surfaces & Card Faces):
   - Text (`SHILIAI`): `#ffffff`
   - Badge Container: `#ffffff`
   - Badge Text (`WEI`): `#0077b5`
3. Obsidian Dark Scheme:
   - Text (`SHILIAI`): `#0f172a`
   - Badge Container: `#0098ea`
   - Badge Text (`WEI`): `#ffffff`

### D. Strict Brand Logo Rules
1. Zero Additions Rule:
   - NEVER prepend or append descriptive words (e.g. `Official`, `Platform`, `App`, `Web3`, `VIP`).
   - NEVER add shields, icons, crests, or coin marks inside or beside the logo container.
2. Mutual Exclusivity Rule:
   - When the logo is rendered, NEVER display redundant plain text `SHILIAIWEI` or `WEI` alongside it in the same header or card row.
   - When the brand name is written in plain text prose, do not place the logo directly adjacent.
3. Zero Standalone `WEI`:
   - Never use the `[WEI]` badge or the word `WEI` alone as the company/brand identity. The full mark requires `SHILIAI [WEI]`.

---

## 3. Color Palette & Material Surface Tokens

### A. Purple Calfskin Leather Gradients
- Top Highlight: #6b22a8
- Body Mid-Tone: #52188f / #4c1482
- Lower Shadow: #380c63 / #340b5c
- Deep Seam Base: #260742

### B. Inserted Card Satin Gradients (by Currency Mode)
- WEI / Sky Blue: linear-gradient(135deg, #0284c7 0%, #0098ea 35%, #0369a1 70%, #0c4a6e 100%)
- USD / Emerald Green: linear-gradient(135deg, #059669 0%, #047857 35%, #065f46 70%, #064e3b 100%)
- KHR / Royal Purple: linear-gradient(135deg, #c084fc 0%, #a855f7 35%, #7e22ce 70%, #4c1d95 100%)

### C. Procedural Pebble Leather Grain Overlay
```tsx
<div
  className="absolute inset-0 rounded-[38px] opacity-15 pointer-events-none mix-blend-overlay"
  style={{
    backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4) 1px, transparent 1px), radial-gradient(circle at 0% 0%, rgba(0,0,0,0.5) 1px, transparent 1px)`,
    backgroundSize: "6px 6px, 8px 8px",
  }}
/>
```

### D. Banknote Guilloche Security Watermark
```tsx
<div
  className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-25"
  style={{
    backgroundImage: `url("/backgrounds/cardbanknote.svg")`,
    backgroundPosition: "center top",
    backgroundSize: "cover",
    filter: "contrast(1.35) brightness(1.1)",
  }}
/>
```

---

## 4. Radii, Borders, Shadows, and Stitching Metrics

| Element | Geometry / Radius | Border / Inset | Box Shadow Specification |
|---|---|---|---|
| Outer Cardholder | rounded-[38px] | inset 0 2px 4px rgba(255,255,255,0.35) | 0 24px 48px -12px rgba(45, 10, 80, 0.55), 0 12px 24px -6px rgba(30, 5, 55, 0.40), inset 0 -3px 8px rgba(0, 0, 0, 0.55) |
| Stacked Card Face | rounded-t-[26px] | inset 0 1.5px 2px rgba(255,255,255,0.65) | 0 -4px 16px rgba(0, 0, 0, 0.3), inset 0 -2px 4px rgba(0, 0, 0, 0.2) |
| Front Leather Flap | rounded-t-[26px] rounded-b-[32px] | inset 0 2px 2px rgba(255,255,255,0.4) | 0 -8px 20px -4px rgba(25, 4, 45, 0.6), inset 0 -3px 6px rgba(0, 0, 0, 0.45) |
| Rim Highlight Line | h-[1.5px] full-width | Hairline specular shine | bg-gradient-to-r from-transparent via-white/40 to-transparent |
| Coin Buttons | rounded-full (w-12 h-12) | border-2, Milled inner rim border border-white/40 | 0 10px 24px -4px rgba(0, 152, 234, 0.7), inset 0 2px 3px rgba(255,255,255,0.6), inset 0 -3px 5px rgba(0,0,0,0.5) |

### Thread Stitching Specifications
- Thread Color: Light Lavender #e9d5ff or Soft Cream #f3e8ff.
- Stroke Width: 1.2px to 1.25px.
- Dash Array: strokeDasharray="4 4".
- Line Cap: strokeLinecap="round".
- Thread Drop Shadow: filter: drop-shadow(0px 1px 1px rgba(0,0,0,0.60)).
- Perimeter Stitching SVG:
  ```tsx
  <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="9"
      y="9"
      width="calc(100% - 18px)"
      height="calc(100% - 18px)"
      rx="30"
      ry="30"
      fill="none"
      stroke="#e9d5ff"
      strokeWidth="1.25"
      strokeDasharray="4 4"
      strokeLinecap="round"
      opacity="0.5"
      style={{ filter: "drop-shadow(0px 1px 1px rgba(0,0,0,0.60))" }}
    />
  </svg>
  ```
- Curved Lip Stitching SVG:
  ```tsx
  <svg className="w-full h-3 overflow-visible" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M 2 2 Q 180 8 360 2"
      fill="none"
      stroke="#e9d5ff"
      strokeWidth="1.2"
      strokeDasharray="4 4"
      strokeLinecap="round"
      opacity="0.5"
      style={{ filter: "drop-shadow(0px 1px 1px rgba(0,0,0,0.6))" }}
    />
  </svg>
  ```

---

## 5. Typography & On-Card Layout Standard

- Top Row:
  - Left: Telegram @username in bold text-base sm:text-lg text-white paired with TelegramVerifiedBadge.
  - Right: ShiliaiweiBrand wordmark unit (colorScheme="white", height={16}).
- Middle Row:
  - Monospace address: text-[11px] font-mono text-white/60 tracking-wider.
- Bottom Row:
  - Currency trigger on left: Prominent pill badge (WEI) or large symbol ($, ៛) in text-3xl sm:text-4xl font-black text-white.
  - Balance digits on right: Large high-contrast numerals text-2xl sm:text-3xl font-black font-sans text-right.

---

## 6. Official Keyline Icon Standard

- Single Authorized Source: https://keylineicons.com/icons (@keyline-icons/react/two-tone).
- Export Gateway: Import exclusively from src/components/icons/KeylineIcons.tsx.
- Geometry Specifications:
  - Canvas: 24x24 px viewBox (viewBox="0 0 24 24").
  - Primary Stroke: strokeWidth="1.5" or "2.0", strokeLinecap="round", strokeLinejoin="round", fill="none".
  - Two-Tone Fill Tint: fill="currentColor" fillOpacity="0.35" stroke="none".
- Prohibited Libraries:
  - Strictly prohibited: lucide-react, @heroicons/react, react-icons, @tabler/icons, fontawesome.

---

## 7. Complete Implementation Blueprint

```tsx
import React from "react";
import { TelegramVerifiedBadge } from "@/components/common/TelegramVerifiedBadge";
import { ShiliaiweiBrand } from "@/components/brand/ShiliaiweiBrand";
import { ScanLine, ArrowUpRight } from "@/components/icons/KeylineIcons";

export const SkeuomorphicLeatherWalletCard: React.FC<{
  username: string;
  maskedAddress: string;
  balance: string;
  currency: "WEI" | "USD" | "KHR";
  onAction: (action: "scan" | "receive" | "withdraw") => void;
  onToggleCurrency: () => void;
}> = ({ username, maskedAddress, balance, currency, onAction, onToggleCurrency }) => {
  return (
    <div
      className="relative w-full max-w-md mx-auto rounded-[38px] p-2 sm:p-2.5 overflow-hidden select-none bg-gradient-to-b from-[#6b22a8] via-[#52188f] to-[#380c63]"
      style={{
        boxShadow:
          "0 24px 48px -12px rgba(45, 10, 80, 0.55), 0 12px 24px -6px rgba(30, 5, 55, 0.40), inset 0 2px 4px rgba(255, 255, 255, 0.35), inset 0 -3px 8px rgba(0, 0, 0, 0.55)",
      }}
    >
      {/* Pebble Leather Grain Texture */}
      <div
        className="absolute inset-0 rounded-[38px] opacity-15 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4) 1px, transparent 1px), radial-gradient(circle at 0% 0%, rgba(0,0,0,0.5) 1px, transparent 1px)`,
          backgroundSize: "6px 6px, 8px 8px",
        }}
      />

      {/* Perimeter Thread Stitching */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" xmlns="http://www.w3.org/2000/svg">
        <rect
          x="9"
          y="9"
          width="calc(100% - 18px)"
          height="calc(100% - 18px)"
          rx="30"
          ry="30"
          fill="none"
          stroke="#e9d5ff"
          strokeWidth="1.25"
          strokeDasharray="4 4"
          strokeLinecap="round"
          opacity="0.5"
          style={{ filter: "drop-shadow(0px 1px 1px rgba(0,0,0,0.60))" }}
        />
      </svg>

      {/* 1. Inserted Physical Card */}
      <div
        className="relative w-[95%] mx-auto rounded-t-[26px] overflow-hidden px-5 pt-4 pb-14 text-white"
        style={{
          background:
            currency === "WEI"
              ? "linear-gradient(135deg, #0284c7 0%, #0098ea 35%, #0369a1 70%, #0c4a6e 100%)"
              : currency === "USD"
              ? "linear-gradient(135deg, #059669 0%, #047857 35%, #065f46 70%, #064e3b 100%)"
              : "linear-gradient(135deg, #c084fc 0%, #a855f7 35%, #7e22ce 70%, #4c1d95 100%)",
          boxShadow:
            "0 -4px 16px rgba(0, 0, 0, 0.3), inset 0 1.5px 2px rgba(255, 255, 255, 0.65), inset 0 -2px 4px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div className="relative z-10 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-base sm:text-lg font-bold truncate">{username}</span>
              <TelegramVerifiedBadge size={16} />
            </div>
            <ShiliaiweiBrand colorScheme="white" height={16} />
          </div>

          <div className="text-[11px] font-mono text-white/60 tracking-wider">
            {maskedAddress}
          </div>

          <div className="flex items-baseline justify-between mt-2.5">
            <button type="button" onClick={onToggleCurrency} className="cursor-pointer active:scale-95 transition-transform">
              {currency === "WEI" ? (
                <span className="px-2 py-0.5 rounded-md bg-white text-[#0098ea] font-black text-sm">WEI</span>
              ) : (
                <span className="text-3xl sm:text-4xl font-black">{currency === "USD" ? "$" : "៛"}</span>
              )}
            </button>
            <span className="text-2xl sm:text-3xl font-black font-sans text-right">{balance}</span>
          </div>
        </div>
      </div>

      {/* 2. Front Leather Pocket Flap */}
      <div
        className="relative -mt-10 rounded-b-[32px] rounded-t-[26px] p-5 sm:p-6 overflow-hidden bg-gradient-to-b from-[#5c1c99] via-[#4c1482] to-[#340b5c]"
        style={{
          boxShadow:
            "0 -8px 20px -4px rgba(25, 4, 45, 0.6), inset 0 2px 2px rgba(255, 255, 255, 0.4), inset 0 -3px 6px rgba(0, 0, 0, 0.45)",
        }}
      >
        {/* Curved Lip Stitching */}
        <div className="absolute top-2 inset-x-5 pointer-events-none">
          <svg className="w-full h-3 overflow-visible" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M 2 2 Q 180 8 360 2"
              fill="none"
              stroke="#e9d5ff"
              strokeWidth="1.2"
              strokeDasharray="4 4"
              strokeLinecap="round"
              opacity="0.5"
              style={{ filter: "drop-shadow(0px 1px 1px rgba(0,0,0,0.6))" }}
            />
          </svg>
        </div>

        {/* Specular Rim Highlight Edge */}
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

        {/* 3D Tactile Coin Action Buttons */}
        <div className="relative z-20 grid grid-cols-3 gap-2 sm:gap-3 mt-2">
          {/* SCAN */}
          <button
            type="button"
            onClick={() => onAction("scan")}
            className="flex flex-col items-center gap-1.5 py-1 px-2 active:scale-90 transition-transform"
          >
            <div
              className="relative w-12 h-12 rounded-full bg-gradient-to-b from-[#00b4d8] via-[#0098ea] to-[#006097] border-2 border-cyan-200/60 flex items-center justify-center text-white"
              style={{
                boxShadow:
                  "0 10px 24px -4px rgba(0, 152, 234, 0.7), inset 0 2px 3px rgba(255, 255, 255, 0.6), inset 0 -3px 5px rgba(0, 0, 0, 0.5)",
              }}
            >
              <div className="absolute inset-1 rounded-full border border-white/40 pointer-events-none" />
              <ScanLine size={21} />
            </div>
            <span className="text-xs font-black tracking-wider text-white uppercase">SCAN</span>
          </button>

          {/* WEI COIN */}
          <button
            type="button"
            onClick={() => onAction("receive")}
            className="flex flex-col items-center gap-1.5 py-1 px-2 active:scale-90 transition-transform"
          >
            <div
              className="relative w-12 h-12 rounded-full bg-gradient-to-b from-[#0098ea] via-[#0077b5] to-[#004e7c] border-2 border-sky-200/70 flex items-center justify-center text-white"
              style={{
                boxShadow:
                  "0 10px 24px -4px rgba(0, 152, 234, 0.75), inset 0 2px 3px rgba(255, 255, 255, 0.65), inset 0 -3px 5px rgba(0, 0, 0, 0.5)",
              }}
            >
              <div className="absolute inset-1 rounded-full border border-white/40 pointer-events-none" />
              <div className="px-1.5 py-0.5 rounded bg-white text-[#0098ea] font-black text-[11px]">WEI</div>
            </div>
            <span className="text-xs font-black tracking-wider text-white uppercase">WEI COIN</span>
          </button>

          {/* WITHDRAW */}
          <button
            type="button"
            onClick={() => onAction("withdraw")}
            className="flex flex-col items-center gap-1.5 py-1 px-2 active:scale-90 transition-transform"
          >
            <div
              className="relative w-12 h-12 rounded-full bg-gradient-to-b from-[#fbbf24] via-[#f59e0b] to-[#b45309] border-2 border-amber-200/60 flex items-center justify-center text-white"
              style={{
                boxShadow:
                  "0 10px 24px -4px rgba(245, 158, 11, 0.7), inset 0 2px 3px rgba(255, 255, 255, 0.6), inset 0 -3px 5px rgba(0, 0, 0, 0.5)",
              }}
            >
              <div className="absolute inset-1 rounded-full border border-white/40 pointer-events-none" />
              <ArrowUpRight size={21} />
            </div>
            <span className="text-xs font-black tracking-wider text-white uppercase">WITHDRAW</span>
          </button>
        </div>
      </div>
    </div>
  );
};
```

---

## 8. Mandatory Design Restrictions

1. Strictly NO EMOJIS: Under no circumstances should emojis be rendered in UI elements, headers, buttons, toast alerts, error banners, or code.
2. Zero Flat Minimalist Cards: Never revert to plain borders, single flat background colors, or borderless gray containers. All primary account and card surfaces must adhere to the 3D skeuomorphic leather and card assembly.
3. Zero Outside Icon Packages: Never install or import icons from lucide-react, heroicons, react-icons, or fontawesome. Only official Keyline Icons (KeylineIcons.tsx) are permitted.
4. Zero Guide Labels & Meta-Descriptors: Never render internal system or design labels (e.g., SKEUOMORPHIC CARD, Skeuomorphic Controls, Demo Mode) on the user interface.
5. Zero Coin Association with Logo: The brand logo SHILIAI [WEI] is strictly corporate identity. It must never feature coin rims, currency symbols, or crypto badges inside or around it.
6. Wordmark Single-Line Rule: The brand unit SHILIAI + [WEI] badge must sit on the exact same line with a tight 2px-3px margin. Mutual exclusivity applies: never duplicate the wordmark as loose text alongside the logo.
