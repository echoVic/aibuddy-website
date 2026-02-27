'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, BookOpen, Clock, Zap, Code, Sparkles, ArrowRight, Shield } from 'lucide-react';
import Link from 'next/link';

const benefits = [
  { icon: Clock, text: '30分钟快速上手' },
  { icon: Zap, text: '10个即用场景' },
  { icon: Code, text: '完整源码示例' },
  { icon: Sparkles, text: '持续更新' },
];

const features = [
  '什么是 OpenClaw & 为什么选择它',
  '5分钟安装配置步骤',
  '10个即用场景（代码+配置）',
  '如何写你的第一个 Skill',
  'Discord 社群支持',
];

export default function LeadMagnetPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="mx-auto max-w-6xl px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">AI Buddy</Link>
          <nav className="flex gap-6 items-center">
            <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground">Pricing</Link>
            <Link href="/guides" className="text-sm text-muted-foreground hover:text-foreground">Free Guides</Link>
            <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">Dashboard</Link>
          </nav>
        </div>
      </header>

      <div className="px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <Card className="border-primary/20">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium mb-4">
                <CheckCircle className="h-4 w-4" />
                仅需 $1
              </div>
              <CardTitle className="text-3xl">OpenClaw 快速上手指南</CardTitle>
              <CardDescription className="text-lg">
                从零到能用，只需 30 分钟
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Benefits */}
              <div className="grid grid-cols-2 gap-4">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <benefit.icon className="h-4 w-4 text-primary" />
                    <span>{benefit.text}</span>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="bg-muted rounded-lg p-4">
                <p className="font-medium text-foreground mb-3">指南内容包括：</p>
                <ul className="space-y-2">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="space-y-4">
                <Link href="/checkout/openclaw-quickstart">
                  <Button size="lg" className="w-full gap-2">
                    立即购买 - $1
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                
                <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    <span>安全支付</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    <span>即时交付</span>
                  </div>
                </div>
              </div>

              {/* Social Proof */}
              <div className="text-center pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  已有 <span className="font-semibold text-foreground">500+</span> 开发者购买学习
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Upsell */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              想要更深入的教程？
            </p>
            <Link href="/pricing">
              <Button variant="outline">
                查看完整指南 ($29) →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
