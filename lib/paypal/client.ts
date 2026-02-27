// PayPal Checkout Integration
// Docs: https://developer.paypal.com/docs/checkout/

export interface PayPalOrder {
  id: string;
  status: string;
  links: Array<{
    href: string;
    rel: string;
    method: string;
  }>;
}

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '';
const PAYPAL_SECRET = process.env.PAYPAL_SECRET || '';
// Use sandbox mode - both AX and AT prefixes are typically sandbox
// Live credentials usually start with different patterns
const PAYPAL_API_URL = 'https://api-m.sandbox.paypal.com';

// Get access token for server-side API calls
async function getAccessToken(): Promise<string> {
  console.log('Getting PayPal access token...');
  console.log('Client ID exists:', !!PAYPAL_CLIENT_ID);
  console.log('Secret exists:', !!PAYPAL_SECRET);
  
  const response = await fetch(`${PAYPAL_API_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString('base64')}`,
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('PayPal auth error:', response.status, errorText);
    throw new Error(`Failed to get PayPal access token: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  console.log('Access token obtained successfully');
  return data.access_token;
}

// Create a new order
export async function createPayPalOrder(
  productId: string,
  productName: string,
  price: number,
  currency: string = 'USD'
): Promise<PayPalOrder> {
  console.log('Creating PayPal order for:', productId, productName, price);
  
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(`${PAYPAL_API_URL}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            reference_id: productId,
            description: productName,
            amount: {
              currency_code: currency.toUpperCase(),
              value: price.toFixed(2),
            },
          },
        ],
        application_context: {
          brand_name: 'AI Buddy',
          landing_page: 'BILLING',
          user_action: 'PAY_NOW',
          return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
          cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('PayPal order creation error:', response.status, error);
      throw new Error(`PayPal order creation failed: ${response.status} ${error}`);
    }

    const data = await response.json();
    console.log('Order created successfully:', data.id);
    return data;
  } catch (err) {
    console.error('Exception in createPayPalOrder:', err);
    throw err;
  }
}

// Capture payment after user approves
export async function capturePayPalOrder(orderId: string): Promise<{
  id: string;
  status: string;
  purchase_units: Array<{
    reference_id: string;
    payments: {
      captures: Array<{
        id: string;
        status: string;
        amount: { value: string; currency_code: string };
      }>;
    };
  }>;
}> {
  const accessToken = await getAccessToken();

  const response = await fetch(`${PAYPAL_API_URL}/v2/checkout/orders/${orderId}/capture`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`PayPal capture failed: ${error}`);
  }

  return response.json();
}

// Get order details
export async function getPayPalOrder(orderId: string) {
  const accessToken = await getAccessToken();

  const response = await fetch(`${PAYPAL_API_URL}/v2/checkout/orders/${orderId}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to get PayPal order');
  }

  return response.json();
}
