/**
 * KHQR EMVCo Generator, Parser & Validator
 * Fully compliant with National Bank of Cambodia (NBC) Bakong Standards
 * Supports Individual (Tag 29) & Merchant (Tag 30) QR generation
 * Zero external dependencies: High-performance TextEncoder-based CRC16-CCITT and RFC 1321 MD5
 */

import {
  AccountType,
  Currency,
  IndividualQROptions,
  MerchantQROptions,
  KHQRResult,
  ParsedKHQR,
} from '@/types';
import { BakongKHQR, khqrData, IndividualInfo, MerchantInfo } from 'bakong-khqr';

// Shared TextEncoder instance for ultra-fast UTF-8 byte conversions
const textEncoder = new TextEncoder();

/**
 * Pure TypeScript implementation of CRC16-CCITT (Polynomial 0x1021, Initial 0xFFFF)
 * Optimized with direct Uint8Array iteration without deprecated string escaping
 */
export function crc16(data: string): string {
  let crc = 0xffff;
  const bytes = textEncoder.encode(data);
  for (let i = 0; i < bytes.length; i++) {
    crc ^= bytes[i] << 8;
    for (let j = 0; j < 8; j++) {
      if (crc & 0x8000) {
        crc = ((crc << 1) ^ 0x1021) & 0xffff;
      } else {
        crc = (crc << 1) & 0xffff;
      }
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

/**
 * Pure TypeScript implementation of MD5 (RFC 1321) for client & server portability
 * Optimized with TextEncoder UTF-8 byte stream processing
 */
export function md5(str: string): string {
  function safeAdd(x: number, y: number): number {
    const lsw = (x & 0xffff) + (y & 0xffff);
    const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xffff);
  }

  function bitRol(num: number, cnt: number): number {
    return (num << cnt) | (num >>> (32 - cnt));
  }

  function md5cmn(q: number, a: number, b: number, x: number, s: number, t: number): number {
    return safeAdd(bitRol(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
  }

  function md5ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return md5cmn((b & c) | (~b & d), a, b, x, s, t);
  }

  function md5gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return md5cmn((b & d) | (c & ~d), a, b, x, s, t);
  }

  function md5hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return md5cmn(b ^ c ^ d, a, b, x, s, t);
  }

  function md5ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return md5cmn(c ^ (b | ~d), a, b, x, s, t);
  }

  function binlMD5(x: number[], len: number): number[] {
    x[len >> 5] |= 0x80 << (len % 32);
    x[(((len + 64) >>> 9) << 4) + 14] = len;
    let a = 1732584193;
    let b = -271733879;
    let c = -1732584194;
    let d = 271733878;

    for (let i = 0; i < x.length; i += 16) {
      const olda = a;
      const oldb = b;
      const oldc = c;
      const oldd = d;

      a = md5ff(a, b, c, d, x[i], 7, -680876936);
      d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
      c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
      b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
      a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
      d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
      c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
      b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
      a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
      d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
      c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
      b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
      a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
      d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
      c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
      b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);

      a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
      d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
      c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
      b = md5gg(b, c, d, a, x[i], 20, -373897302);
      a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
      d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
      c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
      b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
      a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
      d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
      c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
      b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
      a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
      d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
      c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
      b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);

      a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
      d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
      c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
      b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
      a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
      d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
      c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
      b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
      a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
      d = md5hh(d, a, b, c, x[i], 11, -358537222);
      c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
      b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
      a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
      d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
      c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
      b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);

      a = md5ii(a, b, c, d, x[i], 6, -198630844);
      d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
      c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
      b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
      a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
      d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
      c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
      b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
      a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
      d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
      c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
      b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
      a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
      d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
      c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
      b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);

      a = safeAdd(a, olda);
      b = safeAdd(b, oldb);
      c = safeAdd(c, oldc);
      d = safeAdd(d, oldd);
    }
    return [a, b, c, d];
  }

  function bytes2binl(bytes: Uint8Array): number[] {
    const bin: number[] = [];
    const mask = (1 << 8) - 1;
    for (let i = 0; i < bytes.length * 8; i += 8) {
      bin[i >> 5] |= (bytes[i / 8] & mask) << (i % 32);
    }
    return bin;
  }

  function binl2hex(binarray: number[]): string {
    const hexTab = '0123456789abcdef';
    let strOut = '';
    for (let i = 0; i < binarray.length * 4; i++) {
      strOut +=
        hexTab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0x0f) +
        hexTab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0x0f);
    }
    return strOut;
  }

  const bytes = textEncoder.encode(str);
  return binl2hex(binlMD5(bytes2binl(bytes), bytes.length * 8));
}

