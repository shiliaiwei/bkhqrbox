import React from 'react';

export interface ShiliaiweiBrandProps {
  colorScheme?: 'sky-blue' | 'white' | 'obsidian' | 'mint' | 'cyber';
  height?: number;
  className?: string;
}

/**
 * Official SHILIAIWEI Corporate Brand Logo Component
 * LinkedIn-style typographic badge architecture (SHILIAI + [WEI])
 * Strictly corporate identity — zero coin/currency association.
 */
export const ShiliaiweiBrand: React.FC<ShiliaiweiBrandProps> = ({
  colorScheme = 'mint',
  height = 24,
  className = '',
}) => {
  const width = Math.round((height * 122) / 32);

  let textColor = '#ffffff';
  let badgeColor = '#d2e2b9';
  let badgeTextColor = '#08090b';

  if (colorScheme === 'sky-blue') {
    textColor = '#0098ea';
    badgeColor = '#0098ea';
    badgeTextColor = '#ffffff';
  } else if (colorScheme === 'white') {
    textColor = '#ffffff';
    badgeColor = '#ffffff';
    badgeTextColor = '#0077b5';
  } else if (colorScheme === 'obsidian') {
    textColor = '#0f172a';
    badgeColor = '#0098ea';
    badgeTextColor = '#ffffff';
  } else if (colorScheme === 'cyber' || colorScheme === 'mint') {
    textColor = '#ffffff';
    badgeColor = '#d2e2b9';
    badgeTextColor = '#08090b';
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 122 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none ${className}`}
      aria-label="SHILIAIWEI"
    >
      {/* 1. Wordmark: SHILIAI */}
      <text
        x="0"
        y="24"
        fill={textColor}
        fontSize="24"
        fontFamily="system-ui, -apple-system, 'SF Pro Display', Roboto, sans-serif"
        fontWeight="900"
        letterSpacing="-0.03em"
        textLength="72"
        lengthAdjust="spacingAndGlyphs"
      >
        SHILIAI
      </text>

      {/* 2. Badge Container: [WEI] */}
      <rect x="75" y="4" width="44" height="23" rx="6" fill={badgeColor} />

      {/* 3. Badge Text: WEI */}
      <text
        x="97"
        y="21"
        textAnchor="middle"
        fill={badgeTextColor}
        fontSize="14"
        fontFamily="system-ui, -apple-system, 'SF Pro Display', Roboto, sans-serif"
        fontWeight="900"
        letterSpacing="-0.01em"
      >
        WEI
      </text>
    </svg>
  );
};
