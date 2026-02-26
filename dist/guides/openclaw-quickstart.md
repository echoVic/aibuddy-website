# OpenClaw 快速上手指南

## 目录

1. [什么是 OpenClaw](#什么是-openclaw)
2. [5分钟安装配置](#5分钟安装配置)
3. [核心概念](#核心概念)
4. [10个即用场景](#10个即用场景)
5. [进阶：写你的第一个 Skill](#进阶写你的第一个-skill)
6. [资源索引](#资源索引)

---

## 什么是 OpenClaw

OpenClaw 是一个开源的 AI Agent 框架，让你可以通过自然语言控制 AI 完成复杂任务。

### 核心优势

- **多渠道支持**: Telegram、WhatsApp、Discord、飞书、钉钉、微信
- **工具扩展**: Skills 系统，无限扩展能力
- **记忆系统**: 跨会话记忆，持续学习
- **安全可控**: 本地部署，数据私有

### 适用场景

- 个人 AI 助手
- 客户服务自动化
- 团队协作机器人
- 自动化工作流

---

## 5分钟安装配置

### 方式一：npm 安装（推荐）

```bash
# 安装 OpenClaw CLI
npm install -g openclaw

# 初始化配置
openclaw init

# 启动 Gateway
openclaw gateway start
```

### 方式二：Docker

```bash
# 拉取镜像
docker pull openclaw/gateway:latest

# 运行
docker run -d \
  --name openclaw \
  -p 3000:3000 \
  -v ~/.openclaw:/root/.openclaw \
  openclaw/gateway:latest
```

### 连接 Telegram

1. 在 BotFather 创建 Bot，获取 Token
2. 运行配置命令：

```bash
openclaw configure --section telegram
# 粘贴你的 Bot Token
```

3. 重启 Gateway：

```bash
openclaw gateway restart
```

完成！现在给你的 Bot 发消息试试。

---

## 核心概念

### Agent

Agent 是你的 AI 助手实例，拥有：
- **Memory**: 长期记忆
- **Skills**: 技能扩展
- **Tools**: 工具调用

### Gateway

Gateway 是消息路由中心，负责：
- 连接各平台（Telegram、WhatsApp 等）
- 消息转发
- 会话管理

### Skills

Skills 是可插拔的能力模块：
- 位于 `~/.openclaw/workspace/skills/`
- 每个 Skill 包含 `SKILL.md` + 相关脚本

### Tools

Tools 是具体的操作能力：
- 文件读写
- 网页抓取
- 命令执行
- 消息发送

---

## 10个即用场景

### 1. 个人日记助手

```markdown
# 记忆系统配置
每天晚上 10 点提醒写日记
记录在 memory/YYYY-MM-DD.md
```

### 2. 代码审查机器人

```markdown
# Skill: code-review
当收到 GitHub PR 链接时：
1. 抓取 PR 内容
2. 分析代码质量
3. 给出改进建议
```

### 3. 每日新闻摘要

```markdown
# 定时任务
每天早上 8 点：
1. 抓取订阅的 RSS
2. 生成摘要
3. 发送到 Telegram
```

### 4. 会议纪要整理

```markdown
# 输入：会议录音/文字
# 输出：结构化纪要
- 参会人
- 决议事项
- 待办任务
```

### 5. 学习卡片生成

```markdown
# 输入：知识点文本
# 输出：Anki 卡片格式
- 正面：问题
- 背面：答案
```

### 6. 文档翻译助手

```markdown
# 多语言翻译
支持语言：中、英、日、韩
保持 Markdown 格式
```

### 7. API 测试工具

```markdown
# 输入：API 文档
# 输出：测试用例
- 正常请求
- 边界条件
- 错误处理
```

### 8. 邮件草稿生成

```markdown
# 输入：要点列表
# 输出：正式邮件草稿
- 问候语
- 正文
- 结尾
```

### 9. 数据分析助手

```markdown
# 输入：CSV/Excel 文件
# 输出：分析报告
- 数据概览
- 趋势分析
- 可视化图表
```

### 10. 自动化部署

```markdown
# 监听 GitHub Webhook
# 自动部署到服务器
1. 拉取代码
2. 运行测试
3. 部署上线
4. 发送通知
```

---

## 进阶：写你的第一个 Skill

### Skill 结构

```
my-skill/
├── SKILL.md          # Skill 说明
├── scripts/
│   └── helper.sh     # 辅助脚本
└── templates/
    └── output.md     # 模板文件
```

### SKILL.md 示例

```markdown
---
name: daily-summary
description: 每日工作总结生成器
---

# Daily Summary Skill

## 使用方式

告诉我"生成今日总结"，我会：
1. 回顾今天的对话
2. 提取关键事项
3. 生成结构化报告

## 输出格式

## 今日完成
- [ ] 任务1
- [ ] 任务2

## 明日计划
- [ ] 计划1
- [ ] 计划2
```

### 安装 Skill

```bash
# 放入 skills 目录
cp -r my-skill ~/.openclaw/workspace/skills/

# 重启生效
openclaw gateway restart
```

---

## 资源索引

### 官方资源

- **文档**: https://docs.openclaw.ai
- **GitHub**: https://github.com/openclaw/openclaw
- **社区**: https://discord.gg/clawd
- **技能市场**: https://clawhub.com

### 推荐 Skills

| Skill | 用途 |
|-------|------|
| weather | 天气查询 |
| feishu-doc | 飞书文档操作 |
| tmux | 远程终端控制 |
| agent-browser | 浏览器自动化 |

### 视频教程

- [OpenClaw 入门教程](https://youtube.com/@openclaw)
- [Skill 开发实战](https://youtube.com/@openclaw)

---

## 下一步

1. 加入 [Discord 社区](https://discord.gg/clawd) 获取帮助
2. 浏览 [ClawHub](https://clawhub.com) 发现更多 Skills
3. 购买 [OpenClaw 完整指南](/pricing) 深入学习

---

*AI Buddy - 让 AI 成为你的超能力*

© 2025 AI Buddy. All rights reserved.