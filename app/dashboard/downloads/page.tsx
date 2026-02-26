import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, ExternalLink } from 'lucide-react';
import { products } from '@/lib/products';

export default function DownloadsPage() {
  // TODO: Fetch user's purchased products from database
  const purchasedProducts = products.filter(p => p.price > 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <h1 className="text-2xl font-bold">Downloads</h1>
          <p className="text-muted-foreground text-sm">Access your purchased products</p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid md:grid-cols-2 gap-6">
          {purchasedProducts.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {product.downloadUrl ? (
                  <Button className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                ) : product.githubRepo ? (
                  <Button className="w-full">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Access GitHub Repo
                  </Button>
                ) : (
                  <Button className="w-full" disabled>
                    Coming Soon
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}