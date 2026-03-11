# aibuddy-website 项目分析

## 技术栈

- 框架：Next.js 16.1.6（App Router，`app/` 目录）
- UI/样式：Tailwind CSS v4（`tailwindcss` + `@tailwindcss/postcss`），配合 `tw-animate-css`
- 语言：TypeScript（`tsconfig.json` strict=true）
- 代码规范：ESLint v9（使用 `eslint.config.mjs` + `eslint-config-next`）
- 关键三方能力：
  - Supabase（订单/下载等数据）
  - PayPal（下单/支付/捕获）
  - Stripe（checkout/webhook，当前部分逻辑 TODO）
  - Resend（发送购买确认邮件）

## 目录结构（核心）

- `app/`：页面与路由（App Router）
  - `app/api/*/route.ts`：API Routes（capture/checkout/download/orders/send-email/test-email/webhooks 等）
  - `app/checkout/*`、`app/dashboard/*`：支付/下载相关页面
- `components/`：通用组件、provider（主题/语言等）
- `lib/`：三方服务封装（paypal/stripe/supabase/email 等）
- `public/`：静态资源

## 常用命令

- 安装依赖：`npm ci`
- 本地开发：`npm run dev`
- 构建：`npm run build`
- 生产启动：`npm run start`
- Lint：`npm run lint`（当前仓库存在一些历史 lint 错误，见任务说明）

## 与 Vercel 部署相关要点

- Vercel 默认会执行安装（通常是 `npm ci`）+ 构建（`npm run build`）。
- Next.js 在 build 阶段会对 App Router 的 route module 做静态分析/导入（用于确定路由行为、生成 manifest 等）。如果某个 API route 在 **模块顶层** 直接读取/依赖必需的环境变量并抛错，就会导致 build 直接失败。
