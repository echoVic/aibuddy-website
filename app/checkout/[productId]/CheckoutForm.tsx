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
        createOrder: (data: unknown, actions: { order: { create: (orderData: unknown) => Promise<string> } }) => Promise<string>;
        onApprove: (data: { orderID: string }, actions: { order: { capture: () => Promise<unknown> } }) => Promise<void>;
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

    // Hardcoded PayPal Sandbox Client ID
    // This is safe to expose as it's a public client ID
    const PAYPAL_CLIENT_ID = 'AXTcKBw9PLoPwsLurZ2DRAmaDIfg-4TAwKgDNjClhY0iFGGtm1F3sIjIVTfz9P52l16GqWu1aPs24OeW';
    
    // Create script element
    const script = document.createElement('script');
    script.id = 'paypal-script';
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD&intent=capture`;
    script.async = true;
    
    script.onload = () => {
      console.log('PayPal SDK loaded');
      if (paypalRef.current) {
        renderPayPalButtons();
      }
    };
    
    script.onerror = () => {
      setError('Failed to load PayPal. Please check your internet connection.');
      setLoading(false);
    };

    document.body.appendChild(script);
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
        // Use client-side order creation (no backend needed)
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                reference_id: product.id,
                description: product.name,
                amount: {
                  currency_code: 'USD',
                  value: product.price.toFixed(2),
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          try {
            const details = await actions.order.capture();
            console.log('Payment captured:', details);
            
            // TODO: Send order info to your server for recording
            // await fetch('/api/record-order', { ... });
            
            window.location.href = '/checkout/success';
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
        setError('PayPal is not available for this browser.');
        setLoading(false);
        return;
      }

      buttons.render(paypalRef.current).then(() => {
        setLoading(false);
      }).catch((err) => {
        console.error('Render error:', err);
        setError('Failed to display PayPal buttons.');
        setLoading(false);
      });
    } catch (err) {
      console.error('Error creating buttons:', err);
      setError('Failed to initialize PayPal.');
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
