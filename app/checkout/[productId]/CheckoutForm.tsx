'use client';

import { useEffect, useState, useRef } from 'react';
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
        isEligible: () => boolean;
      };
    };
  }
}

export default function CheckoutForm({ product }: Props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const renderedRef = useRef(false);

  useEffect(() => {
    // Load PayPal SDK
    const existingScript = document.getElementById('paypal-sdk');
    if (existingScript && window.paypal) {
      console.log('PayPal SDK already loaded');
      setSdkLoaded(true);
      setLoading(false);
      return;
    }

    const script = document.createElement('script');
    script.id = 'paypal-sdk';
    script.src = `https://www.sandbox.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD&intent=capture`;
    script.async = true;
    script.onload = () => {
      console.log('PayPal SDK loaded successfully');
      setSdkLoaded(true);
      setLoading(false);
    };
    script.onerror = (e) => {
      console.error('PayPal SDK load error:', e);
      setError('Failed to load PayPal SDK. Please refresh the page.');
      setLoading(false);
    };
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (!sdkLoaded || !window.paypal || renderedRef.current) return;

    console.log('Attempting to render PayPal buttons...');
    
    try {
      const buttons = window.paypal.Buttons({
        createOrder: async () => {
          console.log('Creating order for product:', product.id);
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
              const errorText = await response.text();
              console.error('Create order failed:', errorText);
              throw new Error(`Failed to create order: ${errorText}`);
            }

            const { orderId } = await response.json();
            console.log('Order created:', orderId);
            return orderId;
          } catch (err) {
            console.error('Create order error:', err);
            throw err;
          }
        },
        onApprove: async (data) => {
          console.log('Payment approved:', data.orderID);
          try {
            const response = await fetch('/api/capture', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ orderId: data.orderID }),
            });

            if (!response.ok) {
              throw new Error('Payment capture failed');
            }

            window.location.href = '/dashboard?success=true';
          } catch (err) {
            console.error('Capture error:', err);
            setError('Payment failed. Please try again.');
          }
        },
        onError: (err) => {
          console.error('PayPal button error:', err);
          setError('PayPal error: ' + err.message);
        },
        onCancel: () => {
          console.log('Payment cancelled by user');
        },
      });

      // Check if buttons are eligible
      if (!buttons.isEligible()) {
        console.error('PayPal buttons are not eligible');
        setError('PayPal is not available for this transaction. Please try a different payment method.');
        return;
      }

      // Render buttons
      buttons.render('#paypal-button-container').then(() => {
        console.log('PayPal buttons rendered successfully');
        renderedRef.current = true;
      }).catch((err) => {
        console.error('Failed to render PayPal buttons:', err);
        setError('Failed to initialize PayPal. Please refresh the page.');
      });
    } catch (err) {
      console.error('Error creating PayPal buttons:', err);
      setError('PayPal initialization failed. Please try again.');
    }
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
      <div className="text-center space-y-2">
        <p className="text-red-500 text-sm">{error}</p>
        <Button onClick={() => window.location.reload()} variant="outline" className="w-full">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div id="paypal-button-container" className="min-h-[45px] flex justify-center" />
      <p className="text-xs text-muted-foreground text-center">
        Secure payment powered by PayPal
      </p>
    </div>
  );
}
