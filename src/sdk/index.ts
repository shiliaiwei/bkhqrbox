/**
 * Soramitsu NBC Bakong KHQR Universal SDK
 * Production-ready, zero-dependency EMVCo generator, parser, validator & Bakong API client
 * Fully compliant with National Bank of Cambodia (NBC) KHQR Technical Specifications
 */

import {
  AccountType,
  Currency,
  IndividualQROptions,
  MerchantQROptions,
  KHQRResult,
  ParsedKHQR,
  KHQRVerificationResult,
  SourceInfo,
  BakongApiResponse,
  TransactionStatusData,
  DeeplinkData,
} from '../types';

import {
  crc16,
  md5,
  emvTag,
  generateIndividualKHQR,
  generateMerchantKHQR,
  generateKHQR,
  parseKHQR,
} from '../lib/khqr';

export const BAKONG_DEFAULT_BASE_URL = 'https://api-bakong.nbc.gov.kh';

/**
 * Universal KHQR SDK Class
 */
export class KHQR {
  /**
   * Generate an Individual Account KHQR (EMVCo Tag 29)
   */
  public static generateIndividual(options: IndividualQROptions): KHQRResult {
    return generateIndividualKHQR(options);
  }

  /**
   * Generate a Corporate Merchant KHQR (EMVCo Tag 30)
   */
  public static generateMerchant(options: MerchantQROptions): KHQRResult {
    return generateMerchantKHQR(options);
  }

  /**
   * Universal KHQR generator supporting both Individual and Merchant types
   */
  public static generate(
    options: IndividualQROptions | MerchantQROptions,
    type: AccountType = 'individual'
  ): KHQRResult {
    return generateKHQR(options, type);
  }

  /**
   * Parse an EMVCo KHQR payload into structured sub-tags and metadata
   */
  public static decode(qrString: string): ParsedKHQR {
    return parseKHQR(qrString);
  }

  /**
   * Alias for decode()
   */
  public static parse(qrString: string): ParsedKHQR {
    return parseKHQR(qrString);
  }

  /**
   * Verify CRC16-CCITT checksum of a KHQR string
   */
  public static verify(qrString: string): KHQRVerificationResult {
    if (!qrString || typeof qrString !== 'string' || qrString.length < 8) {
      return { isValid: false, crc: '', calculatedCrc: '' };
    }
    const cleanStr = qrString.trim();
    const rawWithoutCrc = cleanStr.substring(0, cleanStr.length - 4);
    const expectedCrc = cleanStr.substring(cleanStr.length - 4).toUpperCase();
    const calculatedCrc = crc16(rawWithoutCrc).toUpperCase();

    return {
      isValid: calculatedCrc === expectedCrc,
      crc: expectedCrc,
      calculatedCrc,
    };
  }

  /**
   * Calculate CRC16-CCITT (0x1021, 0xFFFF)
   */
  public static crc16(data: string): string {
    return crc16(data);
  }

  /**
   * Calculate RFC 1321 MD5 hash of string
   */
  public static md5(data: string): string {
    return md5(data);
  }

  /**
   * Generate dynamic short deeplink via Bakong Open API
   */
  public static async generateDeepLink(
    qrString: string,
    token: string,
    sourceInfo?: SourceInfo,
    baseUrl = BAKONG_DEFAULT_BASE_URL
  ): Promise<BakongApiResponse<DeeplinkData>> {
    const payload: { qr: string; sourceInfo?: SourceInfo } = { qr: qrString };
    if (sourceInfo) payload.sourceInfo = sourceInfo;

    const res = await fetch(`${baseUrl}/v1/generate_deeplink_by_qr`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.text();
      return {
        responseCode: -1,
        responseMessage: `HTTP ${res.status}: ${err || res.statusText}`,
        data: null,
      };
    }

    return res.json();
  }

