#!/bin/bash
# AI Buddy Vercel 部署脚本

cd "$(dirname "$0")"

# 使用环境变量或传入的 token
TOKEN="${VERCEL_TOKEN:-$1}"

if [ -z "$TOKEN" ]; then
    echo "Error: 需要提供 Vercel Token"
    echo "用法: VERCEL_TOKEN=xxx ./deploy.sh"
    exit 1
fi

echo "🚀 开始部署 AI Buddy..."
npx vercel --token="$TOKEN" --yes --prod
