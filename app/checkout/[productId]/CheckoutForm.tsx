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
        style?: {
          layout?: 'vertical' | 'horizontal';
          color?: 'gold' | 'blue' | 'silver' | 'white' | 'black';
          shape?: 'rect' | 'pill';
          label?: 'paypal' | 'checkout' | 'buynow' | 'pay' | 'installment';
        };
        createOrder: () => Promise<string>;
        onApprove: (data: { orderID: string }) => Promise<void>;
        onError: (err: Error) => void;
        onCancel: () => void;
      }) => {
        render: (selector: string | HTMLElement) => Promise<void>;
        isEligible: () => boolean;
      };
    };
  }
}

export default function CheckoutForm({ product }: Props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const paypalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if script already exists
    if (document.getElementById('paypal-script')) {
      if (window.paypal && paypalRef.current) {
        renderPayPalButtons();
      }
      return;
    }

    // Create script element
    const script = document.createElement('script');
    script.id = 'paypal-script';
    // Use the correct PayPal SDK URL with sandbox client-id
    // The SDK automatically detects sandbox vs live based on the client-id
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD&intent=capture&commit=true`;
    script.async = true;
    
    script.onload = () => {
      console.log('PayPal SDK loaded');
      if (paypalRef.current) {
        renderPayPalButtons();
      }
    };
    
    script.onerror = (e) => {
      console.error('PayPal SDK failed to load:', e);
      setError('Failed to load PayPal. Please check your internet connection and try again.');
      setLoading(false);
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup not needed as we want to keep the script
    };
  }, []);

  const renderPayPalButtons = () => {
    if (!window.paypal || !paypalRef.current) {
      setError('PayPal is not available');
      setLoading(false);
      return;
    }

    try {
      const buttons = window.paypal.Buttons({
        style: {
          layout: 'vertical',
          color: 'gold',
          shape: 'rect',
          label: 'pay'
        },
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
              const errorData = await response.json().catch(() => ({}));
              throw new Error(errorData.error || 'Failed to create order');
            }

            const data = await response.json();
            return data.orderId;
          } catch (err) {
            console.error('Create order error:', err);
            throw err;
          }
        },
        onApprove: async (data) => {
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
          console.error('PayPal error:', err);
          setError('An error occurred with PayPal. Please try again.');
        },
        onCancel: () => {
          console.log('Payment cancelled');
        },
      });

      if (!buttons.isEligible()) {
        setError('PayPal is not available for this browser. Please try a different payment method.');
        setLoading(false);
        return;
      }

      buttons.render(paypalRef.current).then(() => {
        console.log('PayPal buttons rendered successfully');
        setLoading(false);
      }).catch((err) => {
        console.error('Render error:', err);
        setError('Failed to display PayPal buttons. Please refresh the page.');
        setLoading(false);
      });
    } catch (err) {
      console.error('Error creating buttons:', err);
      setError('Failed to initialize PayPal. Please try again later.');
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="space-y-2">
        <p className="text-red-500 text-sm text-center">{error}</p>
        <Button onClick={() => window.location.reload()} variant="outline" className="w-full">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {loading && (
        <Button disabled className="w-full">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading PayPal...
        </Button>
      )}
      <div 
        ref={paypalRef} 
        className={`min-h-[45px] ${loading ? 'hidden' : ''}`}
      />
      {!loading && (
        <p className="text-xs text-muted-foreground text-center">
          Secure payment powered by PayPal
        </p>
      )}
    </div>
  );
}
