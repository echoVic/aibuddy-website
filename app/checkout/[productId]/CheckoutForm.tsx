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

  const handleCheckout = async () => {
    setLoading(true);

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

      const { orderId, approvalUrl } = await response.json();
      
      if (approvalUrl) {
        // Redirect to PayPal for payment
        window.location.href = approvalUrl;
      } else {
        throw new Error('No approval URL received');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Payment initialization failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleCheckout} disabled={loading} className="w-full">
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        `Pay $${product.price} with PayPal`
      )}
    </Button>
  );
}
