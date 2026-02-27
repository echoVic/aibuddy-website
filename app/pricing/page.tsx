import type { Metadata } from 'next';
import Script from 'next/script';
import { products } from '@/lib/products';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, BookOpen, Wrench, Users } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Pricing",
  description: "AI Buddy 产品定价 - 从 $1 开始，按需升级。OpenClaw 指南、Agent 配置包、1v1 咨询服务。",
};

const iconMap = {
  pdf: BookOpen,
  config: Wrench,
  consultation: Users,
};

function generateProductSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.name,
        description: product.description,
        offers: {
          '@type': 'Offer',
          price: product.price,
          priceCurrency: product.currency.toUpperCase(),
          availability: 'https://schema.org/InStock',
          url: `https://aibuddy.ltd/checkout/${product.id}`,
        },
        ...(product.type === 'config' && {
          category: 'SoftwareApplication',
          applicationCategory: 'DeveloperApplication',
        }),
      },
    })),
  };
}

export default function PricingPage() {
  const productSchema = generateProductSchema();

  return (
    <>
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b">
          <div className="mx-auto max-w-6xl px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">AI Buddy</Link>
            <nav className="flex gap-6 items-center">
              <Link href="/pricing" className="text-sm text-foreground font-medium">定价</Link>
              <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">控制台</Link>
              <Link href="/pricing">
                <Button size="sm">开始使用</Button>
              </Link>
            </nav>
          </div>
        </header>

        {/* Hero */}
        <section className="px-6 py-12 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
              简单透明的定价
            </h1>
            <p className="text-lg text-muted-foreground">
              花 $1 先试试，觉得值再升级
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="px-6 py-8 lg:px-8">
          <div className="mx-auto max-w-6xl grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => {
              const Icon = iconMap[product.type];
              const isPopular = product.id === 'agent-config-pack';
              const isLeadMagnet = product.price === 1;
              
              return (
                <Card key={product.id} className={`relative ${isPopular ? 'border-primary shadow-lg' : ''} ${isLeadMagnet ? 'border-green-500/30' : ''}`}>
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge>最受欢迎</Badge>
                    </div>
                  )}
                  {isLeadMagnet && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-400">先从这个开始</Badge>
                    </div>
                  )}
                  <CardHeader>
                    <Icon className={`h-8 w-8 mb-2 ${isPopular ? 'text-primary' : isLeadMagnet ? 'text-green-600' : 'text-muted-foreground'}`} />
                    <CardTitle>{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">${product.price}</span>
                      <span className="text-muted-foreground">{product.price === 0 ? '/免费' : product.price === 1 ? '/一次性' : '/一次性'}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {product.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-green-500 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    {product.type === 'consultation' ? (
                      <Link href="https://calendly.com/aibuddy/consultation" className="w-full">
                        <Button className="w-full">预约咨询</Button>
                      </Link>
                    ) : (
                      <Link href={isLeadMagnet ? '/guides/lead-magnet' : `/checkout/${product.id}`} className="w-full">
                        <Button className="w-full" variant={isLeadMagnet ? 'default' : 'outline'}>
                          {isLeadMagnet ? '花 $1 试试 →' : isPopular ? '立即购买' : '购买'}
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
            <h2 className="text-2xl font-bold text-center mb-8">常见问题</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-1">配置包怎么给我？</h3>
                <p className="text-muted-foreground text-sm">
                  买完之后自动给你开 GitHub 仓库权限，里面代码和视频都有。
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">PDF 在哪下载？</h3>
                <p className="text-muted-foreground text-sm">
                  发你邮箱，同时在 Dashboard 里也能随时下。
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">能开发票吗？</h3>
                <p className="text-muted-foreground text-sm">
                  可以，电子发票，买完找客服就行。
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">$1 的指南和 $29 的有啥区别？</h3>
                <p className="text-muted-foreground text-sm">
                  $1 是入门版，帮你快速跑起来；$29 是完整版，有深度教程、更多案例，还有社群支持。
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
