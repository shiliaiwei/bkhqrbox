'use client';

import React, { useState, useMemo } from 'react';
import { AccountType, Currency, KHQRResult } from '@/types';
import { translations } from '@/lib/i18n';
import { KHQR } from '@/sdk';
import { CAMBODIAN_BANKS, findBankByNameOrId } from '@/lib/banks';
import {
  IconClose,
  IconCopy,
  IconBolt,
  IconRefresh,
  IconDownload,
  IconQrCode,
  IconCheck,
  IconLayers,
  IconBuilding,
  IconUser,
  IconCreditCard,
  IconActivity,
  IconKey,
  IconCode,
  IconTerminal,
  IconSettings,
} from './KeylineIcons';

interface SandboxPanelProps {
  isOpen: boolean;
  onClose: () => void;
  accountType: AccountType;
  onAccountTypeChange: (type: AccountType) => void;
  merchantName: string;
  onMerchantNameChange: (val: string) => void;
  bakongAccountId: string;
  onBakongAccountIdChange: (val: string) => void;
  merchantId: string;
  onMerchantIdChange: (val: string) => void;
  acquiringBank: string;
  onAcquiringBankChange: (val: string) => void;
  currency: Currency;
  onCurrencyChange: (curr: Currency) => void;
  amount: number;
  onAmountChange: (amt: number) => void;
  bakongToken: string;
  onBakongTokenChange: (token: string) => void;
  deeplinkUrl: string;
  onDeeplinkUrlChange: (url: string) => void;
  isPolling: boolean;
  onTogglePolling: (enabled: boolean) => void;
  pollingStatus: 'polling' | 'success' | 'paused' | 'expired';
  pollingMessage: string;
  qrData: KHQRResult | null;
  rawResponse: string;
  onSimulateSuccess: () => void;
  onRegenerateBill: () => void;
  onDownloadQR: () => void;
  onToast: (msg: string) => void;
  onFetchBakongApi?: () => void;
}

