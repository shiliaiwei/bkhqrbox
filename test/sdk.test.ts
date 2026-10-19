import { describe, it, expect } from 'vitest';
import { KHQR } from '../src/sdk';

describe('Soramitsu NBC Bakong KHQR Universal SDK Suite', () => {
  describe('KHQR Core Engine', () => {
    it('should generate valid individual KHQR via SDK static method', () => {
      const res = KHQR.generateIndividual({
        bakongAccountId: 'developer@bkrt',
        merchantName: 'DEV EXPERT',
        currency: 'USD',
        amount: 25.5,
        billNumber: 'INV-SDK-001',
      });

      expect(res.isDynamic).toBe(true);
      expect(res.amount).toBe(25.5);
      expect(res.currency).toBe('USD');
      expect(res.currencyCode).toBe('840');
      expect(res.qrString).toContain('developer@bkrt');

      const verification = KHQR.verify(res.qrString);
      expect(verification.isValid).toBe(true);
      expect(verification.crc).toBe(res.crc);
    });

    it('should generate valid corporate merchant KHQR via SDK static method', () => {
      const res = KHQR.generateMerchant({
        bakongAccountId: 'merchant@bkrt',
        merchantName: 'SUPER STORE',
        merchantId: 'M-998877',
        acquiringBank: 'Canadia Bank',
        currency: 'KHR',
        amount: 100000,
        billNumber: 'BILL-889',
      });

      expect(res.type).toBe('merchant');
      expect(res.amount).toBe(100000);
      expect(res.currency).toBe('KHR');
      expect(res.currencyCode).toBe('116');
      expect(res.qrString).toContain('30'); // Tag 30

      const decoded = KHQR.decode(res.qrString);
      expect(decoded.isValid).toBe(true);
      expect(decoded.merchantId).toBe('M-998877');
      expect(decoded.acquiringBank).toBe('Canadia Bank');
      expect(decoded.merchantName).toBe('SUPER STORE');
    });

    it('should fail verification for corrupted QR string', () => {
      const res = KHQR.generateIndividual({
        bakongAccountId: 'test@bkrt',
        merchantName: 'TEST USER',
        currency: 'USD',
      });

      // Tamper with payload
      const tampered = res.qrString.slice(0, -6) + '9999';
      const check = KHQR.verify(tampered);
      expect(check.isValid).toBe(false);
    });
  });

  describe('SDK Code Snippet Generator', () => {
    it('should generate valid TypeScript integration snippet', () => {
      const snippet = KHQR.generateCodeSnippet('typescript', {
        accountType: 'individual',
        bakongAccountId: 'shiliaiwei@bkrt',
        merchantName: 'SHI LIAIWEI',
        currency: 'USD',
        amount: 10,
        billNumber: 'INV-123456',
      });

      expect(snippet).toContain("import { KHQR } from 'aba-khqr-sandbox/sdk'");
      expect(snippet).toContain('KHQR.generateIndividual');
      expect(snippet).toContain('shiliaiwei@bkrt');
      expect(snippet).toContain('KHQR.verify');
    });

    it('should generate valid cURL snippet', () => {
      const curlSnippet = KHQR.generateCodeSnippet('curl', {
        bakongAccountId: 'shiliaiwei@bkrt',
      });

      expect(curlSnippet).toContain('curl -X POST https://api-bakong.nbc.gov.kh/v1/check_transaction_by_md5');
      expect(curlSnippet).toContain('shiliaiwei@bkrt');
    });

    it('should generate valid Python snippet', () => {
      const pySnippet = KHQR.generateCodeSnippet('python', {});
      expect(pySnippet).toContain('import requests');
      expect(pySnippet).toContain('check_transaction');
    });
  });
});
