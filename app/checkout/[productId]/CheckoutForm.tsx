'use client';

import { useState } from 'react';
import { Product } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface Props {
  product: Product;
}

export default function CheckoutForm({ product }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheckout = async () => {
    setLoading(true);
    setError('');

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
        throw new Error(errorData.error || 'Failed to create checkout');
      }

      const data = await response.json();
      
      // Check for approval URL in PayPal response
      if (data.approvalUrl) {
        window.location.href = data.approvalUrl;
      } else if (data.orderId) {
        // If no approvalUrl, construct one manually
        const paypalUrl = `https://www.sandbox.paypal.com/checkoutnow?token=${data.orderId}`;
        window.location.href = paypalUrl;
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err instanceof Error ? err.message : 'Payment initialization failed');
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="space-y-2">
        <p className="text-red-500 text-sm text-center">{error}</p>
        <Button onClick={() => setError('')} variant="outline" className="w-full">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Button 
        onClick={handleCheckout} 
        disabled={loading} 
        className="w-full bg-[#0070BA] hover:bg-[#003087]"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Connecting to PayPal...
          </>
        ) : (
          <>
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.77.77 0 0 1 .757-.629h6.724c2.838 0 5.098.835 5.898 2.507.447.913.558 1.933.332 3.036-.335 1.628-1.124 2.917-2.354 3.848-1.255.95-2.858 1.431-4.768 1.431h-1.92a.77.77 0 0 0-.756.629l-.781 5.805z"/>
              <path d="M20.067 8.94c-.013.092-.028.185-.045.28-.32 1.867-1.364 3.465-2.936 4.503-.87.574-1.88.897-2.96.954l-.15.008h-2.37a.64.64 0 0 0-.632.535l-.747 4.863-.214 1.39a.346.346 0 0 0 .342.398h4.17a.578.578 0 0 0 .57-.482l.041-.213.804-5.18.052-.285a.578.578 0 0 1 .571-.482h.36c2.333 0 4.158-.947 4.693-3.48.223-1.04.109-1.905-.42-2.556z"/>
            </svg>
            Pay ${product.price} with PayPal
          </>
        )}
      </Button>
      <p className="text-xs text-muted-foreground text-center">
        You will be redirected to PayPal to complete your payment
      </p>
    </div>
  );
}
