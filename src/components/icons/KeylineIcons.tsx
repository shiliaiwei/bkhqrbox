import React from 'react';

export * from '../KeylineIcons';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
  strokeWidth?: number;
}

/**
 * Two-Tone Rounded ScanLine Icon
 */
export const ScanLine: React.FC<IconProps> = ({
  size = 24,
  className = '',
  strokeWidth = 2,
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={`keyline-icon ${className}`}
    {...props}
  >
    <rect x="3" y="3" width="18" height="18" rx="3.5" fill="currentColor" fillOpacity="0.14" stroke="none" />
    <path d="M3 7V5a2 2 0 0 1 2-2h2" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17 3h2a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 17v2a2 2 0 0 1-2 2h-2" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 21H5a2 2 0 0 1-2-2v-2" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    <line x1="6" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * Two-Tone Rounded ArrowUpRight Icon
 */
export const ArrowUpRight: React.FC<IconProps> = ({
  size = 24,
  className = '',
  strokeWidth = 2,
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={`keyline-icon ${className}`}
    {...props}
  >
    <circle cx="12" cy="12" r="9.5" fill="currentColor" fillOpacity="0.16" stroke="none" />
    <line x1="8" y1="16" x2="16" y2="8" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="9 8 16 8 16 15" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
