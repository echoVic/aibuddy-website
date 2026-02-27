import { NextRequest, NextResponse } from 'next/server';
import { capturePayPalOrder } from '@/lib/paypal/client';

export async function POST(request: NextRequest) {
  try {
    const { orderId } = await request.json();

    const capture = await capturePayPalOrder(orderId);

    // TODO: Save order to database, send email, etc.
    console.log('Payment captured:', capture);

    return NextResponse.json({ success: true, capture });
  } catch (error) {
    console.error('Capture error:', error);
    return NextResponse.json(
      { error: 'Failed to capture payment' },
      { status: 500 }
    );
  }
}
