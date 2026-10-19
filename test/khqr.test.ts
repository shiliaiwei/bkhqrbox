import { describe, it, expect } from 'vitest';
import {
  crc16,
  md5,
  emvTag,
  generateIndividualKHQR,
  generateMerchantKHQR,
  generateKHQR,
  parseKHQR,
} from '../src/lib/khqr';
import { BakongKHQR } from 'bakong-khqr';

describe('KHQR EMVCo & Bakong Standards Suite', () => {
  describe('CRC16-CCITT & MD5 Verification', () => {
    it('should correctly calculate CRC16-CCITT checksum', () => {
      // Standard CRC-16/CCITT-FALSE vector: "123456789" -> 0x29B1
      const testStr = '123456789';
      expect(crc16(testStr)).toBe('29B1');
    });

    it('should correctly calculate MD5 hash', () => {
      expect(md5('')).toBe('d41d8cd98f00b204e9800998ecf8427e');
      expect(md5('hello world')).toBe('5eb63bbbe01eeed093cb22bb8f5acdc3');
      expect(md5('SHILIAIWEI')).toBe('1866247bef88b7e022848a0f654484ca');
    });

    it('should format EMVCo TLV tags with padded 2-digit length', () => {
      expect(emvTag(0, '01')).toBe('000201');
      expect(emvTag(58, 'KH')).toBe('5802KH');
      expect(emvTag(59, 'SHI LIAIWEI')).toBe('5911SHI LIAIWEI');
      expect(emvTag(54, '')).toBe('');
      expect(emvTag(54, null)).toBe('');
    });
  });

  describe('Individual KHQR Generation (Tag 29)', () => {
    it('should generate valid Open / Static Individual KHQR (Amount = 0)', () => {
      const res = generateIndividualKHQR({
        bakongAccountId: 'shiliaiwei@bkrt',
        merchantName: 'SHI LIAIWEI',
        merchantCity: 'Phnom Penh',
        currency: 'USD',
        amount: 0,
      });

      expect(res.isDynamic).toBe(false);
      expect(res.currency).toBe('USD');
      expect(res.currencyCode).toBe('840');
      expect(res.amount).toBe(0);
      expect(res.qrString).toContain('010211'); // Tag 01, Len 02, Val 11 (Static)
      expect(res.qrString).toContain('29'); // Tag 29 for Individual
      expect(res.qrString).toContain('shiliaiwei@bkrt');
      expect(res.qrString).toContain('5911SHI LIAIWEI');
      expect(res.qrString).toContain('6010Phnom Penh');
      expect(res.crc).toHaveLength(4);
      expect(res.md5).toHaveLength(32);

      // Verify CRC validity with BakongKHQR
      const verified = BakongKHQR.verify(res.qrString);
      expect(verified.isValid).toBe(true);
    });

    it('should generate valid Dynamic Individual KHQR with Amount & Bill Number', () => {
      const res = generateIndividualKHQR({
        bakongAccountId: 'shiliaiwei@bkrt',
        merchantName: 'SHI LIAIWEI',
        merchantCity: 'Phnom Penh',
        currency: 'USD',
        amount: 10.5,
        billNumber: 'INV-123456',
      });

      expect(res.isDynamic).toBe(true);
      expect(res.amount).toBe(10.5);
      expect(res.formattedAmount).toBe('10.50');
      expect(res.qrString).toContain('010212'); // Tag 01, Len 02, Val 12 (Dynamic)
      expect(res.qrString).toContain('540510.50'); // Tag 54, Len 05, Val 10.50
      expect(res.qrString).toContain('INV-123456');

      const verified = BakongKHQR.verify(res.qrString);
      expect(verified.isValid).toBe(true);
    });

    it('should format KHR currency with code 116 and integer rounding', () => {
      const res = generateIndividualKHQR({
        bakongAccountId: 'shiliaiwei@bkrt',
        merchantName: 'SHI LIAIWEI',
        merchantCity: 'Phnom Penh',
        currency: 'KHR',
        amount: 4000,
      });

      expect(res.currency).toBe('KHR');
      expect(res.currencyCode).toBe('116');
      expect(res.formattedAmount).toBe('4000');
      expect(res.qrString).toContain('5303116');
      expect(res.qrString).toContain('54044000');

      const verified = BakongKHQR.verify(res.qrString);
      expect(verified.isValid).toBe(true);
    });
  });

  describe('Merchant KHQR Generation (Tag 30)', () => {
    it('should generate valid Merchant KHQR with Tag 30, Merchant ID and Acquiring Bank', () => {
      const res = generateMerchantKHQR({
        bakongAccountId: 'shiliaiwei@bkrt',
        merchantName: 'SHI LIAIWEI STORE',
        merchantCity: 'Phnom Penh',
        merchantId: 'MERC001',
        acquiringBank: 'Bakong Bank',
        currency: 'USD',
        amount: 25.0,
        billNumber: 'BILL-999',
      });

      expect(res.type).toBe('merchant');
      expect(res.merchantId).toBe('MERC001');
      expect(res.acquiringBank).toBe('Bakong Bank');
      expect(res.qrString).toContain('30'); // Tag 30 for Merchant
      expect(res.qrString).toContain('MERC001');
      expect(res.qrString).toContain('Bakong Bank');

      const parsed = parseKHQR(res.qrString);
      expect(parsed.isValid).toBe(true);
      expect(parsed.type).toBe('merchant');
      expect(parsed.merchantId).toBe('MERC001');
      expect(parsed.acquiringBank).toBe('Bakong Bank');
      expect(parsed.amount).toBe(25.0);
    });
  });

  describe('KHQR Parsing & Verification', () => {
    it('should parse generated KHQR string and extract all EMVCo sub-tags correctly', () => {
      const original = generateKHQR(
        {
          bakongAccountId: 'test@bkrt',
          merchantName: 'TEST MERCHANT',
          merchantCity: 'Siem Reap',
          currency: 'USD',
          amount: 5.0,
          billNumber: 'REC-001',
        },
        'individual'
      );

      const parsed = parseKHQR(original.qrString);
      expect(parsed.isValid).toBe(true);
      expect(parsed.isDynamic).toBe(true);
      expect(parsed.bakongAccountId).toBe('test@bkrt');
      expect(parsed.merchantName).toBe('TEST MERCHANT');
      expect(parsed.merchantCity).toBe('Siem Reap');
      expect(parsed.currency).toBe('USD');
      expect(parsed.amount).toBe(5.0);
      expect(parsed.billNumber).toBe('REC-001');
      expect(parsed.md5).toBe(original.md5);
    });

    it('should detect invalid CRC checksum when QR string is corrupted', () => {
      const original = generateIndividualKHQR({
        bakongAccountId: 'shiliaiwei@bkrt',
        merchantName: 'SHI LIAIWEI',
        currency: 'USD',
        amount: 0,
      });

      // Corrupt the last character
      const corrupted = original.qrString.slice(0, -1) + (original.qrString.slice(-1) === 'A' ? 'B' : 'A');
      const parsed = parseKHQR(corrupted);
      expect(parsed.isValid).toBe(false);
    });
  });
});
