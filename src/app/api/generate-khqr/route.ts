import { NextRequest, NextResponse } from 'next/server';
import { BakongKHQR, khqrData, IndividualInfo, MerchantInfo } from 'bakong-khqr';
import { DEFAULT_BAKONG_TOKEN, BAKONG_BASE_URL } from '@/lib/bakong-api';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const accountType = body?.accountType || 'individual';
    const bakongAccountId = (body?.bakongAccountId || 'shiliaiwei@bkrt').trim();
    const merchantName = (body?.merchantName || 'SHI LIAIWEI').trim();
    const merchantCity = (body?.merchantCity || 'Phnom Penh').trim();
    const merchantId = (body?.merchantId || '000001').trim();
    const acquiringBank = (body?.acquiringBank || 'Bakong Bank').trim();
    const currency = (body?.currency || 'USD').toUpperCase();
    const rawAmount = body?.amount !== undefined ? Number(body?.amount) : 0;
    const isDynamic = rawAmount > 0;
    const billNumber = isDynamic ? body?.billNumber || 'INV-' + Date.now().toString().slice(-6) : undefined;
    const token = body?.token || DEFAULT_BAKONG_TOKEN;

    const bakongCurrency =
      currency === 'KHR' ? khqrData.currency.khr : khqrData.currency.usd;

    const bakong = new BakongKHQR();
    let qrResponse: { status: { code: number; message?: string }; data?: { qr: string; md5: string } };

    const optionalParams: Record<string, unknown> = {
      currency: bakongCurrency,
      amount: isDynamic ? (currency === 'KHR' ? Math.round(rawAmount) : parseFloat(rawAmount.toFixed(2))) : undefined,
      billNumber,
      expirationTimestamp: isDynamic ? Date.now() + 15 * 60 * 1000 : undefined,
    };

    if (accountType === 'merchant') {
      const merchantInfo = new MerchantInfo(
        bakongAccountId,
        merchantName,
        merchantCity,
        merchantId,
        acquiringBank,
        optionalParams
      );
      qrResponse = bakong.generateMerchant(merchantInfo);
    } else {
      const individualInfo = new IndividualInfo(
        bakongAccountId,
        merchantName,
        merchantCity,
        optionalParams
      );
      qrResponse = bakong.generateIndividual(individualInfo);
    }

    if (qrResponse.status.code !== 0 || !qrResponse.data) {
      return NextResponse.json(
        {
          responseCode: qrResponse.status.code,
          responseMessage: qrResponse.status.message || 'Failed to generate KHQR string via SDK',
          data: null,
        },
        { status: 400 }
      );
    }

    const { qr, md5 } = qrResponse.data;

    // Fetch official deeplink from Bakong Open API with Bearer token
    let shortLink: string | null = null;
    let fullLink: string | null = null;
    try {
      const deeplinkRes = await fetch(`${BAKONG_BASE_URL}/v1/generate_deeplink_by_qr`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ qr }),
      });
      if (deeplinkRes.ok) {
        const deeplinkData = await deeplinkRes.json();
        if (deeplinkData.responseCode === 0 && deeplinkData.data) {
          shortLink = deeplinkData.data.shortLink || null;
          fullLink = deeplinkData.data.fullLink || null;
        }
      }
    } catch (e) {
      console.warn('Bakong deeplink API non-critical warning:', e);
    }

    // Verify account with Bakong Open API
    let accountData: Record<string, unknown> | null = null;
    try {
      const accRes = await fetch(`${BAKONG_BASE_URL}/v1/check_bakong_account`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ accountId: bakongAccountId }),
      });
      if (accRes.ok) {
        const accJson = await accRes.json();
        if (accJson.responseCode === 0 && accJson.data) {
          accountData = accJson.data;
        }
      }
    } catch (e) {
      console.warn('Bakong check account API non-critical warning:', e);
    }

    return NextResponse.json({
      responseCode: 0,
      responseMessage: 'Generated original KHQR from official Bakong SDK and API token',
      data: {
        qr,
        md5,
        deeplink: shortLink || fullLink || null,
        accountData,
        isDynamic,
        bakongAccountId,
        merchantName,
        merchantCity,
        currency,
        amount: isDynamic ? rawAmount : 0,
        billNumber: billNumber || null,
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      {
        responseCode: -1,
        responseMessage: `Bakong KHQR generation error: ${message}`,
        data: null,
      },
      { status: 500 }
    );
  }
}
