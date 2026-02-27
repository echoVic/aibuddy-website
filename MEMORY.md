# MEMORY.md - 长期记忆

> 纯 FTS 检索，靠关键词、标签、结构化标题提高召回

---

## 项目索引

### Project: ai-buddy
- **名称**: AI Buddy
- **域名**: https://aibuddy.ltd
- **定位**: AI 工具/资源销售网站
- **目标用户**: 开发者、AI 工具爱好者
- **GitHub**: https://github.com/echoVic/aibuddy-website
- **本地路径**: `/root/.openclaw/workspace/projects/ai-buddy/`
- **标签**: #project #aibuddy #电商 #知识付费

**技术栈**:
- 前端: Next.js 16 + React 19 + Tailwind + shadcn/ui
- 支付: PayPal + Stripe
- 数据库: Supabase
- 邮件: Resend
- 部署: Vercel
- DNS: Cloudflare

**产品线**:
| 产品 | 价格 | 状态 | 标签 |
|------|------|------|------|
| OpenClaw Quick Start Guide | $1 | ✅ 已上线 | #引流款 |
| OpenClaw 完整指南 | $29 | ⏳ 待完成 | #付费产品 |
| Agent 配置包 | $79 | ⏳ 待完成 | #付费产品 #最受欢迎 |
| 1v1 定制咨询 | $299 | ⏳ 待完成 | #付费产品 |

**进度**:
- ✅ 网站框架、首页、定价页、免费指南页、Dashboard、下载中心
- ✅ PayPal + Stripe 支付集成、Webhook 处理
- ✅ 邮件服务（Resend）：购买确认、下载链接发送
- ⏳ 用户认证、PDF生成、订单存储

---

## 人物索引

### Person: echoVic (青雲)
- **称呼**: 青雲 / echoVic
- **位置**: 广州
- **时区**: Asia/Shanghai (GMT+8)
- **工作**: ByteDance - 质量工程 Agent（GUI测试、单元测试、开发者自测 Agent）
- **博客**: https://www.echovic.com/
- **标签**: #person #用户 #字节跳动

---

## 配置索引

### Config: memory
- **Provider**: FTS-only（纯全文检索，无 embedding）
- **记忆结构**:
  - `MEMORY.md` - 长期、精炼记忆
  - `memory/YYYY-MM-DD.md` - 每日原始日志
  - `notes/` - PARA 结构化笔记（待建）
- **检索**: memory_search → memory_get
- **标签**: #config #memory #fts

### Config: hooks
- **已启用**: boot-md, bootstrap-extra-files, command-logger, session-memory
- **状态**: 4/4 ready
- **标签**: #config #hooks

---

## 技能索引

### Skill: self-improving-agent
- **路径**: `~/.openclaw/workspace/skills/self-improving-agent/`
- **功能**: 多记忆架构（semantic + episodic + working）
- **标签**: #skill #self-improvement #memory

---

*最后更新: 2026-02-27*