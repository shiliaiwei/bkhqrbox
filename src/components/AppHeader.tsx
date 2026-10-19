'use client';

import React from 'react';
import { translations } from '@/lib/i18n';
import { ShiliaiweiBrand } from '@/components/brand/ShiliaiweiBrand';
import { IconSettings } from './KeylineIcons';

export type ViewMode = 'khqr' | 'wallet' | 'dual';

interface AppHeaderProps {
  onToggleSandbox: () => void;
  viewMode?: ViewMode;
  onSelectViewMode?: (mode: ViewMode) => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  onToggleSandbox,
  viewMode = 'khqr',
  onSelectViewMode,
}) => {
  const t = translations.en;

  return (
    <header className="app-header">
      <div className="brand-wrapper">
        <ShiliaiweiBrand colorScheme="mint" height={28} />
      </div>

      <div className="header-controls">
        {onSelectViewMode && (
          <div className="view-mode-bar" role="group" aria-label="View Mode">
            <button
              type="button"
              id="view-mode-khqr"
              className={`view-mode-btn ${viewMode === 'khqr' ? 'active' : ''}`}
              onClick={() => onSelectViewMode('khqr')}
              title="NBC KHQR Stand Card"
            >
              <span>KHQR Stand</span>
            </button>
            <button
              type="button"
              id="view-mode-wallet"
              className={`view-mode-btn ${viewMode === 'wallet' ? 'active' : ''}`}
              onClick={() => onSelectViewMode('wallet')}
              title="3D Purple Leather Wallet"
            >
              <span>3D Wallet</span>
            </button>
            <button
              type="button"
              id="view-mode-dual"
              className={`view-mode-btn ${viewMode === 'dual' ? 'active' : ''}`}
              onClick={() => onSelectViewMode('dual')}
              title="Side-by-Side Dual View"
            >
              <span>Dual View</span>
            </button>
          </div>
        )}

        <button
          id="btn-toggle-sandbox"
          className="btn-toggle-sandbox"
          onClick={onToggleSandbox}
          title="Open Sandbox Developer Controls"
        >
          <IconSettings size={15} />
          <span>{t.sandboxBtn}</span>
        </button>
      </div>
    </header>
  );
};
