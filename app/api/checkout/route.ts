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

    return NextResponse.json({ orderId: order.id });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
