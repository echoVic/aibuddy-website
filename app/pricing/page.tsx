import { products } from '@/lib/products';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Zap, BookOpen, Wrench, Users } from 'lucide-react';
import Link from 'next/link';

const iconMap = {
  pdf: BookOpen,
  config: Wrench,
  consultation: Users,
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-lg text-muted-foreground">
            从免费开始，按需升级
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-6 py-8 lg:px-8">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const Icon = iconMap[product.type];
            const isFree = product.price === 0;
            const isPopular = product.id === 'agent-config-pack';
            
            return (
              <Card key={product.id} className={`relative ${isPopular ? 'border-primary shadow-lg' : ''}`}>
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge>Most Popular</Badge>
                  </div>
                )}
                <CardHeader>
                  <Icon className={`h-8 w-8 mb-2 ${isPopular ? 'text-primary' : 'text-muted-foreground'}`} />
                  <CardTitle>{product.name}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">
                      {isFree ? 'Free' : `$${product.price}`}
                    </span>
                    {!isFree && <span className="text-muted-foreground">/one-time</span>}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  {isFree ? (
                    <Link href="/guides/openclaw-quickstart" className="w-full">
                      <Button variant="outline" className="w-full">
                        Download Free
                      </Button>
                    </Link>
                  ) : product.type === 'consultation' ? (
                    <Link href="https://calendly.com/aibuddy/consultation" className="w-full">
                      <Button className="w-full">Book Now</Button>
                    </Link>
                  ) : (
                    <Link href={`/checkout/${product.id}`} className="w-full">
                      <Button className="w-full">
                        {isPopular ? 'Get Started' : 'Purchase'}
                      </Button>
                    </Link>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-16 lg:px-8 bg-muted/50">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-1">退款政策？</h3>
              <p className="text-muted-foreground text-sm">
                所有付费产品支持 30 天无理由退款。联系我们即可处理。
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">配置包如何交付？</h3>
              <p className="text-muted-foreground text-sm">
                购买后自动获得私有 GitHub 仓库访问权限，包含所有配置和视频教程。
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">PDF 如何下载？</h3>
              <p className="text-muted-foreground text-sm">
                购买后发送下载链接到您的邮箱，Dashboard 也可随时下载。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}