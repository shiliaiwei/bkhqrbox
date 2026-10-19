import React from 'react';

export interface TelegramVerifiedBadgeProps {
  size?: number;
  className?: string;
}

/**
 * Official Telegram Verified Badge Component
 * Official blue star polygon with white center checkmark
 * Strictly Zero Emojis
 */
export const TelegramVerifiedBadge: React.FC<TelegramVerifiedBadgeProps> = ({
  size = 16,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 ${className}`}
      aria-label="Telegram Verified"
    >
      <path
        d="M12 2L14.4 4.3L17.7 3.8L18.9 6.9L22 8.1L21.5 11.4L23.8 13.8L21.5 16.2L22 19.5L18.9 20.7L17.7 23.8L14.4 23.3L12 25.6L9.6 23.3L6.3 23.8L5.1 20.7L2 19.5L2.5 16.2L0.2 13.8L2.5 11.4L2 8.1L5.1 6.9L6.3 3.8L9.6 4.3L12 2Z"
        fill="#0098ea"
        transform="scale(0.85) translate(2, 0)"
      />
      <path
        d="M9 12.5L11.5 15L16.5 9.5"
        stroke="#ffffff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
