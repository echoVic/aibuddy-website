'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface Props {
  product: Product;
}

declare global {
  interface Window {
    paypal?: {
      Buttons: (config: {
        createOrder: () => Promise<string>;
        onApprove: (data: { orderID: string }) => Promise<void>;
        onError: (err: Error) => void;
        onCancel: () => void;
      }) => {
        render: (selector: string) => Promise<void>;
      };
    };
  }
}

export default function CheckoutForm({ product }: Props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sdkLoaded, setSdkLoaded] = useState(false);

  useEffect(() => {
    // Load PayPal SDK
    const existingScript = document.getElementById('paypal-sdk');
    if (existingScript) {
      setSdkLoaded(true);
      setLoading(false);
      return;
    }

    const script = document.createElement('script');
    script.id = 'paypal-sdk';
    // Use sandbox SDK since we're using sandbox credentials
    script.src = `https://www.sandbox.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD&intent=capture`;
    script.async = true;
    script.onload = () => {
      setSdkLoaded(true);
      setLoading(false);
    };
    script.onerror = () => {
      setError('Failed to load PayPal SDK');
      setLoading(false);
    };
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (!sdkLoaded || !window.paypal) return;

    // Render PayPal buttons
    window.paypal
      .Buttons({
        createOrder: async () => {
          try {
            const response = await fetch('/api/checkout', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                productId: product.id,
                price: product.price,
                name: product.name,
              }),
            });

            if (!response.ok) {
              throw new Error('Failed to create order');
            }

            const { orderId } = await response.json();
            return orderId;
          } catch (err) {
            console.error('Create order error:', err);
            throw err;
          }
        },
        onApprove: async (data) => {
          try {
            // Capture the payment
            const response = await fetch('/api/capture', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ orderId: data.orderID }),
            });

            if (!response.ok) {
              throw new Error('Payment capture failed');
            }

            // Redirect to success page
            window.location.href = '/dashboard?success=true';
          } catch (err) {
            console.error('Capture error:', err);
            setError('Payment failed. Please try again.');
          }
        },
        onError: (err) => {
          console.error('PayPal error:', err);
          setError('Payment error. Please try again.');
        },
        onCancel: () => {
          console.log('Payment cancelled');
        },
      })
      .render('#paypal-button-container');
  }, [sdkLoaded, product]);

  if (loading) {
    return (
      <Button disabled className="w-full">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading PayPal...
      </Button>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <p className="text-red-500 text-sm mb-2">{error}</p>
        <Button onClick={() => window.location.reload()} variant="outline" className="w-full">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div id="paypal-button-container" className="min-h-[45px]" />
      <p className="text-xs text-muted-foreground text-center">
        Secure payment powered by PayPal
      </p>
    </div>
  );
}
