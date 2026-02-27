# AI Buddy 部署指南

## 方式一：Vercel（推荐）

```bash
# 1. 登录 Vercel
npx vercel login

# 2. 进入项目目录
cd website/my-app

# 3. 首次部署
npx vercel

# 4. 生产环境部署
npx vercel --prod
```

## 方式二：静态托管（任意 CDN）

构建产物已在 `dist/` 目录：
```bash
cd website/my-app
npm run build
# 上传 dist/ 到任意静态托管
```

## 域名配置

建议注册：**aibuddy.dev** 或 **aibuddy.ai**

国内备案备选：**aibuddy.cn** / **aibuddy.com.cn**
