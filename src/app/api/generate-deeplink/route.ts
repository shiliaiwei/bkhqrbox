import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_BAKONG_TOKEN, BAKONG_BASE_URL } from '@/lib/bakong-api';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const qrString = body?.qr;
    const token = body?.token || DEFAULT_BAKONG_TOKEN;
    const sourceInfo = body?.sourceInfo;

    if (!qrString) {
      return NextResponse.json(
        { responseCode: -1, responseMessage: 'Missing qr parameter', data: null },
        { status: 400 }
      );
    }

    const payload: { qr: string; sourceInfo?: unknown } = { qr: qrString };
    if (sourceInfo) {
      payload.sourceInfo = sourceInfo;
    }

    const externalRes = await fetch(`${BAKONG_BASE_URL}/v1/generate_deeplink_by_qr`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await externalRes.json();
    return NextResponse.json(data, { status: externalRes.status });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      {
        responseCode: -1,
        responseMessage: `Proxy request to Bakong API failed: ${message}`,
        data: null,
      },
      { status: 502 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