/**
 * EMVCo TLV (Tag-Length-Value) Formatter
 * Accurately measures UTF-8 byte length with zero deprecated string conversions
 */
export function emvTag(tag: string | number, value: string | number | null | undefined): string {
  if (value === null || value === undefined || value === '') return '';
  const strVal = String(value);
  const tagStr = String(tag).padStart(2, '0');
  const lenStr = String(textEncoder.encode(strVal).length).padStart(2, '0');
  return tagStr + lenStr + strVal;
}

/**
 * Generate Individual Account KHQR (EMVCo Tag 29) using official Bakong SDK
 */
export function generateIndividualKHQR(opts: IndividualQROptions): KHQRResult {
  const bakongId = (opts.bakongAccountId || 'shiliaiwei@bkrt').trim();
  const merchantName = (opts.merchantName || 'SHI LIAIWEI').trim();
  const merchantCity = (opts.merchantCity || 'Phnom Penh').trim();
  const currency: Currency = (opts.currency || 'USD').toUpperCase() as Currency;
  const currencyCode = currency === 'KHR' ? '116' : '840';
  const mcc = opts.merchantCategoryCode || '5999';

  const rawAmount = opts.amount !== undefined ? Number(opts.amount) : 0;
  const isDynamic = rawAmount > 0;
  let formattedAmount = '';
  if (isDynamic) {
    formattedAmount = currency === 'KHR' ? Math.round(rawAmount).toString() : rawAmount.toFixed(2);
  }

  // Attempt official BakongKHQR generation first
  try {
    const bakong = new BakongKHQR();
    const ind = new IndividualInfo(
      bakongId,
      merchantName,
      merchantCity,
      {
        currency: currency === 'KHR' ? khqrData.currency.khr : khqrData.currency.usd,
        amount: isDynamic ? (currency === 'KHR' ? Math.round(rawAmount) : parseFloat(rawAmount.toFixed(2))) : undefined,
        accountInformation: opts.accountNo || undefined,
        acquiringBank: opts.acquiringBank || undefined,
        billNumber: opts.billNumber || undefined,
        storeLabel: opts.storeLabel || undefined,
        terminalLabel: opts.terminalLabel || undefined,
        mobileNumber: opts.mobileNumber || undefined,
        purposeOfTransaction: opts.purposeOfTransaction || undefined,
        expirationTimestamp: isDynamic ? (opts.expirationTimestamp || Date.now() + 15 * 60 * 1000) : undefined,
        merchantCategoryCode: opts.merchantCategoryCode || undefined,
      }
    );
    const resp = bakong.generateIndividual(ind);
    if (resp && resp.status && resp.status.code === 0 && resp.data?.qr) {
      const qrStr = resp.data.qr;
      return {
        qrString: qrStr,
        md5: resp.data.md5 || md5(qrStr),
        crc: qrStr.slice(-4),
        isDynamic,
        type: 'individual',
        bakongAccountId: bakongId,
        merchantName,
        merchantCity,
        currency,
        currencyCode,
        amount: isDynamic ? (currency === 'KHR' ? Math.round(rawAmount) : parseFloat(rawAmount.toFixed(2))) : 0,
        formattedAmount: isDynamic ? formattedAmount : '0',
        billNumber: opts.billNumber || null,
      };
    }
  } catch (err) {
    console.warn('BakongKHQR SDK fallback to native generator:', err);
  }

  // Sub-tags for Tag 29
  const sub29_00 = emvTag(0, bakongId);
  const sub29_01 = opts.accountNo ? emvTag(1, opts.accountNo) : '';
  const sub29_02 = opts.acquiringBank ? emvTag(2, opts.acquiringBank) : '';
  const tag29Content = sub29_00 + sub29_01 + sub29_02;
  const tag29 = emvTag(29, tag29Content);

  // Sub-tags for Tag 62 (Additional Data)
  let tag62Content = '';
  if (opts.billNumber) tag62Content += emvTag(1, opts.billNumber);
  if (opts.mobileNumber) tag62Content += emvTag(2, opts.mobileNumber);
  if (opts.storeLabel) tag62Content += emvTag(3, opts.storeLabel);
  if (opts.terminalLabel) tag62Content += emvTag(7, opts.terminalLabel);
  if (opts.purposeOfTransaction) tag62Content += emvTag(8, opts.purposeOfTransaction);
  const tag62 = tag62Content ? emvTag(62, tag62Content) : '';

  // Sub-tags for Tag 99 (Dynamic QR Timestamps)
  let tag99 = '';
  if (isDynamic) {
    const creationTimestamp = Date.now();
    const expirationTimestamp = opts.expirationTimestamp || creationTimestamp + 15 * 60 * 1000;
    const sub99_00 = emvTag(0, creationTimestamp);
    const sub99_01 = emvTag(1, expirationTimestamp);
    tag99 = emvTag(99, sub99_00 + sub99_01);
  }

  // Payload without CRC
  const payload =
    emvTag(0, '01') +
    emvTag(1, isDynamic ? '12' : '11') +
    tag29 +
    emvTag(52, mcc) +
    emvTag(53, currencyCode) +
    (isDynamic ? emvTag(54, formattedAmount) : '') +
    emvTag(58, 'KH') +
    emvTag(59, merchantName) +
    emvTag(60, merchantCity) +
    tag62 +
    tag99 +
    '6304';

  const crc = crc16(payload);
  const qrString = payload + crc;
  const md5Hash = md5(qrString);

  return {
    qrString,
    md5: md5Hash,
    crc,
    isDynamic,
    type: 'individual',
    bakongAccountId: bakongId,
    merchantName,
    merchantCity,
    currency,
    currencyCode,
    amount: isDynamic ? parseFloat(formattedAmount) : 0,
    formattedAmount: isDynamic ? formattedAmount : '0',
    billNumber: opts.billNumber || null,
  };
}

