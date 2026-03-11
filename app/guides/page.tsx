import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "免费指南",
  description: "免费下载 OpenClaw 快速上手指南、Agent 配置模板。邮箱订阅即可获取。",
};

const guides = [
  {
    id: 'openclaw-quickstart',
    title: 'OpenClaw 快速上手指南',
    description: '30分钟从零到能用，包含安装配置和10个实用场景',
    downloadUrl: '/guides/openclaw-quickstart.pdf',
    icon: FileText,
  },
  {
    id: 'agent-configs',
    title: '10个实用 Agent 配置',
    description: '复制粘贴直接用，覆盖写作、编程、数据分析等场景',
    downloadUrl: '/guides/agent-configs.zip',
    icon: Download,
  },
];

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="mx-auto max-w-6xl px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">AI Buddy</Link>
          <nav className="flex gap-6 items-center">
            <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground">Pricing</Link>
            <Link href="/guides" className="text-sm text-foreground font-medium">Free Guides</Link>
            <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">Dashboard</Link>
            <Link href="/pricing">
              <Button size="sm">Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Content */}
      <section className="px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Free Guides</h1>
          <p className="text-lg text-muted-foreground mb-8">
            免费资源，永久更新。邮箱订阅即可下载。
          </p>

          <div className="grid gap-6">
            {guides.map((guide) => {
              const Icon = guide.icon;
              return (
                <Card key={guide.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Icon className="h-5 w-5" />
                          {guide.title}
                        </CardTitle>
                        <CardDescription className="mt-2">
                          {guide.description}
                        </CardDescription>
                      </div>
                      <Button>Download</Button>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}