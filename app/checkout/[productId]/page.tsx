import { getProduct, products } from '@/lib/products';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CheckoutForm from './CheckoutForm';

export async function generateStaticParams() {
  return products.filter(p => p.price > 0).map((product) => ({
    productId: product.id,
  }));
}

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const product = getProduct(productId);

  if (!product || product.price === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background py-12 px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Checkout</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Product</span>
              <span className="font-medium">{product.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Price</span>
              <span className="font-medium">${product.price}</span>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-lg">${product.price}</span>
              </div>
            </div>
            <CheckoutForm product={product} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
