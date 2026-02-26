import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, BookOpen, Wrench, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-4">
            🤖 让 AI 成为你的超能力
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
            AI Buddy
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            实战 AI 教程、开箱即用的 Agent 配置、OpenClaw 工作流模板。
            <br />
            不废话，直接上手用。
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg">
              浏览课程 <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg">
              免费资源
            </Button>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="px-6 py-16 lg:px-8 bg-muted/50">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">产品矩阵</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Zap className="h-8 w-8 text-yellow-500 mb-2" />
                <CardTitle>开箱即用配置</CardTitle>
                <CardDescription>¥29-99</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• OpenClaw 场景模板包</li>
                  <li>• MCP Server 配置集</li>
                  <li>• Agent Skill  starter</li>
                  <li>• 一键导入，5分钟跑通</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <BookOpen className="h-8 w-8 text-blue-500 mb-2" />
                <CardTitle>实战小册</CardTitle>
                <CardDescription>¥199-499</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 《从零搭建你的第一个 Agent》</li>
                  <li>• MCP 开发完全指南</li>
                  <li>• STOP 协议实战解析</li>
                  <li>• 源码级项目拆解</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-8 w-8 text-green-500 mb-2" />
                <CardTitle>1v1 服务</CardTitle>
                <CardDescription>¥699起</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 环境搭建咨询</li>
                  <li>• 工作流定制设计</li>
                  <li>• 代码 Review</li>
                  <li>• 企业内训（远程）</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Free Resources */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">免费资源</h2>
          <p className="text-muted-foreground mb-8">
            先体验，再决定。这些资源永久免费更新。
          </p>
          <div className="grid sm:grid-cols-2 gap-4 text-left">
            <Card className="hover:border-primary transition-colors cursor-pointer">
              <CardContent className="pt-6">
                <Wrench className="h-6 w-6 mb-2" />
                <h3 className="font-semibold">OpenClaw 快速上手指南</h3>
                <p className="text-sm text-muted-foreground">30分钟从零到能用</p>
              </CardContent>
            </Card>
            <Card className="hover:border-primary transition-colors cursor-pointer">
              <CardContent className="pt-6">
                <Zap className="h-6 w-6 mb-2" />
                <h3 className="font-semibold">10个实用 Agent 配置</h3>
                <p className="text-sm text-muted-foreground">复制粘贴直接用</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t">
        <div className="mx-auto max-w-6xl flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2025 AI Buddy. 专注 AI 实战。
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground">关于</a>
            <a href="#" className="hover:text-foreground">联系</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
