# Soramitsu NBC Bakong KHQR Universal SDK Quickstart

The **Soramitsu NBC Bakong KHQR Universal SDK** is a zero-dependency, ultra-fast, type-safe TypeScript/JavaScript library for generating, decoding, verifying, and checking National Bank of Cambodia (NBC) KHQR payments across Node.js, Next.js, React, Bun, and Deno environments.

---

## 1. Installation & Import

Import directly from the local package or standalone module:

```typescript
import { KHQR } from 'aba-khqr-sandbox/sdk';
// or import from relative path
import { KHQR } from '@/sdk';
```

---

## 2. Generate Individual KHQR (EMVCo Tag 29)

For solo merchants, peer-to-peer transfers, and open-price QR cards:

```typescript
// Static QR (Amount = 0 or omitted)
const staticQR = KHQR.generateIndividual({
  bakongAccountId: 'merchant@bkrt',
  merchantName: 'SOK DARA',
  merchantCity: 'Phnom Penh',
  currency: 'USD',
  amount: 0,
});

console.log(staticQR.qrString);
console.log('CRC16:', staticQR.crc);
console.log('MD5 Hash:', staticQR.md5);

// Dynamic QR (Fixed Amount with Invoice / Bill Number)
const dynamicQR = KHQR.generateIndividual({
  bakongAccountId: 'merchant@bkrt',
  merchantName: 'SOK DARA',
  currency: 'KHR',
  amount: 25000,
  billNumber: 'INV-2026-001',
  mobileNumber: '85512345678',
  storeLabel: 'Coffee Stall 1',
  terminalLabel: 'POS-01',
});
```

---

## 3. Generate Corporate Merchant KHQR (EMVCo Tag 30)

For formal businesses, retail outlets, and supermarkets requiring Merchant ID and Acquiring Bank:

```typescript
const merchantQR = KHQR.generateMerchant({
  bakongAccountId: 'corporate_store@abaa',
  merchantName: 'SUPERMARKET CENTRAL',
  merchantCity: 'Phnom Penh',
  merchantId: 'M-102938',
  acquiringBank: 'ABA Bank',
  currency: 'USD',
  amount: 48.75,
  billNumber: 'BILL-90812',
  storeLabel: 'Floor 1',
  terminalLabel: 'Register 3',
});
```

---

## 4. Validate & Verify Checksums

Ensure the QR string conforms to EMVCo CRC16-CCITT:

```typescript
const result = KHQR.verify(qrString);

if (result.isValid) {
  console.log('QR is authentic. CRC:', result.crc);
} else {
  console.error('Invalid QR checksum! Expected:', result.crc, 'Calculated:', result.calculatedCrc);
}
```

---

## 5. Decode & Parse Payload

Deconstruct an EMVCo KHQR string into structured tags and metadata:

```typescript
const decoded = KHQR.decode(qrString);

console.log('Merchant Name:', decoded.merchantName);
console.log('Bakong Account:', decoded.bakongAccountId);
console.log('Amount:', decoded.amount);
console.log('Currency:', decoded.currency);
console.log('Is Dynamic:', decoded.isDynamic);
console.log('Bill Number:', decoded.billNumber);
```

---

## 6. Bakong Open API Client Methods

Query real-time payment settlement and account validity:

```typescript
const BAKONG_TOKEN = 'YOUR_BAKONG_OPEN_API_BEARER_TOKEN';

// 1. Check Transaction Status by MD5 Hash
const tx = await KHQR.checkTransaction(qr.md5, BAKONG_TOKEN);
if (tx.responseCode === 0 && tx.data) {
  console.log('Payment received! External Ref:', tx.data.externalRef);
}

// 2. Check if a Bakong Account exists
const acc = await KHQR.checkBakongAccount('user@bkrt', BAKONG_TOKEN);
console.log('Account exists:', acc.data?.exists);

// 3. Generate Mobile App Deep Link
const deeplink = await KHQR.generateDeepLink(qr.qrString, BAKONG_TOKEN, {
  appName: 'My Store',
  appIconUrl: 'https://mystore.com/icon.png',
  appDeepLinkCallback: 'mystore://checkout/success',
});
console.log('Short Deeplink:', deeplink.data?.shortLink);
```

---

## 7. Performance & Zero Dependencies

* **Pure Bitwise Math**: Employs modern `TextEncoder` and standard `Uint8Array` for ultra-fast CRC16 and MD5 hashing without external native dependencies.
* **Universal Portability**: Runs natively in Node.js, Next.js Edge Runtime, Cloudflare Workers, React Native, and web browsers.