export const SandboxPanel: React.FC<SandboxPanelProps> = ({
  isOpen,
  onClose,
  accountType,
  onAccountTypeChange,
  merchantName,
  onMerchantNameChange,
  bakongAccountId,
  onBakongAccountIdChange,
  merchantId,
  onMerchantIdChange,
  acquiringBank,
  onAcquiringBankChange,
  currency,
  onCurrencyChange,
  amount,
  onAmountChange,
  bakongToken,
  onBakongTokenChange,
  deeplinkUrl,
  onDeeplinkUrlChange,
  isPolling,
  onTogglePolling,
  pollingStatus,
  pollingMessage,
  qrData,
  rawResponse,
  onSimulateSuccess,
  onRegenerateBill,
  onDownloadQR,
  onToast,
  onFetchBakongApi,
}) => {
  if (!isOpen) return null;

  const t = translations.en;
  const selectedBank = findBankByNameOrId(acquiringBank);

  const [snippetLang, setSnippetLang] = useState<'typescript' | 'curl' | 'python'>('typescript');

  const activeSnippet = useMemo(() => {
    return KHQR.generateCodeSnippet(snippetLang, {
      accountType,
      bakongAccountId,
      merchantName,
      merchantId,
      acquiringBank,
      currency,
      amount,
      billNumber: qrData?.billNumber,
      token: bakongToken,
    });
  }, [
    snippetLang,
    accountType,
    bakongAccountId,
    merchantName,
    merchantId,
    acquiringBank,
    currency,
    amount,
    qrData?.billNumber,
    bakongToken,
  ]);

  const copyText = (text: string, label: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    onToast(`${label}: ${t.copiedSuccess}`);
  };

  const handleSelectBank = (bankName: string, defaultAccId: string) => {
    onAcquiringBankChange(bankName);
    if (defaultAccId) {
      onBakongAccountIdChange(defaultAccId);
    }
    onToast(`Acquiring bank switched to ${bankName}`);
  };

  return (
    <aside id="sandbox-panel" className="sandbox-panel">
      {/* Panel Header */}
      <div className="panel-header">
        <div className="panel-title">
          <IconSettings size={18} className="panel-title-icon" />
          <span>{t.developerControls}</span>
        </div>
        <button
          id="btn-close-sandbox"
          className="panel-close-btn"
          onClick={onClose}
          title="Close Panel"
        >
          <IconClose size={18} />
        </button>
      </div>

      {/* Account Type Mode */}
      <div className="form-section">
        <span className="section-label">
          <IconLayers size={13} className="keyline-section-icon" />
          <span>KHQR Specification Type</span>
        </span>
        <div className="type-switcher">
          <button
            className={`type-btn ${accountType === 'individual' ? 'active' : ''}`}
            onClick={() => onAccountTypeChange('individual')}
          >
            {t.individualTag}
          </button>
          <button
            className={`type-btn ${accountType === 'merchant' ? 'active' : ''}`}
            onClick={() => onAccountTypeChange('merchant')}
          >
            {t.merchantTag}
          </button>
        </div>
      </div>

      {/* Cambodian Bank Ecosystem Selector (resources/bank-logos/) */}
      <div className="form-section">
        <div className="data-row-header">
          <span className="section-label">
            <IconBuilding size={13} className="keyline-section-icon" />
            <span>Acquiring Bank Quick Selector</span>
          </span>
          {selectedBank && (
            <span className="text-xs text-slate-700 font-semibold">
              {selectedBank.shortName}
            </span>
          )}
        </div>
        <div className="bank-selection-grid">
          {CAMBODIAN_BANKS.slice(0, 8).map((bank) => {
            const isSelected =
              selectedBank && selectedBank.id === bank.id;
            return (
              <button
                type="button"
                key={bank.id}
                onClick={() => handleSelectBank(bank.nameEn, bank.defaultAccountId)}
                className={`bank-quick-btn ${isSelected ? 'active' : ''}`}
                title={bank.nameEn}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={bank.logo} alt={bank.shortName} className="bank-quick-logo" />
                <span className="bank-quick-name">{bank.shortName}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Merchant / Account Parameters */}
      <div className="form-section">
        <span className="section-label">
          <IconUser size={13} className="keyline-section-icon" />
          <span>{t.accountParams}</span>
        </span>
        <div className="form-group">
          <label className="form-label" htmlFor="input-merchant-name">
            {accountType === 'merchant' ? t.merchantNameLabel : t.accountNameLabel}
          </label>
          <input
            type="text"
            id="input-merchant-name"
            className="form-input"
            value={merchantName}
            onChange={(e) => onMerchantNameChange(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="input-merchant-id">
            {t.bakongAccountIdLabel}
          </label>
          <input
            type="text"
            id="input-merchant-id"
            className="form-input font-mono"
            value={bakongAccountId}
            onChange={(e) => onBakongAccountIdChange(e.target.value)}
          />
        </div>

        {accountType === 'merchant' && (
          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="input-merchant-terminal-id">
                {t.merchantIdLabel}
              </label>
              <input
                type="text"
                id="input-merchant-terminal-id"
                className="form-input font-mono"
                value={merchantId}
                onChange={(e) => onMerchantIdChange(e.target.value)}
              />
            </div>
            <div className="form-group">
              <div className="data-row-header">
                <label className="form-label" htmlFor="input-acquiring-bank">
                  {t.acquiringBankLabel}
                </label>
                {selectedBank && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={selectedBank.logo}
                    alt={selectedBank.shortName}
                    style={{ height: '14px', width: 'auto', objectFit: 'contain' }}
                  />
                )}
              </div>
              <input
                type="text"
                id="input-acquiring-bank"
                list="cambodian-banks-list"
                className="form-input"
                value={acquiringBank}
                onChange={(e) => onAcquiringBankChange(e.target.value)}
              />
              <datalist id="cambodian-banks-list">
                {CAMBODIAN_BANKS.map((b) => (
                  <option key={b.id} value={b.nameEn} />
                ))}
              </datalist>
            </div>
          </div>
        )}
      </div>

      {/* Payment Amount & Currency */}
      <div className="form-section">
        <span className="section-label">
          <IconCreditCard size={13} className="keyline-section-icon" />
          <span>{t.paymentAmount}</span>
        </span>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">{t.currency}</label>
            <div className="currency-switcher">
              <button
                id="btn-curr-usd"
                className={`currency-btn ${currency === 'USD' ? 'active' : ''}`}
                onClick={() => onCurrencyChange('USD')}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/resources/merchant-materials/currency-usd.png"
                  alt="USD"
                  className="currency-btn-img"
                />
                <span>USD ($)</span>
              </button>
              <button
                id="btn-curr-khr"
                className={`currency-btn ${currency === 'KHR' ? 'active' : ''}`}
                onClick={() => onCurrencyChange('KHR')}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/resources/merchant-materials/currency-khr.png"
                  alt="KHR"
                  className="currency-btn-img"
                />
                <span>KHR (៛)</span>
              </button>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="input-amount">
              {t.paymentAmount} (0 = {t.openPrice})
            </label>
            <input
              type="number"
              id="input-amount"
              className="form-input"
              value={amount}
              step={currency === 'KHR' ? 100 : 0.01}
              min={0}
              onChange={(e) => onAmountChange(parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>

        <div className="amount-chips">
          <button className="chip-btn" onClick={() => onAmountChange(0)}>
            {t.openPrice} ($0)
          </button>
          <button
            className="chip-btn"
            onClick={() => {
              onCurrencyChange('USD');
              onAmountChange(1.0);
            }}
          >
            $ 1.00
          </button>
          <button
            className="chip-btn"
            onClick={() => {
              onCurrencyChange('USD');
              onAmountChange(5.0);
            }}
          >
            $ 5.00
          </button>
          <button
            className="chip-btn"
            onClick={() => {
              onCurrencyChange('USD');
              onAmountChange(10.0);
            }}
          >
            $ 10.00
          </button>
          <button
            className="chip-btn"
            onClick={() => {
              onCurrencyChange('KHR');
              onAmountChange(4000);
            }}
          >
            ៛ 4,000
          </button>
          <button
            className="chip-btn"
            onClick={() => {
              onCurrencyChange('KHR');
              onAmountChange(20000);
            }}
          >
            ៛ 20,000
          </button>
        </div>
      </div>

      {/* Live NBC Bakong Open API Polling Status */}
      <div className="form-section">
        <span className="section-label">
          <IconActivity size={13} className="keyline-section-icon" />
          <span>NBC Bakong Open API Status</span>
        </span>
        <div className="status-card">
          <div className="status-header">
            <div className="status-indicator">
              <span id="status-pill" className={`status-pill ${pollingStatus}`} />
              <span id="status-text">{pollingMessage}</span>
            </div>
            <label className="poll-toggle-label">
              <input
                type="checkbox"
                id="check-auto-poll"
                checked={isPolling}
                onChange={(e) => onTogglePolling(e.target.checked)}
              />
              <span>Auto-poll (8s)</span>
            </label>
          </div>

          <div className="data-row">
            <div className="data-row-header">
              <span className="data-label">MD5 Transaction Hash</span>
              <button
                id="btn-copy-md5"
                className="btn-copy"
                onClick={() => copyText(qrData?.md5 || '', 'MD5 Hash')}
              >
                <IconCopy size={12} className="inline mr-1" />
                Copy MD5
              </button>
            </div>
            <div id="debug-md5" className="data-value-box">
              {qrData?.md5 || 'Calculating...'}
            </div>
          </div>

          <div className="data-row">
            <div className="data-row-header">
              <span className="data-label">Raw EMVCo KHQR String</span>
              <button
                id="btn-copy-qr"
                className="btn-copy"
                onClick={() => copyText(qrData?.qrString || '', 'KHQR String')}
              >
                <IconCopy size={12} className="inline mr-1" />
                Copy QR
              </button>
            </div>
            <div id="debug-qr-string" className="data-value-box">
              {qrData?.qrString || 'Generating...'}
            </div>
          </div>

          <div className="data-row">
            <div className="data-row-header">
              <span className="data-label">Bakong API Response (`check_transaction_by_md5`)</span>
            </div>
            <div id="debug-raw-response" className="api-raw-box">
              {rawResponse || 'Waiting for initial response...'}
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Credentials */}
      <div className="form-section">
        <span className="section-label">
          <IconKey size={13} className="keyline-section-icon" />
          <span>Credentials & Deeplink</span>
        </span>
        <div className="form-group">
          <label className="form-label" htmlFor="input-token">
            Bakong Bearer Token
          </label>
          <input
            type="password"
            id="input-token"
            className="form-input font-mono"
            value={bakongToken}
            onChange={(e) => onBakongTokenChange(e.target.value)}
          />
          {onFetchBakongApi && (
            <button
              type="button"
              id="btn-fetch-bakong-api"
              className="btn-fetch-bakong"
              onClick={onFetchBakongApi}
              title="Fetch and validate authentic KHQR via Bakong Open API token"
            >
              <IconRefresh size={13} className="inline mr-1" />
              <span>Fetch Original from Bakong API</span>
            </button>
          )}
        </div>
        <div className="form-group">
          <div className="data-row-header">
            <label className="form-label" htmlFor="input-deeplink">
              Bakong Deeplink
            </label>
            <button
              id="btn-copy-deeplink"
              className="btn-copy"
              onClick={() => copyText(deeplinkUrl, 'Bakong Deeplink')}
            >
              <IconCopy size={12} className="inline mr-1" />
              Copy Link
            </button>
          </div>
          <input
            type="text"
            id="input-deeplink"
            className="form-input font-mono"
            value={deeplinkUrl}
            onChange={(e) => onDeeplinkUrlChange(e.target.value)}
          />
        </div>
      </div>

      {/* Backend SDK Integration Code */}
      <div className="form-section">
        <div className="data-row-header">
          <span className="section-label">
            <IconCode size={13} className="keyline-section-icon" />
            <span>Backend SDK Integration Code</span>
          </span>
          <button
            id="btn-copy-sdk-snippet"
            className="btn-copy"
            onClick={() => copyText(activeSnippet, `${snippetLang.toUpperCase()} Integration Snippet`)}
          >
            <IconCopy size={12} className="inline mr-1" />
            Copy Code
          </button>
        </div>
        <div className="type-switcher" style={{ marginBottom: '8px' }}>
          <button
            className={`type-btn ${snippetLang === 'typescript' ? 'active' : ''}`}
            onClick={() => setSnippetLang('typescript')}
          >
            TypeScript
          </button>
          <button
            className={`type-btn ${snippetLang === 'curl' ? 'active' : ''}`}
            onClick={() => setSnippetLang('curl')}
          >
            cURL
          </button>
          <button
            className={`type-btn ${snippetLang === 'python' ? 'active' : ''}`}
            onClick={() => setSnippetLang('python')}
          >
            Python
          </button>
        </div>
        <div
          id="debug-sdk-snippet"
          className="api-raw-box font-mono text-xs overflow-x-auto whitespace-pre"
          style={{ maxHeight: '180px' }}
        >
          {activeSnippet}
        </div>
      </div>

      {/* Simulation & Sandbox Actions */}
      <div className="form-section">
        <span className="section-label">
          <IconTerminal size={13} className="keyline-section-icon" />
          <span>Simulation & Sandbox Actions</span>
        </span>
        <div className="sandbox-action-grid">
          <button
            id="btn-simulate-payment"
            className="btn-primary-sim"
            onClick={onSimulateSuccess}
          >
            <IconBolt size={16} />
            <span>{t.simulatePay}</span>
          </button>
          <button
            id="btn-regen-bill"
            className="btn-secondary"
            onClick={onRegenerateBill}
          >
            <IconRefresh size={16} />
            <span>{t.regenerateBill}</span>
          </button>
          <button
            id="btn-download-qr"
            className="btn-secondary"
            onClick={onDownloadQR}
          >
            <IconDownload size={16} />
            <span>{t.downloadQr}</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
