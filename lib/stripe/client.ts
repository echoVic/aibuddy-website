import Stripe from 'stripe';

export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-02-24.acacia',
    })
  : null;

export async function createCheckoutSession(
  productId: string,
  price: number,
  successUrl: string,
  cancelUrl: string
) {
  if (!stripe) {
    throw new Error('Stripe not configured');
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card', 'paypal'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: productId,
          },
          unit_amount: price * 100,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      productId,
    },
  });

  return session;
}

export async function getCheckoutSession(sessionId: string) {
  if (!stripe) {
    throw new Error('Stripe not configured');
  }
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  return session;
}