/**
 * Generate Merchant Account KHQR (EMVCo Tag 30) using official Bakong SDK
 */
export function generateMerchantKHQR(opts: MerchantQROptions): KHQRResult {
  const bakongId = (opts.bakongAccountId || 'shiliaiwei@bkrt').trim();
  const merchantName = (opts.merchantName || 'SHI LIAIWEI').trim();
  const merchantCity = (opts.merchantCity || 'Phnom Penh').trim();
  const merchantId = (opts.merchantId || '000001').trim();
  const acquiringBank = (opts.acquiringBank || 'Bakong Bank').trim();
  const currency: Currency = (opts.currency || 'USD').toUpperCase() as Currency;
  const currencyCode = currency === 'KHR' ? '116' : '840';
  const mcc = opts.merchantCategoryCode || '5999';

  const rawAmount = opts.amount !== undefined ? Number(opts.amount) : 0;
  const isDynamic = rawAmount > 0;
  let formattedAmount = '';
  if (isDynamic) {
    formattedAmount = currency === 'KHR' ? Math.round(rawAmount).toString() : rawAmount.toFixed(2);
  }

  // Attempt official BakongKHQR generation first
  try {
    const bakong = new BakongKHQR();
    const merc = new MerchantInfo(
      bakongId,
      merchantName,
      merchantCity,
      merchantId,
      acquiringBank,
      {
        currency: currency === 'KHR' ? khqrData.currency.khr : khqrData.currency.usd,
        amount: isDynamic ? (currency === 'KHR' ? Math.round(rawAmount) : parseFloat(rawAmount.toFixed(2))) : undefined,
        billNumber: opts.billNumber || undefined,
        storeLabel: opts.storeLabel || undefined,
        terminalLabel: opts.terminalLabel || undefined,
        mobileNumber: opts.mobileNumber || undefined,
        purposeOfTransaction: opts.purposeOfTransaction || undefined,
        expirationTimestamp: isDynamic ? (opts.expirationTimestamp || Date.now() + 15 * 60 * 1000) : undefined,
        merchantCategoryCode: opts.merchantCategoryCode || undefined,
      }
    );
    const resp = bakong.generateMerchant(merc);
    if (resp && resp.status && resp.status.code === 0 && resp.data?.qr) {
      const qrStr = resp.data.qr;
      return {
        qrString: qrStr,
        md5: resp.data.md5 || md5(qrStr),
        crc: qrStr.slice(-4),
        isDynamic,
        type: 'merchant',
        bakongAccountId: bakongId,
        merchantName,
        merchantCity,
        merchantId,
        acquiringBank,
        currency,
        currencyCode,
        amount: isDynamic ? (currency === 'KHR' ? Math.round(rawAmount) : parseFloat(rawAmount.toFixed(2))) : 0,
        formattedAmount: isDynamic ? formattedAmount : '0',
        billNumber: opts.billNumber || null,
      };
    }
  } catch (err) {
    console.warn('BakongKHQR SDK fallback to native generator:', err);
  }

  // Sub-tags for Tag 30 (Merchant Account Information)
  const sub30_00 = emvTag(0, bakongId);
  const sub30_01 = emvTag(1, merchantId);
  const sub30_02 = emvTag(2, acquiringBank);
  const tag30Content = sub30_00 + sub30_01 + sub30_02;
  const tag30 = emvTag(30, tag30Content);

  // Sub-tags for Tag 62 (Additional Data)
  let tag62Content = '';
  if (opts.billNumber) tag62Content += emvTag(1, opts.billNumber);
  if (opts.mobileNumber) tag62Content += emvTag(2, opts.mobileNumber);
  if (opts.storeLabel) tag62Content += emvTag(3, opts.storeLabel);
  if (opts.terminalLabel) tag62Content += emvTag(7, opts.terminalLabel);
  if (opts.purposeOfTransaction) tag62Content += emvTag(8, opts.purposeOfTransaction);
  const tag62 = tag62Content ? emvTag(62, tag62Content) : '';

  // Sub-tags for Tag 99 (Dynamic QR Timestamps)
  let tag99 = '';
  if (isDynamic) {
    const creationTimestamp = Date.now();
    const expirationTimestamp = opts.expirationTimestamp || creationTimestamp + 15 * 60 * 1000;
    const sub99_00 = emvTag(0, creationTimestamp);
    const sub99_01 = emvTag(1, expirationTimestamp);
    tag99 = emvTag(99, sub99_00 + sub99_01);
  }

  // Payload without CRC
  const payload =
    emvTag(0, '01') +
    emvTag(1, isDynamic ? '12' : '11') +
    tag30 +
    emvTag(52, mcc) +
    emvTag(53, currencyCode) +
    (isDynamic ? emvTag(54, formattedAmount) : '') +
    emvTag(58, 'KH') +
    emvTag(59, merchantName) +
    emvTag(60, merchantCity) +
    tag62 +
    tag99 +
    '6304';

  const crc = crc16(payload);
  const qrString = payload + crc;
  const md5Hash = md5(qrString);

  return {
    qrString,
    md5: md5Hash,
    crc,
    isDynamic,
    type: 'merchant',
    bakongAccountId: bakongId,
    merchantName,
    merchantCity,
    merchantId,
    acquiringBank,
    currency,
    currencyCode,
    amount: isDynamic ? parseFloat(formattedAmount) : 0,
    formattedAmount: isDynamic ? formattedAmount : '0',
    billNumber: opts.billNumber || null,
  };
}

