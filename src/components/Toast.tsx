'use client';

import React from 'react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  return (
    <div id="toast-notice" className={`toast-notice ${message ? 'show' : ''}`}>
      {message}
    </div>
  );
};
