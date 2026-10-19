'use client';

import React from 'react';
import { TelegramVerifiedBadge } from '@/components/common/TelegramVerifiedBadge';
import { ShiliaiweiBrand } from '@/components/brand/ShiliaiweiBrand';

export interface SkeuomorphicLeatherWalletCardProps {
  username?: string;
  maskedAddress?: string;
  balance?: string;
  currency?: 'USD' | 'KHR';
  onAction?: (action: string) => void;
  onToggleCurrency?: () => void;
}

/**
 * 3D Skeuomorphic Purple Textured Leather Wallet & Stitched Card Component
 * Strictly complies with skeuomorphic-purple-leather-wallet-design skill standard.
 * Features:
 * - Pebble leather grain procedural texture overlay
 * - Perimeter simulated light lavender thread stitching with drop shadow
 * - Inserted satin credit card with Banknote Guilloche Security Watermark
 * - Specular sheen light gradient
 * - Front leather flap with scooped curved lip stitching (M 2 2 Q 180 8 360 2)
 * - Pure single-line SHILIAI [WEI] corporate brand mark (Zero coin association)
 * - Strictly zero emojis across UI and labels
 */
export const SkeuomorphicLeatherWalletCard: React.FC<SkeuomorphicLeatherWalletCardProps> = ({
  username = 'shiliaiwei',
  maskedAddress = '0x1866...84ca',
  balance = '1,250.00',
  currency = 'USD',
  onAction = () => {},
  onToggleCurrency = () => {},
}) => {
  const cardGradient =
    currency === 'USD'
      ? 'linear-gradient(135deg, #059669 0%, #047857 35%, #065f46 70%, #064e3b 100%)'
      : 'linear-gradient(135deg, #c084fc 0%, #a855f7 35%, #7e22ce 70%, #4c1d95 100%)';

  return (
    <div className="skeuo-wallet-container" id="skeuo-wallet-card">
      {/* 1. Procedural Pebble Leather Grain Texture Overlay */}
      <div className="skeuo-pebble-grain" />

      {/* 2. Perimeter Light Lavender Simulated Thread Stitching */}
      <svg
        className="skeuo-perimeter-svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 440 250"
        preserveAspectRatio="none"
      >
        <rect
          x="9"
          y="9"
          width="422"
          height="232"
          rx="26"
          ry="26"
          fill="none"
          stroke="#e9d5ff"
          strokeWidth="1.25"
          strokeDasharray="4 4"
          strokeLinecap="round"
          opacity="0.55"
          style={{ filter: 'drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.60))' }}
        />
      </svg>

      {/* 3. Inserted Physical Card (Peek) */}
      <div
        className="skeuo-inserted-card"
        style={{
          background: cardGradient,
        }}
      >
        {/* Banknote Guilloche Security Watermark */}
        <div className="skeuo-card-banknote" />

        {/* Specular Sheen Overlay */}
        <div className="skeuo-card-sheen" />

        {/* Card Content Data */}
        <div className="skeuo-card-content">
          {/* Top Row: User Tag & Corporate Brand Logo */}
          <div className="skeuo-card-top-row">
            <div className="skeuo-user-badge-wrap">
              <span className="skeuo-username">@{username}</span>
              <TelegramVerifiedBadge size={16} />
            </div>
            <ShiliaiweiBrand colorScheme="white" height={16} />
          </div>

          {/* Monospace Address */}
          <div className="skeuo-masked-addr">{maskedAddress}</div>

          {/* Bottom Row: Currency Trigger & Balance */}
          <div className="skeuo-balance-row">
            <button
              type="button"
              onClick={onToggleCurrency}
              className="skeuo-currency-trigger"
              title="Toggle Currency (USD / KHR)"
            >
              <span className="skeuo-symbol-big">{currency === 'USD' ? '$' : '៛'}</span>
            </button>
            <span className="skeuo-balance-val">{balance}</span>
          </div>
        </div>
      </div>

      {/* 4. Front Leather Flap with Scooped Lip */}
      <div className="skeuo-leather-flap">
        {/* Curved Lip Thread Stitching SVG */}
        <div className="skeuo-curved-stitch-wrap">
          <svg
            className="w-full h-3 overflow-visible"
            viewBox="0 0 360 10"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M 2 2 Q 180 8 358 2"
              fill="none"
              stroke="#e9d5ff"
              strokeWidth="1.25"
              strokeDasharray="4 4"
              strokeLinecap="round"
              opacity="0.55"
              style={{ filter: 'drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.60))' }}
            />
          </svg>
        </div>

        {/* Specular Rim Highlight Edge */}
        <div className="skeuo-rim-highlight" />
      </div>
    </div>
  );
};
