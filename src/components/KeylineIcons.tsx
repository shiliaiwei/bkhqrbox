import React from 'react';

/**
 * Two-Tone Rounded Geometric Keyline Icon System
 * Built with dual-layer depth:
 * - Primary layer: Crisp vector keyline stroke with rounded caps and joins
 * - Secondary layer: Cohesive two-tone fill with soft opacity (fillOpacity="0.18" - "0.25")
 * - Rounded geometry: All shapes use smooth rounded radii (rx="2-3") and strokeLinecap="round"
 * Strictly Zero Emojis.
 */

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
  strokeWidth?: number;
}

export const IconSettings: React.FC<IconProps> = ({
  size = 20,
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
    <circle
      cx="12"
      cy="12"
      r="3"
      fill="currentColor"
      fillOpacity="0.25"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconGlobe: React.FC<IconProps> = ({
  size = 20,
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
    <circle
      cx="12"
      cy="12"
      r="10"
      fill="currentColor"
      fillOpacity="0.18"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="2"
      y1="12"
      x2="22"
      y2="12"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconShieldCheck: React.FC<IconProps> = ({
  size = 20,
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
    <path
      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
      fill="currentColor"
      fillOpacity="0.18"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <polyline
      points="9 12 11 14 15 10"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconRefresh: React.FC<IconProps> = ({
  size = 20,
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
    <circle cx="12" cy="12" r="7.5" fill="currentColor" fillOpacity="0.14" stroke="none" />
    <polyline
      points="23 4 23 10 17 10"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconDownload: React.FC<IconProps> = ({
  size = 20,
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
    <path
      d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
      fill="currentColor"
      fillOpacity="0.18"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <polyline
      points="7 10 12 15 17 10"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="12"
      y1="15"
      x2="12"
      y2="3"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconCopy: React.FC<IconProps> = ({
  size = 20,
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
    <path
      d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect
      x="9"
      y="9"
      width="13"
      height="13"
      rx="2.5"
      ry="2.5"
      fill="currentColor"
      fillOpacity="0.22"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconCheck: React.FC<IconProps> = ({
  size = 20,
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
    <circle cx="12" cy="12" r="9" fill="currentColor" fillOpacity="0.16" stroke="none" />
    <polyline
      points="16 9 10.5 15 7.5 12"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconCheckCircle: React.FC<IconProps> = ({
  size = 20,
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
    <circle
      cx="12"
      cy="12"
      r="10"
      fill="currentColor"
      fillOpacity="0.2"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <polyline
      points="9 12 11 14 15 10"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconClose: React.FC<IconProps> = ({
  size = 20,
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
    <circle cx="12" cy="12" r="9" fill="currentColor" fillOpacity="0.16" stroke="none" />
    <line
      x1="15"
      y1="9"
      x2="9"
      y2="15"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="9"
      y1="9"
      x2="15"
      y2="15"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconClock: React.FC<IconProps> = ({
  size = 20,
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
    <circle
      cx="12"
      cy="12"
      r="10"
      fill="currentColor"
      fillOpacity="0.18"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <polyline
      points="12 6 12 12 16 14"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconBolt: React.FC<IconProps> = ({
  size = 20,
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
    <polygon
      points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"
      fill="currentColor"
      fillOpacity="0.22"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconExternalLink: React.FC<IconProps> = ({
  size = 20,
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
    <path
      d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
      fill="currentColor"
      fillOpacity="0.18"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <polyline
      points="15 3 21 3 21 9"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="10"
      y1="14"
      x2="21"
      y2="3"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconQrCode: React.FC<IconProps> = ({
  size = 20,
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
    <rect
      x="3"
      y="3"
      width="7"
      height="7"
      rx="2"
      fill="currentColor"
      fillOpacity="0.22"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="6.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    <rect
      x="14"
      y="3"
      width="7"
      height="7"
      rx="2"
      fill="currentColor"
      fillOpacity="0.22"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    <rect
      x="3"
      y="14"
      width="7"
      height="7"
      rx="2"
      fill="currentColor"
      fillOpacity="0.22"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="6.5" cy="17.5" r="1.2" fill="currentColor" stroke="none" />
    <line
      x1="14"
      y1="14"
      x2="14"
      y2="14.01"
      stroke="currentColor"
      strokeWidth={strokeWidth * 1.5}
      strokeLinecap="round"
    />
    <line
      x1="17"
      y1="14"
      x2="21"
      y2="14"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <line
      x1="14"
      y1="17"
      x2="17"
      y2="17"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <line
      x1="21"
      y1="17"
      x2="21"
      y2="21"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <line
      x1="14"
      y1="21"
      x2="17"
      y2="21"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </svg>
);

export const IconLayers: React.FC<IconProps> = ({
  size = 20,
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
    <polygon
      points="12 2 2 7 12 12 22 7 12 2"
      fill="currentColor"
      fillOpacity="0.22"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <polyline
      points="2 17 12 22 22 17"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <polyline
      points="2 12 12 17 22 12"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconBuilding: React.FC<IconProps> = ({
  size = 20,
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
    <rect x="4" y="10" width="16" height="11" rx="2" fill="currentColor" fillOpacity="0.18" stroke="none" />
    <line
      x1="2"
      y1="21"
      x2="22"
      y2="21"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="4"
      y1="10"
      x2="20"
      y2="10"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <polyline
      points="12 2 20 6 4 6 12 2"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="7"
      y1="10"
      x2="7"
      y2="21"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <line
      x1="12"
      y1="10"
      x2="12"
      y2="21"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <line
      x1="17"
      y1="10"
      x2="17"
      y2="21"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </svg>
);

export const IconUser: React.FC<IconProps> = ({
  size = 20,
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
    <circle
      cx="12"
      cy="7"
      r="4"
      fill="currentColor"
      fillOpacity="0.25"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
      fill="currentColor"
      fillOpacity="0.16"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconCreditCard: React.FC<IconProps> = ({
  size = 20,
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
    <rect
      x="1"
      y="4"
      width="22"
      height="16"
      rx="3"
      fill="currentColor"
      fillOpacity="0.18"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="1"
      y1="10"
      x2="23"
      y2="10"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <circle cx="6.5" cy="15" r="1.5" fill="currentColor" fillOpacity="0.4" stroke="none" />
    <line
      x1="12"
      y1="15"
      x2="17"
      y2="15"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </svg>
);

export const IconActivity: React.FC<IconProps> = ({
  size = 20,
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
    <circle cx="12" cy="12" r="9" fill="currentColor" fillOpacity="0.15" stroke="none" />
    <polyline
      points="22 12 18 12 15 21 9 3 6 12 2 12"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconKey: React.FC<IconProps> = ({
  size = 20,
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
    <circle
      cx="7.5"
      cy="15.5"
      r="4.5"
      fill="currentColor"
      fillOpacity="0.22"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="7.5"
      cy="15.5"
      r="1.8"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.8 12.2L18.5 4.5l2 2-1 1 2 2-2 1-1 1"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconCode: React.FC<IconProps> = ({
  size = 20,
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
    <rect x="2" y="4" width="20" height="16" rx="3" fill="currentColor" fillOpacity="0.15" stroke="none" />
    <polyline
      points="16 18 21 12 16 6"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <polyline
      points="8 6 3 12 8 18"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="14"
      y1="4"
      x2="10"
      y2="20"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </svg>
);

export const IconTerminal: React.FC<IconProps> = ({
  size = 20,
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
    <rect
      x="2"
      y="3"
      width="20"
      height="18"
      rx="3"
      fill="currentColor"
      fillOpacity="0.18"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <polyline
      points="6 9 9 12 6 15"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="12"
      y1="16"
      x2="16"
      y2="16"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
