export type AccountType = 'individual' | 'merchant';
export type Currency = 'USD' | 'KHR';

export interface BaseQROptions {
  bakongAccountId: string;
  merchantName: string;
  merchantCity?: string;
  currency: Currency;
  amount?: number;
  billNumber?: string | null;
  mobileNumber?: string;
  storeLabel?: string;
  terminalLabel?: string;
  purposeOfTransaction?: string;
  expirationTimestamp?: number;
  merchantCategoryCode?: string;
}

export interface IndividualQROptions extends BaseQROptions {
  accountNo?: string;
  acquiringBank?: string;
}

export interface MerchantQROptions extends BaseQROptions {
  merchantId: string;
  acquiringBank: string;
  merchantCategoryCode?: string;
}

export interface KHQRResult {
  qrString: string;
  md5: string;
  crc: string;
  isDynamic: boolean;
  type: AccountType;
  bakongAccountId: string;
  merchantName: string;
  merchantCity: string;
  currency: Currency;
  currencyCode: string;
  amount: number;
  formattedAmount: string;
  billNumber?: string | null;
  merchantId?: string;
  acquiringBank?: string;
}

export interface ParsedKHQR {
  isValid: boolean;
  calculatedCrc: string;
  crc: string;
  md5: string;
  pointOfInitiation?: string;
  isDynamic: boolean;
  type: AccountType;
  bakongAccountId: string | null;
  accountNo?: string | null;
  merchantId?: string | null;
  acquiringBank?: string | null;
  merchantName: string | null;
  merchantCity: string | null;
  currency: Currency | string;
  currencyCode: string | null;
  amount: number;
  billNumber?: string | null;
  tags: Record<string, string>;
}

export interface BakongApiResponse<T = unknown> {
  responseCode: number;
  responseMessage: string;
  errorCode?: number;
  data: T | null;
}

export interface TransactionStatusData {
  hash?: string;
  fromAccountId?: string;
  toAccountId?: string;
  currency?: string;
  amount?: number;
  description?: string;
  createdDateMs?: number;
  externalRef?: string;
  [key: string]: unknown;
}

export interface DeeplinkData {
  shortLink?: string;
  [key: string]: unknown;
}

export interface SourceInfo {
  appIconUrl?: string;
  appName?: string;
  appDeepLinkCallback?: string;
}

export interface KHQRVerificationResult {
  isValid: boolean;
  crc: string;
  calculatedCrc: string;
}

export * from './assets';
