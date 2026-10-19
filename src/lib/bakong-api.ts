import { BakongApiResponse, TransactionStatusData, DeeplinkData } from '@/types';

export const DEFAULT_BAKONG_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNDBjNTQ4YzBmZjVhNDc3OSJ9LCJpYXQiOjE3OTE1NTY0ODcsImV4cCI6MTc5OTMzMjQ4N30.7VyG-fdjwn16FGLPjaKopfD37nWALa5WVvymRGkNOM0';

export const BAKONG_BASE_URL = 'https://api-bakong.nbc.gov.kh';

/**
 * Check transaction status by MD5 hash
 */
export async function checkTransactionByMd5(
  md5: string,
  token?: string
): Promise<BakongApiResponse<TransactionStatusData>> {
  const res = await fetch('/api/check-transaction', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      md5,
      token: token || DEFAULT_BAKONG_TOKEN,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    return {
      responseCode: -1,
      responseMessage: `HTTP ${res.status}: ${errorText || res.statusText}`,
      data: null,
    };
  }

  return res.json();
}

/**
 * Generate dynamic short deeplink via Bakong Open API
 */
export async function generateDeeplinkByQr(
  qr: string,
  token?: string,
  sourceInfo?: { appIconUrl?: string; appName?: string; appDeepLinkCallback?: string }
): Promise<BakongApiResponse<DeeplinkData>> {
  const res = await fetch('/api/generate-deeplink', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      qr,
      token: token || DEFAULT_BAKONG_TOKEN,
      sourceInfo,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    return {
      responseCode: -1,
      responseMessage: `HTTP ${res.status}: ${errorText || res.statusText}`,
      data: null,
    };
  }

  return res.json();
}

/**
 * Check if a Bakong account exists
 */
export async function checkBakongAccount(
  accountId: string,
  token?: string
): Promise<BakongApiResponse<{ exists?: boolean; accountId?: string }>> {
  const res = await fetch('/api/check-account', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      accountId,
      token: token || DEFAULT_BAKONG_TOKEN,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    return {
      responseCode: -1,
      responseMessage: `HTTP ${res.status}: ${errorText || res.statusText}`,
      data: null,
    };
  }

  return res.json();
}

/**
 * Fetch original KHQR generated via official Bakong SDK & validated with Bakong API token
 */
export async function fetchOriginalBakongKHQR(
  params: {
    accountType?: 'individual' | 'merchant';
    bakongAccountId?: string;
    merchantName?: string;
    merchantCity?: string;
    merchantId?: string;
    acquiringBank?: string;
    currency?: string;
    amount?: number;
    billNumber?: string | null;
  },
  token?: string
): Promise<BakongApiResponse<{
  qr: string;
  md5: string;
  deeplink: string | null;
  accountData?: Record<string, unknown> | null;
}>> {
  const res = await fetch('/api/generate-khqr', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...params,
      token: token || DEFAULT_BAKONG_TOKEN,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    return {
      responseCode: -1,
      responseMessage: `HTTP ${res.status}: ${errorText || res.statusText}`,
      data: null,
    };
  }

  return res.json();
}
