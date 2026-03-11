'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, BookOpen, Users, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/components/language-provider";
import { useEffect, useState } from "react";

interface Messages {
  [key: string]: string | string[] | Messages;
}

export default function HomeContent() {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Default Chinese content for SSR
  const defaultContent = {
    nav: { pricing: 'Pricing', dashboard: 'Dashboard', getStarted: 'Get Started' },
    hero: { 
      badge: '从 $1 开始你的 AI 之旅',
      title: 'AI Buddy',
      description: '实战 AI 教程、开箱即用的 Agent 配置、OpenClaw 工作流模板。不废话，直接上手用。',
      browseProducts: '浏览产品',
      viewPricing: '查看定价'
    },
    products: {
      title: '选择适合你的产品',
      subtitle: '从入门到精通，每一步都有对应的产品',
      starter: { title: '入门版', price: '$1', features: ['OpenClaw Quick Start PDF', '10个实用场景', '源码示例', '低门槛体验'] },
      guides: { title: '实战小册', price: '$29 - $79', features: ['《OpenClaw 完整指南》', 'MCP 开发完全指南', '20+ 实战案例', '私有 Discord 社群'] },
      consultation: { title: '1v1 服务', price: '$299起', features: ['环境搭建咨询', '工作流定制设计', '代码 Review', '企业内训（远程）'] }
    },
    trust: { lifetimeUpdates: '终身更新', communitySupport: 'Discord 社群支持', instantAccess: '即买即用' },
    cta: { title: 'Ready to level up?', description: '从 $1 开始，逐步解锁 AI 超能力。', button: '查看定价' },
    footer: { copyright: '© 2025 AI Buddy. 专注 AI 实战。', pricing: 'Pricing' }
  };

  const getT = (key: string): string | string[] | Messages => {
    if (!mounted) {
      const keys = key.split('.');
      let value: unknown = defaultContent;
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = (value as Messages)[k];
        } else {
          return key;
        }
      }
      return value as string | string[] | Messages;
    }
    return t(key);
  };

  const products = [
    { key: 'starter', icon: Zap, color: 'yellow', href: '/guides/lead-magnet', free: true },
    { key: 'guides', icon: BookOpen, color: 'blue', href: '/pricing' },
    { key: 'consultation', icon: Users, color: 'green', href: '/pricing' },
  ];

  const trustItems = getT('trust') as Record<string, string>;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-6xl px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Buddy
          </Link>
          <nav className="flex gap-6 items-center">
            <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {getT('nav.pricing') as string}
            </Link>
            <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {getT('nav.dashboard') as string}
            </Link>
            <ThemeToggle />
            <LanguageSwitcher />
            <Link href="/pricing">
              <Button size="sm">{getT('nav.getStarted') as string}</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-24 lg:px-8">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/20" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-radial from-primary/10 via-transparent to-transparent blur-3xl" />
        </div>
        
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm">
            🚀 {getT('hero.badge') as string}
          </Badge>
          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl mb-6 bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
            {getT('hero.title') as string}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            {getT('hero.description') as string}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing">
              <Button size="lg" className="gap-2 px-8">
                {getT('hero.browseProducts') as string} <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="gap-2">
                {getT('hero.viewPricing') as string}
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>{trustItems.lifetimeUpdates}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>{trustItems.communitySupport}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>{trustItems.instantAccess}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="px-6 py-20 lg:px-8 bg-muted/30">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              {getT('products.title') as string}
            </h2>
            <p className="text-lg text-muted-foreground">
              {getT('products.subtitle') as string}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product) => {
              const productData = getT(`products.${product.key}`) as Record<string, unknown>;
              const features = productData.features as string[];
              
              return (
                <Link key={product.key} href={product.href || '/pricing'} className="block">
                  <Card className={`group relative overflow-hidden border-2 ${product.free ? 'border-green-500/30' : 'border-transparent'} hover:border-primary/20 transition-all duration-300 h-full cursor-pointer`}>
                    {product.free && (
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20">
                          免费
                        </Badge>
                      </div>
                    )}
                    <div className={`absolute inset-0 bg-gradient-to-br from-${product.color}-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
                    <CardHeader className="relative">
                      <div className={`w-12 h-12 rounded-xl bg-${product.color}-500/10 flex items-center justify-center mb-4`}>
                        <product.icon className={`h-6 w-6 text-${product.color}-500`} />
                      </div>
                      <CardTitle className="text-2xl">{productData.title as string}</CardTitle>
                      <CardDescription className="text-lg font-semibold text-primary">{productData.price as string}</CardDescription>
                    </CardHeader>
                    <CardContent className="relative">
                      <ul className="space-y-3 text-sm text-muted-foreground">
                        {features?.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 pt-4 border-t">
                        <span className={`text-sm font-medium ${product.free ? 'text-green-600 dark:text-green-400' : 'text-primary'}`}>
                          {product.free ? '立即免费获取 →' : '了解更多 →'}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-6 py-20 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/80" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-30" />
        
        <div className="relative mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4 text-primary-foreground">{getT('cta.title') as string}</h2>
          <p className="mb-8 text-primary-foreground/90 text-lg">
            {getT('cta.description') as string}
          </p>
          <Link href="/pricing">
            <Button size="lg" variant="secondary" className="gap-2">
              {getT('cta.button') as string} <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                {getT('footer.copyright') as string}
              </span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="/pricing" className="hover:text-foreground transition-colors">{getT('footer.pricing') as string}</Link>
              <a href="https://github.com/echoVic/aibuddy-website" className="hover:text-foreground transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
