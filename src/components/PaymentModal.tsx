'use client';

import React from 'react';
import { TransactionStatusData, Currency } from '@/types';
import { translations } from '@/lib/i18n';
import { IconCheckCircle } from './KeylineIcons';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: TransactionStatusData | null;
  defaultCurrency: Currency;
  defaultBakongAccountId: string;
  defaultBillNumber: string;
  defaultAmount: number;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  transaction,
  defaultCurrency,
  defaultBakongAccountId,
  defaultBillNumber,
  defaultAmount,
}) => {
  if (!isOpen) return null;

  const t = translations.en;
  const currency = (transaction?.currency || defaultCurrency) as Currency;
  const currencySymbol = currency === 'KHR' ? '៛' : '$';
  const amountVal = transaction?.amount || (defaultAmount > 0 ? defaultAmount : 10.0);
  const formattedAmount =
    currency === 'KHR'
      ? Number(amountVal).toLocaleString('en-US')
      : Number(amountVal).toFixed(2);

  const hashStr = transaction?.hash
    ? transaction.hash.slice(0, 16) + '...'
    : '0x' + (transaction?.md5 || 'f7075e6a3d2be36e');

  const dateStr = transaction?.createdDateMs
    ? new Date(transaction.createdDateMs).toLocaleString()
    : new Date().toLocaleString();

  return (
    <div id="success-modal" className={`modal-overlay ${isOpen ? 'active' : ''}`}>
      <div className="modal-card">
        <div className="modal-header-banner">
          <div className="success-check-circle">
            <IconCheckCircle size={44} className="text-emerald-500" strokeWidth={2.5} />
          </div>
          <h2>{t.paymentSuccessTitle}</h2>
          <p>{t.transactionVerified}</p>
        </div>

        <div className="receipt-body">
          <div className="receipt-amount-box">
            <div className="receipt-amount-label">{t.amountPaid}</div>
            <div id="receipt-amount" className="receipt-amount-val">
              {currencySymbol} {formattedAmount}
            </div>
          </div>

          <div className="receipt-details-list">
            <div className="receipt-item">
              <span className="receipt-item-key">
                {t.beneficiaryAccount}
              </span>
              <span id="receipt-receiver" className="receipt-item-val">
                {transaction?.toAccountId || defaultBakongAccountId}
              </span>
            </div>
            <div className="receipt-item">
              <span className="receipt-item-key">
                {t.senderPayer}
              </span>
              <span id="receipt-payer" className="receipt-item-val">
                {transaction?.fromAccountId || 'customer@bakong'}
              </span>
            </div>
            <div className="receipt-item">
              <span className="receipt-item-key">
                {t.billNumber}
              </span>
              <span id="receipt-ref" className="receipt-item-val mono">
                {transaction?.externalRef || defaultBillNumber}
              </span>
            </div>
            <div className="receipt-item">
              <span className="receipt-item-key">
                {t.transactionRef}
              </span>
              <span id="receipt-hash" className="receipt-item-val mono">
                {hashStr}
              </span>
            </div>
            <div className="receipt-item">
              <span className="receipt-item-key">
                {t.time}
              </span>
              <span id="receipt-date" className="receipt-item-val">
                {dateStr}
              </span>
            </div>
          </div>

          <div className="receipt-actions">
            <button
              id="btn-print-receipt"
              className="btn-receipt-print"
              onClick={() => window.print()}
            >
              {t.printReceipt}
            </button>
            <button
              id="btn-close-receipt"
              className="btn-receipt-close"
              onClick={onClose}
            >
              {t.closeBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
