export type Language = 'en';

export interface Translations {
  appName: string;
  verifiedBadge: string;
  sandboxBtn: string;
  individualTag: string;
  merchantTag: string;
  scanToPay: string;
  scanSubtext: string;
  merchantNameLabel: string;
  accountNameLabel: string;
  bakongAccountIdLabel: string;
  merchantIdLabel: string;
  acquiringBankLabel: string;
  paymentAmount: string;
  currency: string;
  openPrice: string;
  fixedAmountTransfer: string;
  billNumber: string;
  qrExpiresIn: string;
  expiredMessage: string;
  payViaBakongApp: string;
  deepLinkHelper: string;
  waitingPayment: string;
  successPayment: string;
  downloadQr: string;
  regenerateBill: string;
  simulatePay: string;
  copiedSuccess: string;
  accountParams: string;
  developerControls: string;
  pollingActive: string;
  pollingPaused: string;
  transactionVerified: string;
  paymentSuccessTitle: string;
  transactionRef: string;
  beneficiaryAccount: string;
  senderPayer: string;
  amountPaid: string;
  time: string;
  printReceipt: string;
  closeBtn: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: 'SHILIAIWEI & NBC Bakong KHQR',
    verifiedBadge: 'NBC Bakong Verified',
    sandboxBtn: 'Sandbox Settings',
    individualTag: 'Individual (Tag 29)',
    merchantTag: 'Merchant (Tag 30)',
    scanToPay: 'Scan to Pay with Bakong App or any Bank App',
    scanSubtext: 'Accepted by all Cambodian banks and financial institutions via KHQR standard',
    merchantNameLabel: 'Merchant Name',
    accountNameLabel: 'Account Name',
    bakongAccountIdLabel: 'Bakong Account ID',
    merchantIdLabel: 'Merchant ID',
    acquiringBankLabel: 'Acquiring Bank',
    paymentAmount: 'Payment Amount',
    currency: 'Currency',
    openPrice: 'Open Price',
    fixedAmountTransfer: 'Fixed amount transfer',
    billNumber: 'Bill Number',
    qrExpiresIn: 'QR will expire in',
    expiredMessage: 'QR Code Expired. Please refresh to regenerate bill.',
    payViaBakongApp: 'Pay via Bakong App',
    deepLinkHelper: 'Tap to open Bakong mobile app directly on your smartphone',
    waitingPayment: 'Waiting for Bakong payment...',
    successPayment: 'Payment received successfully via Bakong!',
    downloadQr: 'Download QR Card',
    regenerateBill: 'New Bill Number',
    simulatePay: 'Simulate Payment Success',
    copiedSuccess: 'Copied to clipboard',
    accountParams: 'Account Parameters',
    developerControls: 'Developer Sandbox Controls',
    pollingActive: 'Real-time WebSocket / Polling Active',
    pollingPaused: 'Polling Paused',
    transactionVerified: 'Transaction verified and settled by NBC Bakong payment switch',
    paymentSuccessTitle: 'Payment Successful!',
    transactionRef: 'Transaction Hash / Ref',
    beneficiaryAccount: 'Beneficiary Account',
    senderPayer: 'Sender / Payer',
    amountPaid: 'Amount Paid',
    time: 'Settlement Time',
    printReceipt: 'Print',
    closeBtn: 'Close Window',
  },
};
