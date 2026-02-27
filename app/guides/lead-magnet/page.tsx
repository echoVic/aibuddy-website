'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Download, Mail, BookOpen, Clock, Zap, Code, Sparkles } from 'lucide-react';
import Link from 'next/link';

const benefits = [
  { icon: Clock, text: '30分钟快速上手' },
  { icon: Zap, text: '10个即用场景' },
  { icon: Code, text: '完整源码示例' },
  { icon: Sparkles, text: '持续更新' },
];

export default function LeadMagnetPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    // TODO: 调用 API 保存邮箱
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSubmitted(true);
    setLoading(false);
  };

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
          {!submitted ? (
            <Card className="border-primary/20">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="h-8 w-8 text-primary" />
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

                {/* Preview */}
                <div className="bg-muted rounded-lg p-4 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-2">指南内容包括：</p>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>OpenClaw 是什么 & 为什么选择它</li>
                    <li>5分钟安装配置步骤</li>
                    <li>10个即用场景（代码+配置）</li>
                    <li>如何写你的第一个 Skill</li>
                  </ul>
                </div>

                {/* Email Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      输入邮箱，立即获取免费指南
                    </label>
                    <div className="flex gap-2">
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="flex-1"
                      />
                      <Button type="submit" disabled={loading}>
                        {loading ? '提交中...' : '免费获取'}
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    🔒 我们尊重隐私，不会发送垃圾邮件
                  </p>
                </form>

                {/* Social Proof */}
                <div className="text-center text-sm text-muted-foreground">
                  <p>已有 <span className="font-semibold text-foreground">500+</span> 开发者下载学习</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-green-500/20">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-2xl">感谢订阅！</CardTitle>
                <CardDescription>
                  指南已发送到 {email}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm mb-4">同时欢迎加入我们的 Discord 社群：</p>
                  <a 
                    href="https://discord.gg/39sVCGPU"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full bg-[#5865F2] hover:bg-[#4752C4]">
                      加入 Discord 社群
                    </Button>
                  </a>
                </div>
                <div className="text-center">
                  <Link href="/pricing">
                    <Button variant="outline">
                      查看付费产品 →
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
