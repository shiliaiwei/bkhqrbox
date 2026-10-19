import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_BAKONG_TOKEN, BAKONG_BASE_URL } from '@/lib/bakong-api';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const accountId = body?.accountId;
    const token = body?.token || DEFAULT_BAKONG_TOKEN;

    if (!accountId) {
      return NextResponse.json(
        { responseCode: -1, responseMessage: 'Missing accountId parameter', data: null },
        { status: 400 }
      );
    }

    const externalRes = await fetch(`${BAKONG_BASE_URL}/v1/check_bakong_account`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ accountId }),
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