  /**
   * Check transaction status by MD5 hash via Bakong Open API
   */
  public static async checkTransaction(
    md5Hash: string,
    token: string,
    baseUrl = BAKONG_DEFAULT_BASE_URL
  ): Promise<BakongApiResponse<TransactionStatusData>> {
    const res = await fetch(`${baseUrl}/v1/check_transaction_by_md5`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ md5: md5Hash }),
    });

    if (!res.ok) {
      const err = await res.text();
      return {
        responseCode: -1,
        responseMessage: `HTTP ${res.status}: ${err || res.statusText}`,
        data: null,
      };
    }

    return res.json();
  }

  /**
   * Check if a Bakong account exists via Bakong Open API
   */
  public static async checkBakongAccount(
    accountId: string,
    token: string,
    baseUrl = BAKONG_DEFAULT_BASE_URL
  ): Promise<BakongApiResponse<{ exists?: boolean; accountId?: string }>> {
    const res = await fetch(`${baseUrl}/v1/check_bakong_account`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ accountId }),
    });

    if (!res.ok) {
      const err = await res.text();
      return {
        responseCode: -1,
        responseMessage: `HTTP ${res.status}: ${err || res.statusText}`,
        data: null,
      };
    }

    return res.json();
  }

  /**
   * Helper to generate copy-paste ready developer code snippets
   */
  public static generateCodeSnippet(
    language: 'typescript' | 'curl' | 'python',
    params: {
      accountType?: AccountType;
      bakongAccountId?: string;
      merchantName?: string;
      merchantId?: string;
      acquiringBank?: string;
      currency?: Currency;
      amount?: number;
      billNumber?: string | null;
      token?: string;
    }
  ): string {
    const accType = params.accountType || 'individual';
    const accId = params.bakongAccountId || 'shiliaiwei@bkrt';
    const name = params.merchantName || 'SHI LIAIWEI';
    const curr = params.currency || 'USD';
    const amt = params.amount || 0;
    const bill = params.billNumber ? `'${params.billNumber}'` : 'null';

    if (language === 'typescript') {
      return `import { KHQR } from 'aba-khqr-sandbox/sdk';

// 1. Generate ${accType === 'merchant' ? 'Corporate Merchant' : 'Individual'} KHQR
const qr = KHQR.${accType === 'merchant' ? 'generateMerchant' : 'generateIndividual'}({
  bakongAccountId: '${accId}',
  merchantName: '${name}',
${accType === 'merchant' ? `  merchantId: '${params.merchantId || '000001'}',\n  acquiringBank: '${params.acquiringBank || 'Bakong Bank'}',\n` : ''}  currency: '${curr}',
  amount: ${amt},
  billNumber: ${bill},
});

console.log('KHQR EMVCo Payload:', qr.qrString);
console.log('Transaction MD5 Hash:', qr.md5);

// 2. Verify Checksum
const verify = KHQR.verify(qr.qrString);
console.log('Is Valid CRC:', verify.isValid);
`;
    }

    if (language === 'curl') {
      return `# Check Transaction by MD5
curl -X POST https://api-bakong.nbc.gov.kh/v1/check_transaction_by_md5 \\
  -H "Authorization: Bearer \${BAKONG_TOKEN}" \\
  -H "Content-Type: application/json" \\
  -d '{"md5": "REPLACE_WITH_QR_MD5"}'

# Verify Account Existence
curl -X POST https://api-bakong.nbc.gov.kh/v1/check_bakong_account \\
  -H "Authorization: Bearer \${BAKONG_TOKEN}" \\
  -H "Content-Type: application/json" \\
  -d '{"accountId": "${accId}"}'
`;
    }

    return `import requests

# 1. Check Bakong Transaction Status
def check_transaction(md5_hash, token):
    url = "https://api-bakong.nbc.gov.kh/v1/check_transaction_by_md5"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    response = requests.post(url, json={"md5": md5_hash}, headers=headers)
    return response.json()

# Example usage
# res = check_transaction("REPLACE_WITH_QR_MD5", "YOUR_BAKONG_TOKEN")
# print(res)
`;
  }
}

// Direct functional exports for tree shaking
export {
  crc16,
  md5,
  emvTag,
  generateIndividualKHQR,
  generateMerchantKHQR,
  generateKHQR,
  parseKHQR,
};

// Re-export all types
export * from '../types';
