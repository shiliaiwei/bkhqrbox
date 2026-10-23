'use client';

import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { KHQRResult } from '@/types';
import { translations } from '@/lib/i18n';
import { IconClock } from './KeylineIcons';
import { findBankByNameOrId } from '@/lib/banks';

interface KHQRCardProps {
  qrData: KHQRResult;
  expirySeconds: number;
  deeplinkUrl?: string;
  acquiringBank?: string;
  onSelectBank?: (bankName: string) => void;
}

export const KHQRCard: React.FC<KHQRCardProps> = ({
  qrData,
  expirySeconds,
  deeplinkUrl: _deeplinkUrl,
  acquiringBank,
  onSelectBank: _onSelectBank,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const t = translations.en;

  // Active bank metadata
  const activeBank = acquiringBank ? findBankByNameOrId(acquiringBank) : undefined;

  useEffect(() => {
    if (canvasRef.current && qrData.qrString) {
      QRCode.toCanvas(
        canvasRef.current,
        qrData.qrString,
        {
          width: 400,
          margin: 1,
          color: {
            dark: '#000000',
            light: '#FFFFFF',
          },
          errorCorrectionLevel: 'M',
        },
        (error) => {
          if (error) console.error('QR Canvas Render Error:', error);
        }
      );
    }
  }, [qrData.qrString]);

  const mins = Math.floor(expirySeconds / 60);
  const secs = expirySeconds % 60;
  const formattedTime = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  // Format amount per NBC Bakong Guidelines (Page 6, 7, 8, 9)
  const isUSD = qrData.currency === 'USD';
  const hasAmount = qrData.amount > 0;
  const formattedAmount = hasAmount
    ? isUSD
      ? Number(qrData.amount).toFixed(2)
      : Number(qrData.amount).toLocaleString('en-US')
    : '0';

  // Official NBC Bakong center emblem logic per guidelines:
  // - If static open amount: Official Red KHQR Mark (/resources/khqr-brand/khqr-logo-red.svg)
  // - If dynamic USD: Official NBC USD Currency Badge (/resources/merchant-materials/currency-usd.png)
  // - If dynamic KHR: Official NBC KHR Currency Badge (/resources/merchant-materials/currency-khr.png)
  const isStatic = !hasAmount;
  const centerEmblemSrc = isStatic
    ? '/resources/khqr-brand/khqr-logo-red.svg'
    : isUSD
      ? '/resources/merchant-materials/currency-usd.png'
      : '/resources/merchant-materials/currency-khr.png';

  return (
    <div className="checkout-wrapper">
      <div className="aba-qr-block">
        <div className="aba-qr-box">
          {/* Official NBC Bakong Stand Header */}
          <div className="bakong-stand-header-wrap">
            <div className="merchant-stand-label">
              <span className="stand-dot-indicator" />
              <span>MERCHANT KHQR STAND</span>
            </div>
            <div className="bakong-official-logo-box">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/resources/khqr-brand/bakong-logo.svg"
                alt="National Bank of Cambodia - Bakong"
                className="bakong-official-logo-img"
              />
            </div>
          </div>

          {/* Account Identifier & Bank Switching Outside the Card (NBC Guidelines Page 10) */}
          <div className="khqr-account-outside">
            <span className="khqr-account-pill" id="ui-merchant-id">
              {qrData.bakongAccountId}
            </span>
            {activeBank && (
              <span className="khqr-bank-pill" title={activeBank.nameEn}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeBank.logo}
                  alt={activeBank.shortName}
                  className="khqr-bank-icon"
                />
                <span>{activeBank.shortName}</span>
              </span>
            )}
          </div>

          {/* The KHQR Master Card (Strict 20:29 Aspect Ratio per NBC Guidelines Page 5) */}
          <div className="khqr-aba">
            <div className="khqr-content">
              {/* Red Header Banner (12% of card height per Page 5) */}
              <div className="khqr-banner-container">
                <div className="khqr-banner">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/resources/khqr-brand/khqr-logo.svg"
                    alt="KHQR"
                    className="khqr-banner-logo"
                  />
                </div>
              </div>

              {/* Merchant Information - Strictly Left-Aligned per NBC Guidelines Page 7 */}
              <div className="merc-khqr-info">
                <div className="merchant-name-label" id="ui-merchant-name">
                  {qrData.merchantName}
                </div>
                <div className="merchant-amount-row" id="ui-amount-row">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={
                      isUSD
                        ? '/resources/merchant-materials/currency-usd.png'
                        : '/resources/merchant-materials/currency-khr.png'
                    }
                    alt={isUSD ? 'USD' : 'KHR'}
                    className="merchant-currency-badge"
                  />
                  <span className="amount-value" id="ui-amount-val">
                    {formattedAmount}
                  </span>
                  <span className="amount-currency-tag">
                    {isUSD ? 'USD' : 'KHR'}
                  </span>
                </div>
                <div className="amount-hint-text" id="ui-amount-hint">
                  {hasAmount ? t.fixedAmountTransfer : t.openPrice}
                </div>
              </div>

              {/* Ticket Notch Line Divider (Page 5) */}
              <div className="line-divider-wrapper">
                <div className="line-notch-left" />
                <div className="line-divider" />
                <div className="line-notch-right" />
              </div>

              {/* QR Code Canvas with Centered Emblem (Page 6 & 13) */}
              <div className="qr-canvas-block">
                <div className="qr-canvas-wrapper">
                  <canvas ref={canvasRef} id="qr-canvas" width={400} height={400} />
                  <div
                    className={
                      isStatic ? 'khqr-center-emblem-red' : 'khqr-center-emblem-badge'
                    }
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={centerEmblemSrc}
                      className={
                        isStatic ? 'khqr-center-icon-red' : 'khqr-center-icon-badge'
                      }
                      alt={`${qrData.currency} Emblem`}
                    />
                  </div>
                </div>

                {/* Expiry Timer Countdown */}
                <div className="payment-expiry-timer">
                  <IconClock size={13} className="inline mr-1 opacity-70" />
                  <span>{t.qrExpiresIn}</span>
                  <span className="expiry-clock-badge" id="ui-expiry-clock">
                    {formattedTime}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Official KHQR Acceptance Badge (NBC Guidelines Page 15-16) */}
          <div className="khqr-available-badge-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/resources/khqr-brand/khqr-available-here.svg"
              alt="KHQR Available Here"
              className="khqr-available-badge-img"
            />
          </div>

          <div className="khqr-scan-desc">
            Scan to Pay with Bakong App or any Bank App
          </div>

        </div>
      </div>
    </div>
  );
};
