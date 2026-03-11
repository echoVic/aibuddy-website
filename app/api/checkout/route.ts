import { NextRequest, NextResponse } from 'next/server';
import { createPayPalOrder } from '@/lib/paypal/client';

export async function POST(request: NextRequest) {
  try {
    const { productId, price, name } = await request.json();

    console.log('Creating checkout for:', { productId, price, name });
    console.log('Environment check:', {
      hasClientId: !!process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
      hasSecret: !!process.env.PAYPAL_SECRET,
      appUrl: process.env.NEXT_PUBLIC_APP_URL,
    });

    const order = await createPayPalOrder(
      productId,
      name,
      price,
      'USD'
    );

    // Find the approval URL from PayPal response
    const approvalLink = order.links?.find(link => link.rel === 'approve');
    const approvalUrl = approvalLink?.href;

    return NextResponse.json({ 
      orderId: order.id,
      approvalUrl,
    });
  } catch (error) {
    console.error('Checkout error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to create checkout session', details: errorMessage },
      { status: 500 }
    );
  }
}