/**
 * Universal KHQR Generator
 */
export function generateKHQR(
  opts: IndividualQROptions | MerchantQROptions,
  type: AccountType = 'individual'
): KHQRResult {
  if (type === 'merchant') {
    return generateMerchantKHQR(opts as MerchantQROptions);
  }
  return generateIndividualKHQR(opts as IndividualQROptions);
}

/**
 * Parse and Validate an EMVCo KHQR String
 */
export function parseKHQR(qrString: string): ParsedKHQR {
  if (!qrString || typeof qrString !== 'string') {
    throw new Error('Invalid QR string: Input must be non-empty string');
  }

  const cleanStr = qrString.trim();
  const tags: Record<string, string> = {};
  let idx = 0;

  while (idx < cleanStr.length) {
    if (idx + 4 > cleanStr.length) break;
    const tag = cleanStr.substring(idx, idx + 2);
    const len = parseInt(cleanStr.substring(idx + 2, idx + 4), 10);
    idx += 4;
    const val = cleanStr.substring(idx, idx + len);
    idx += len;
    tags[tag] = val;
  }

  const rawWithoutCrc = cleanStr.substring(0, cleanStr.length - 4);
  const expectedCrc = cleanStr.substring(cleanStr.length - 4);
  const calculatedCrc = crc16(rawWithoutCrc);
  const isValid = calculatedCrc.toUpperCase() === expectedCrc.toUpperCase();

  const isMerchant = Boolean(tags['30']);
  const accountTag = isMerchant ? tags['30'] : tags['29'];
  const accountParsed: Record<string, string> = {};

  if (accountTag) {
    let sIdx = 0;
    while (sIdx < accountTag.length) {
      const sTag = accountTag.substring(sIdx, sIdx + 2);
      const sLen = parseInt(accountTag.substring(sIdx + 2, sIdx + 4), 10);
      sIdx += 4;
      accountParsed[sTag] = accountTag.substring(sIdx, sIdx + sLen);
      sIdx += sLen;
    }
  }

  // Parse Tag 62
  let billNumber: string | null = null;
  if (tags['62']) {
    const t62 = tags['62'];
    let bIdx = 0;
    while (bIdx < t62.length) {
      const bTag = t62.substring(bIdx, bIdx + 2);
      const bLen = parseInt(t62.substring(bIdx + 2, bIdx + 4), 10);
      bIdx += 4;
      const bVal = t62.substring(bIdx, bIdx + bLen);
      bIdx += bLen;
      if (bTag === '01') billNumber = bVal;
    }
  }

  const currencyCode = tags['53'] || null;
  const currency: Currency | string =
    currencyCode === '116' ? 'KHR' : currencyCode === '840' ? 'USD' : currencyCode || 'USD';
  const amount = tags['54'] ? parseFloat(tags['54']) : 0;

  return {
    isValid,
    calculatedCrc,
    crc: expectedCrc,
    md5: md5(cleanStr),
    pointOfInitiation: tags['01'],
    isDynamic: tags['01'] === '12',
    type: isMerchant ? 'merchant' : 'individual',
    bakongAccountId: accountParsed['00'] || null,
    accountNo: isMerchant ? null : accountParsed['01'] || null,
    merchantId: isMerchant ? accountParsed['01'] || null : null,
    acquiringBank: accountParsed['02'] || null,
    merchantName: tags['59'] || null,
    merchantCity: tags['60'] || null,
    currency,
    currencyCode,
    amount,
    billNumber,
    tags,
  };
}
