# AI Buddy 项目进度

## 已完成 ✅

### 基础设施
- [x] 品牌名：AI Buddy
- [x] 域名：aibuddy.ltd
- [x] DNS 配置：Cloudflare
- [x] 部署：Vercel + GitHub 自动部署
- [x] 网站：https://aibuddy.ltd

### 网站功能
- [x] 首页（产品展示）
- [x] 定价页
- [x] 免费指南页
- [x] Dashboard
- [x] 下载中心
- [x] Checkout 页面
- [x] PayPal 支付集成（前端 + 后端）
- [x] 订单捕获 API (`/api/capture`)
- [x] 下载 API (`/api/download`)

### 后端服务
- [x] PayPal 订单创建与捕获
- [x] 订单记录到 Supabase
- [x] 用户自动创建/关联
- [x] 下载令牌生成与管理
- [x] 邮件发送服务 (Resend)
- [x] 购买确认邮件模板

### 数据库 Schema
- [x] users 表
- [x] purchases 表
- [x] downloads 表
- [x] RLS 策略配置

### 内容
- [x] OpenClaw 快速上手指南（Markdown）

## 待完成 ⏳

### 需要用户提供（生产环境配置）
- [ ] PayPal Client ID / Secret（生产环境）
- [ ] Supabase Project URL + Service Role Key
- [ ] Resend API Key

### 功能完善
- [ ] 用户认证（Clerk）- 可选，当前用邮箱关联
- [ ] PDF 生成（从 Markdown）
- [ ] GitHub 仓库访问授权（用于 Agent 配置包）

### 内容创作
- [ ] OpenClaw 完整指南（$29）
- [ ] Agent 配置包（$79）
- [ ] 视频教程

## 技术栈

- **前端**: Next.js 16 + React 19 + Tailwind + shadcn/ui
- **支付**: PayPal
- **数据库**: Supabase
- **邮件**: Resend
- **部署**: Vercel
- **域名**: Cloudflare

## 代码仓库

- GitHub: https://github.com/echoVic/aibuddy-website
- Vercel: https://aibuddy-website.vercel.app
- 生产: https://aibuddy.ltd

## 支付链路流程

```
用户点击购买 → PayPal 弹窗支付 → 前端捕获 → 调用 /api/capture 
→ 后端验证并记录订单 → 发送确认邮件 → 跳转成功页
```

邮件包含：
- 订单确认信息
- 下载链接（PDF 产品，7天有效）
- 预约链接（咨询服务）
- GitHub 仓库访问（配置包）
