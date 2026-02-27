export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  type: 'pdf' | 'config' | 'consultation';
  features: string[];
  stripePriceId?: string;
  downloadUrl?: string;
  githubRepo?: string;
  comingSoon?: boolean;
}

export const products: Product[] = [
  {
    id: 'openclaw-quickstart',
    name: 'OpenClaw 快速上手指南',
    description: '30分钟从零到能用，PDF 指南 + 代码示例',
    price: 1,
    currency: 'usd',
    type: 'pdf',
    features: [
      '什么是 OpenClaw',
      '5分钟安装配置',
      '10个即用场景',
      '进阶：写你的第一个 Skill',
      '源码示例',
      '✨ 仅需 $1 超低门槛',
    ],
    downloadUrl: '/guides/openclaw-quickstart.md',
  },
  {
    id: 'openclaw-complete-guide',
    name: 'OpenClaw 实战小册',
    description: '深度教程 + 实战案例（正在写，敬请期待）',
    price: 29,
    currency: 'usd',
    type: 'pdf',
    comingSoon: true,
    features: [
      '完整架构解析',
      '20+ 实战案例',
      'Skill 开发进阶',
      '私有 Discord 社群',
      '终身更新',
    ],
  },
  {
    id: 'agent-config-pack',
    name: 'Agent 配置包',
    description: '10个开箱即用的 Agent 配置 + Skill 模板',
    price: 79,
    currency: 'usd',
    type: 'config',
    features: [
      '10个实用场景配置',
      '完整 Skill 模板',
      '视频教程',
      '私有 GitHub 仓库访问',
      '30天退款保证',
    ],
    githubRepo: 'aibuddy/agent-configs',
  },
  {
    id: '1v1-consultation',
    name: '1v1 定制咨询',
    description: '专属 Agent 架构设计 + 代码审查',
    price: 299,
    currency: 'usd',
    type: 'consultation',
    features: [
      '2小时 1v1 视频',
      '需求深度分析',
      '架构设计方案',
      '代码 Review',
      '7天跟进支持',
    ],
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find(p => p.id === id);
}