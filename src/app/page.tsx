'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AppHeader, ViewMode } from '@/components/AppHeader';
import { KHQRCard } from '@/components/KHQRCard';
import { SkeuomorphicLeatherWalletCard } from '@/components/SkeuomorphicLeatherWalletCard';
import { SandboxPanel } from '@/components/SandboxPanel';
import { PaymentModal } from '@/components/PaymentModal';
import { TechStepperTab } from '@/components/TechStepperTab';
import { Toast } from '@/components/Toast';
import {
  AccountType,
  Currency,
  KHQRResult,
  TransactionStatusData,
} from '@/types';
import { generateKHQR } from '@/lib/khqr';
import {
  DEFAULT_BAKONG_TOKEN,
  checkTransactionByMd5,
  generateDeeplinkByQr,
  fetchOriginalBakongKHQR,
} from '@/lib/bakong-api';
import { playSuccessChime } from '@/lib/audio';
import { findBankByNameOrId } from '@/lib/banks';

function createBillNumber(): string {
  return 'INV-' + Date.now().toString().slice(-6);
}

export default function HomePage() {
  // View Mode: 'khqr' (official stand), 'wallet' (3D skeuomorphic purple leather wallet), 'dual' (side-by-side presentation)
  const [viewMode, setViewMode] = useState<ViewMode>('dual');

  // Sandbox Drawer State
  const [isSandboxOpen, setIsSandboxOpen] = useState(false);

  // Set document language attributes to English
  useEffect(() => {
    document.documentElement.lang = 'en';
    document.body.dataset.lang = 'en';
  }, []);

  // Form Parameters
  const [accountType, setAccountType] = useState<AccountType>('individual');
  const [merchantName, setMerchantName] = useState('SHI LIAIWEI');
  const [bakongAccountId, setBakongAccountId] = useState('shiliaiwei@bkrt');
  const [merchantCity, setMerchantCity] = useState('Phnom Penh');
  const [merchantId, setMerchantId] = useState('000001');
  const [acquiringBank, setAcquiringBank] = useState('Bakong Bank');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [amount, setAmount] = useState<number>(0);
  const [billNumber, setBillNumber] = useState(createBillNumber);
  const [bakongToken, setBakongToken] = useState(DEFAULT_BAKONG_TOKEN);
  const [deeplinkUrl, setDeeplinkUrl] = useState(
    'https://bakong-deeplink.nbc.gov.kh/bakong/FHocKPEwjDc7OwUuH'
  );

  // Wallet specific currency state (cycles USD -> KHR)
  const [walletCurrency, setWalletCurrency] = useState<'USD' | 'KHR'>('USD');

  // Generated QR Data initialized eagerly for instant SSR
  const [qrData, setQrData] = useState<KHQRResult>(() =>
    generateKHQR(
      {
        bakongAccountId: 'shiliaiwei@bkrt',
        merchantName: 'SHI LIAIWEI',
        merchantCity: 'Phnom Penh',
        currency: 'USD',
        amount: 0,
        billNumber: null,
      },
      'individual'
    )
  );

  // Expiration Timer State
  const [expirySeconds, setExpirySeconds] = useState(900);

  // Polling State
  const [isPolling, setIsPolling] = useState(true);
  const [isPaid, setIsPaid] = useState(false);
  const [pollingStatus, setPollingStatus] = useState<'polling' | 'success' | 'paused' | 'expired'>('polling');
  const [pollingMessage, setPollingMessage] = useState('Waiting for Bakong payment...');
  const [rawResponse, setRawResponse] = useState('');

  // Payment Confirmation Modal State
  const [lastTransaction, setLastTransaction] = useState<TransactionStatusData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  // Generate Current QR Code
  const recalculateQR = useCallback(() => {
    try {
      const generated = generateKHQR(
        {
          bakongAccountId,
          merchantName,
          merchantCity,
          merchantId,
          acquiringBank,
          currency,
          amount,
          billNumber: amount > 0 ? billNumber : null,
        },
        accountType
      );
      setQrData(generated);
      setIsPaid(false);
      setExpirySeconds(900);
      setPollingStatus('polling');
      setPollingMessage('Waiting for Bakong payment...');

      // Attempt to generate dynamic short deeplink via Bakong Open API
      generateDeeplinkByQr(generated.qrString, bakongToken)
        .then((res) => {
          if (res.responseCode === 0 && res.data && res.data.shortLink) {
            setDeeplinkUrl(res.data.shortLink);
          }
        })
        .catch(() => {
          // Keep current fallback deeplink
        });
    } catch (err) {
      console.error('Failed to generate KHQR:', err);
    }
  }, [
    accountType,
    bakongAccountId,
    merchantName,
    merchantCity,
    merchantId,
    acquiringBank,
    currency,
    amount,
    billNumber,
    bakongToken,
  ]);

  // Handle bank selection from KHQRCard or Sandbox
  const handleSelectBank = useCallback(
    (bankName: string) => {
      setAcquiringBank(bankName);
      const matched = findBankByNameOrId(bankName);
      if (matched?.defaultAccountId) {
        setBakongAccountId(matched.defaultAccountId);
      }
      showToast(`Switched acquiring bank to ${bankName}`);
    },
    [showToast]
  );

  // Fetch authentic original KHQR directly from official Bakong API & SDK
  const handleFetchBakongApi = useCallback(async () => {
    try {
      showToast('Fetching authentic KHQR from Bakong API...');
      const res = await fetchOriginalBakongKHQR(
        {
          accountType,
          bakongAccountId,
          merchantName,
          merchantCity,
          merchantId,
          acquiringBank,
          currency,
          amount,
          billNumber: amount > 0 ? billNumber : null,
        },
        bakongToken
      );

      if (res.responseCode === 0 && res.data) {
        setQrData((prev) => ({
          ...prev,
          qrString: res.data!.qr,
          md5: res.data!.md5,
          crc: res.data!.qr.slice(-4),
        }));
        if (res.data.deeplink) {
          setDeeplinkUrl(res.data.deeplink);
        }
        showToast('Fetched original KHQR from Bakong API & official SDK');
      } else {
        showToast(`Bakong API: ${res.responseMessage}`);
      }
    } catch (err) {
      console.error('Fetch Bakong API error:', err);
      showToast('Error connecting to Bakong API endpoint');
    }
  }, [
    accountType,
    bakongAccountId,
    merchantName,
    merchantCity,
    merchantId,
    acquiringBank,
    currency,
    amount,
    billNumber,
    bakongToken,
    showToast,
  ]);

  // Recalculate whenever core inputs change
  useEffect(() => {
    recalculateQR();
  }, [recalculateQR]);

  // Expiry countdown timer (15 minutes)
  useEffect(() => {
    const timer = setInterval(() => {
      setExpirySeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setPollingStatus('expired');
          setPollingMessage('QR Code has expired.');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [qrData?.qrString]);

  // Handle Payment Success
  const handlePaymentSuccess = useCallback(
    (txData: TransactionStatusData) => {
      setIsPaid(true);
      setPollingStatus('success');
      setPollingMessage('Payment completed successfully.');
      setLastTransaction(txData);
      setIsModalOpen(true);
      playSuccessChime();
    },
    []
  );

  // Background MD5 Hash Polling Effect
  useEffect(() => {
    if (!isPolling || isPaid || expirySeconds <= 0 || !qrData?.md5) {
      return;
    }

    const pollInterval = setInterval(async () => {
      try {
        const res = await checkTransactionByMd5(qrData.md5, bakongToken);
        setRawResponse(JSON.stringify(res, null, 2));

        if (res.responseCode === 0 && res.data) {
          handlePaymentSuccess(res.data);
        } else if (res.responseCode === 1) {
          setPollingStatus('polling');
          setPollingMessage('Transaction not found yet. Keep waiting...');
        } else {
          setPollingMessage(res.responseMessage || 'Polling in progress...');
        }
      } catch (err) {
        console.error('Polling error:', err);
        setPollingMessage('Network polling check failed.');
      }
    }, 8000);

    return () => clearInterval(pollInterval);
  }, [isPolling, isPaid, expirySeconds, qrData?.md5, bakongToken, handlePaymentSuccess]);

  // Simulate Instant Successful Payment in Sandbox
  const handleSimulatePayment = () => {
    const mockTx: TransactionStatusData = {
      hash: qrData.md5,
      fromAccountId: 'customer001@bkrt',
      toAccountId: qrData.bakongAccountId,
      amount: qrData.amount > 0 ? qrData.amount : currency === 'KHR' ? 4000 : 1.0,
      currency: qrData.currency,
      description: 'Sandbox Manual Payment Simulation',
      createdDateMs: Date.now(),
    };

    setRawResponse(
      JSON.stringify(
        {
          responseCode: 0,
          responseMessage: 'Success',
          data: mockTx,
        },
        null,
        2
      )
    );

    handlePaymentSuccess(mockTx);
  };

  // Regenerate Bill Number
  const handleRegenerateBill = () => {
    const newBill = createBillNumber();
    setBillNumber(newBill);
    showToast(`Generated fresh bill: ${newBill}`);
  };

  // Download QR Code Canvas as PNG
  const handleDownloadQR = () => {
    const canvas = document.getElementById('qr-canvas') as HTMLCanvasElement | null;
    if (!canvas) return;

    const offCanvas = document.createElement('canvas');
    offCanvas.width = 400;
    offCanvas.height = 400;
    const offCtx = offCanvas.getContext('2d');
    if (!offCtx) return;

    offCtx.drawImage(canvas, 0, 0, 400, 400);

    const img = new Image();
    img.src = '/images/khqr-currency-icon.svg';
    img.onload = () => {
      offCtx.drawImage(img, 156, 156, 88, 88);
      const link = document.createElement('a');
      link.download = `KHQR_${merchantName.replace(/\s+/g, '_')}_${currency}.png`;
      link.href = offCanvas.toDataURL('image/png');
      link.click();
      showToast('QR Code image downloaded');
    };
    img.onerror = () => {
      const link = document.createElement('a');
      link.download = `KHQR_${merchantName.replace(/\s+/g, '_')}_${currency}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      showToast('QR Code image downloaded');
    };
  };

  // Wallet currency toggle cycle (USD -> KHR -> USD)
  const handleToggleWalletCurrency = () => {
    setWalletCurrency((prev) => (prev === 'USD' ? 'KHR' : 'USD'));
  };

  const walletBalanceDisplay =
    walletCurrency === 'KHR'
      ? `${(amount > 0 ? amount : 1000000).toLocaleString('en-US')} ៛`
      : `$ ${(amount > 0 ? amount : 1250.0).toFixed(2)}`;

  return (
    <>
      <AppHeader
        onToggleSandbox={() => setIsSandboxOpen((prev) => !prev)}
        viewMode={viewMode}
        onSelectViewMode={setViewMode}
      />

      <main className="main-container">
        <div className="checkout-experience-container">
          <div className="stepper-tab-anchor">
            <TechStepperTab
              currentStep={isPaid ? 3 : 2}
              onSelectStep={(step) => {
                if (step === 1) {
                  setIsSandboxOpen(true);
                  showToast('Opened Developer Parameters');
                } else if (step === 2) {
                  setIsSandboxOpen(false);
                } else if (step === 3 && isPaid) {
                  setIsModalOpen(true);
                }
              }}
            />
          </div>

          {viewMode === 'dual' ? (
            <div className="dual-view-container my-auto py-4">
              {/* Column 1: Customer Pocket Wallet (3D Skeuomorphic Purple Leather) */}
              <div className="dual-view-column">
                <span className="dual-view-col-label">
                  Customer 3D Wallet
                </span>
                <SkeuomorphicLeatherWalletCard
                  username={merchantName.toLowerCase().replace(/\s+/g, '_')}
                  maskedAddress="0x1866...84ca"
                  balance={walletBalanceDisplay}
                  currency={walletCurrency}
                  onToggleCurrency={handleToggleWalletCurrency}
                />
              </div>

              {/* Column 2: Merchant Payment Stand (Aspect Ratio 20:29) */}
              <div className="dual-view-column">
                <span className="dual-view-col-label">
                  Merchant KHQR Stand
                </span>
                {qrData && (
                  <KHQRCard
                    qrData={qrData}
                    expirySeconds={expirySeconds}
                    deeplinkUrl={deeplinkUrl}
                    acquiringBank={acquiringBank}
                    onSelectBank={handleSelectBank}
                  />
                )}
              </div>
            </div>
          ) : viewMode === 'wallet' ? (
            <div className="wallet-view-container my-auto py-6">
              <SkeuomorphicLeatherWalletCard
                username={merchantName.toLowerCase().replace(/\s+/g, '_')}
                maskedAddress="0x1866...84ca"
                balance={walletBalanceDisplay}
                currency={walletCurrency}
                onToggleCurrency={handleToggleWalletCurrency}
              />
            </div>
          ) : (
            qrData && (
              <div className="single-view-container my-auto py-4">
                <KHQRCard
                  qrData={qrData}
                  expirySeconds={expirySeconds}
                  deeplinkUrl={deeplinkUrl}
                  acquiringBank={acquiringBank}
                  onSelectBank={handleSelectBank}
                />
              </div>
            )
          )}
        </div>

        <SandboxPanel
          isOpen={isSandboxOpen}
          onClose={() => setIsSandboxOpen(false)}
          accountType={accountType}
          onAccountTypeChange={setAccountType}
          merchantName={merchantName}
          onMerchantNameChange={setMerchantName}
          bakongAccountId={bakongAccountId}
          onBakongAccountIdChange={setBakongAccountId}
          merchantId={merchantId}
          onMerchantIdChange={setMerchantId}
          acquiringBank={acquiringBank}
          onAcquiringBankChange={handleSelectBank}
          currency={currency}
          onCurrencyChange={setCurrency}
          amount={amount}
          onAmountChange={setAmount}
          bakongToken={bakongToken}
          onBakongTokenChange={setBakongToken}
          deeplinkUrl={deeplinkUrl}
          onDeeplinkUrlChange={setDeeplinkUrl}
          isPolling={isPolling}
          onTogglePolling={setIsPolling}
          pollingStatus={pollingStatus}
          pollingMessage={pollingMessage}
          qrData={qrData}
          rawResponse={rawResponse}
          onSimulateSuccess={handleSimulatePayment}
          onRegenerateBill={handleRegenerateBill}
          onDownloadQR={handleDownloadQR}
          onToast={showToast}
          onFetchBakongApi={handleFetchBakongApi}
        />
      </main>

      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setBillNumber(createBillNumber());
        }}
        transaction={lastTransaction}
        defaultCurrency={currency}
        defaultBakongAccountId={bakongAccountId}
        defaultBillNumber={billNumber}
        defaultAmount={amount}
      />

      <Toast message={toastMessage} />
    </>
  );
}
