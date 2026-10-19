'use client';

import React from 'react';
import { IconCheck } from './KeylineIcons';

interface TechStepperTabProps {
  currentStep?: 1 | 2 | 3;
  onSelectStep?: (step: 1 | 2 | 3) => void;
}

/**
 * Continuous Chamfered Stepper Tab Component
 * Strictly complies with tech-domains-design Canonical Pattern B.
 * Features:
 * - 18px precision 45-degree chamfer cut on top-right
 * - Continuous 1px nested inset border architecture
 * - Negative bottom margin (-1px) and z-index (2) to connect seamlessly with the panel
 * - Space Grotesk numerals and DM Sans step titles
 * - Zero emojis
 */
export const TechStepperTab: React.FC<TechStepperTabProps> = ({
  currentStep = 2,
  onSelectStep,
}) => {
  const steps = [
    {
      id: 1 as const,
      num: '1',
      title: 'Payment Parameters',
    },
    {
      id: 2 as const,
      num: '2',
      title: 'Scan & Pay KHQR',
    },
    {
      id: 3 as const,
      num: '3',
      title: 'Instant Settlement',
    },
  ];

  return (
    <nav className="stepper-tab" aria-label="Checkout Progress">
      <div className="stepper-tab-inner">
        {steps.map((s, idx) => {
          const isCompleted = currentStep > s.id;
          const isActive = currentStep === s.id;
          const isUpcoming = currentStep < s.id;

          const itemClass = isCompleted
            ? 'step-item step-completed'
            : isActive
            ? 'step-item step-active'
            : 'step-item step-upcoming';

          return (
            <React.Fragment key={s.id}>
              {idx > 0 && <span className="step-connector" aria-hidden="true" />}
              <button
                type="button"
                onClick={() => onSelectStep?.(s.id)}
                className={itemClass}
                aria-current={isActive ? 'step' : undefined}
                disabled={isUpcoming}
              >
                <span className="step-badge">
                  {isCompleted ? <IconCheck size={12} strokeWidth={3} /> : s.num}
                </span>
                <span className="step-title">{s.title}</span>
              </button>
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};
