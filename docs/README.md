# Bakong & KHQR Documentation Architecture

This directory serves as the centralized, standardized repository for all official National Bank of Cambodia (NBC) Bakong and KHQR technical specifications, implementation guidelines, and architectural white papers.

## Directory Structure

```
docs/
├── bakong/
│   ├── bakong-open-api-specification.pdf
│   ├── bakong-tourist-guidelines.pdf
│   └── nbc-bakong-white-paper.pdf
├── khqr/
│   ├── khqr-card-branding-guidelines.pdf
│   ├── khqr-content-specification-v1.3.pdf
│   ├── khqr-payment-integration-guide.pdf
│   ├── khqr-sdk-implementation-guide-v2.9.pdf
│   └── sdk-quickstart.md
└── assets-catalog.md           # Media asset library and audio catalog
```

## Document Registry & Reading Guide

### 1. Core Bakong Infrastructure (`docs/bakong/`)

* **`nbc-bakong-white-paper.pdf`**
  * **Title**: Project Bakong: Next Generation Payment System
  * **Publisher**: National Bank of Cambodia (NBC) (June 2020)
  * **Scope**: Foundational architecture, central bank digital payment infrastructure, Hyperledger Iroha blockchain integration, and financial inclusion strategy.

* **`bakong-open-api-specification.pdf`**
  * **Title**: Bakong Open API Documentation (v1.0.2, May 2021)
  * **Scope**: REST API contracts for direct bank and payment switch integration, account validation, webhook notifications, and transaction settlement.

* **`bakong-tourist-guidelines.pdf`**
  * **Title**: Bakong Tourist Payment Application & Onboarding Guidelines
  * **Scope**: Specifications for international visitor onboarding, tourist wallet accounts, and foreign card top-up flows.

### 2. KHQR Specifications & Implementation (`docs/khqr/`)

* **`khqr-card-branding-guidelines.pdf`**
  * **Title**: Branding Guideline Implementation: KHQR Display on Mobile, Internet Banking, POS, Bill, Invoice, and Media
  * **Scope**: Official visual design rules, 20:29 aspect ratio standard, 8:9 square design ratio, color standards (Bakong Bravery Red `#E1232E`, Raven Dark Black `#000000`, Pearl White `#FFFFFF`), typography (Nunito Sans), currency placement, and merchant logo sizing.

* **`khqr-content-specification-v1.3.pdf`**
  * **Title**: Bakong as a Payment Switch: KHQR Merchant-Presented Specification (v1.3/v1.4, Nov 2020)
  * **Scope**: EMVCo QR code convention, Payload format indicator (`000201`), Tag 29 (Individual/Solo Merchant), Tag 30 (Corporate Merchant), Tag 53 currency codes (`116` for KHR, `840` for USD), Tag 54 transaction amounts, CRC16-CCITT checksum calculation, and MD5 transaction tracking.

* **`khqr-sdk-implementation-guide-v2.9.pdf`**
  * **Title**: Implementation Guideline: KHQR SDK Documentation (v2.9, May 2025)
  * **Scope**: Active standard for Java, JavaScript/Node.js, iOS, and C# SDK integration. Includes `BakongKHQR` class methods, dynamic QR generation, deep link routing (`bakong.nbc.org.kh`), expiry timestamps, and response payloads.

* **`khqr-payment-integration-guide.pdf`**
  * **Title**: Bakong QR Pay Integration (v1.0.1, Jan 2021)
  * **Scope**: End-to-end payment workflow, merchant cashier interaction flow, mobile banking push notification delivery, and callback verification.

