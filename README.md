# Soramitsu NBC Bakong KHQR Sandbox & Universal SDK

A production-grade developer sandbox and TypeScript SDK for National Bank of Cambodia (NBC) Bakong KHQR payments, featuring both official EMVCo stand rendering and skeuomorphic wallet presentations.

---

## Features

- **EMVCo KHQR Engine**:
  - Full support for Individual accounts (Tag 29) and Merchant accounts (Tag 30).
  - Dynamic QR timestamps (Tag 99) and CRC16-CCITT checksum validation.
  - Integration with official NBC `bakong-khqr` SDK and Open API Bearer token verification.
- **Dual Presentation Interface**:
  - **Merchant Acrylic Stand**: Strict 20:29 aspect ratio adhering to NBC KHQR Branding Guidelines with vector Bakong and KHQR branding.
  - **Skeuomorphic Purple Leather Wallet**: 3D interactive wallet with tactile banknote selection and dynamic currency cycling (USD / KHR).
- **Developer Sandbox Controls**:
  - Real-time parameter tweaking (amounts, acquiring banks, currencies, bill numbers).
  - Live MD5 transaction polling (`check_transaction_by_md5`) and dynamic deeplink generation.
  - Multi-language SDK code export (TypeScript, cURL, Python).
- **Comprehensive Cambodian Banking Ecosystem**:
  - Integrated bank logos and configurations for 32+ member institutions (ABA, ACLEDA, Canadia, Chip Mong, etc.).

---

## Directory Structure

```
├── .github/
│   └── workflows/              # Real-time CI/CD and repository automation workflows
├── docs/                       # Official NBC Bakong & KHQR technical specifications
├── public/
│   └── resources/
│       ├── bank-logos/         # Vector bank emblems
│       ├── khqr-brand/         # Official KHQR identity marks
│       └── merchant-materials/ # Currency badges & display frames
├── src/
│   ├── app/                    # Next.js 14 App Router & API routes
│   │   ├── api/
│   │   │   ├── check-account/
│   │   │   ├── check-transaction/
│   │   │   ├── generate-deeplink/
│   │   │   └── generate-khqr/  # Official Bakong SDK & API bridge
│   ├── components/             # React UI components & Keyline icons
│   ├── lib/                    # KHQR generator, Bakong API client, audio helpers
│   ├── sdk/                    # Standalone universal SDK entry points
│   └── types/                  # TypeScript interface contracts
└── test/                       # Vitest unit and integration test suite
```

---

## Getting Started

### Prerequisites

- Node.js 18+ (tested on Node.js 20+ / 25)
- npm or yarn

### Installation

```bash
npm install
```

### Development Server

Run the Next.js dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Typecheck & Testing

```bash
# Typecheck
npm run check

# Run tests
npm test
```

### SDK Build

To compile the standalone KHQR SDK into `./dist/sdk/`:

```bash
npm run build:sdk
```

---

## Real-Time Tracking & Automation

This repository includes automated GitHub Actions workflows:

1. **Continuous Integration (`ci.yml`)**:
   - Triggers on every `push` and `pull_request` to `main`.
   - Executes TypeScript typechecking (`npm run check`) and unit tests (`npm test`).
2. **Issue & Release Automation (`realtime-tracking.yml`)**:
   - Real-time issue tagging, build status reporting, and dispatch synchronization.

---

## Open-Source Release Roadmap

1. Complete end-to-end sandbox testing with NBC sandbox endpoints.
2. Publish `@soramitsu/khqr-sdk` package to npm.
3. Transition repository visibility from `private` to `public` upon NBC clearance.

---

## License

MIT License. See [LICENSE](LICENSE) for details.
