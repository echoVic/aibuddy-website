import { NextRequest, NextResponse } from 'next/server';
import { createPayPalOrder } from '@/lib/paypal/client';

export async function POST(request: NextRequest) {
  try {
    const { productId, price, name } = await request.json();

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
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
