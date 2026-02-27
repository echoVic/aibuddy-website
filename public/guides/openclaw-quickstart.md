# OpenClaw 上手指南

> 别被名字唬住，半小时你就能跑起来

---

## 先搞清楚这是啥

**OpenClaw 能干啥？**

简单说，就是让你在自己的电脑上跑一个 AI 助手，还能按你的需求加功能。

- 🤖 想有个随时待命的 AI 帮手？可以
- 🔧 想让它帮你干特定的事（比如自动审代码）？可以
- 🌐 想把它接到 Telegram、Discord 里用？可以
- 🔒 不想把数据发给第三方？本地跑，数据在你手里

**为啥不用别的平台？**

| 对比项 | OpenClaw | 其他闭源平台 |
|--------|----------|--------------|
| 要不要钱 | 开源免费 | 大多收费 |
| 数据在哪 | 你自己电脑 | 别人服务器 |
| 能不能改 | 代码全开放 | 黑盒，改不了 |
| 支持多少模型 | 你想接哪个接哪个 | 它支持啥你用啥 |

---

## 安装：其实就几步

**你需要先有：**
- Node.js 18+ （去官网下载安装）
- Git （应该都有了）
- 一个 AI API Key（OpenAI、Claude 都行）

**然后开始操作：**

```bash
# 1. 把代码拉下来
git clone https://github.com/openclaw/openclaw.git
cd openclaw

# 2. 装依赖
npm install

# 3. 配置环境变量
cp .env.example .env
# 用编辑器打开 .env，把你的 API Key 填进去

# 4. 跑起来
npm run dev
```

完事。浏览器开 http://localhost:3000 就能用了。

---

## 10个能直接抄的作业

下面这 10 个场景，代码和配置都给你写好了，复制粘贴就能用。

### 1. 帮你审代码

```yaml
# skills/code-review/config.yaml
name: code-review
description: 看看这段代码有没有问题
triggers:
  - type: file_upload
    pattern: "*.js,*.ts,*.py"
prompt: |
  看下这段代码，帮我找找：
  1. 有没有明显的 bug
  2. 哪里写得不够高效
  3. 可读性能不能更好
```

### 2. 自动生成文档

丢给它一个函数，它帮你写 JSDoc。

### 3. 随手翻译

选中文字，一键翻译成中文/英文/日文。

### 4. 数据分析

扔个 CSV 过去，自动出分析报告。

### 5. 写邮件

告诉它要点，它帮你组织成一封像人写的邮件。

### 6. 会议记录整理

语音转文字后，自动提取重点和待办。

### 7. 制定学习计划

告诉它你想学啥、有多少时间，它给你排日程。

### 8. 报错诊断

把报错信息贴给它，告诉你可能哪错了、怎么修。

### 9. 改写内容

觉得写得不够好？让它换个说法。

### 10. 问答机器人

基于你自己的文档，搭一个专属于你的问答助手。

---

## 自己动手写一个 Skill

其实不复杂，就三个文件：

```
skills/你想叫啥/
├── config.yaml      # 配置：叫啥、干啥用的、怎么触发
├── prompt.md        # 提示词：告诉 AI 怎么处理
└── tools.ts         # 工具：（可选）需要调外部接口时写
```

**举个例子：查天气**

config.yaml：
```yaml
name: weather-check
description: 查某个城市现在的天气
triggers:
  - type: command
    pattern: "/weather {city}"
```

prompt.md：
```markdown
用户想知道 {{city}} 的天气。
调用 getWeather 获取数据，然后用大白话告诉用户。
```

tools.ts：
```typescript
export async function getWeather(city: string) {
  const res = await fetch(`https://api.weather.com/v1/current?city=${city}`);
  return res.json();
}
```

写好之后：
```bash
# 复制到 skills 目录
cp -r weather-check skills/

# 重启一下
npm run dev
```

现在试试发 `/weather 北京`，看能不能返回天气。

---

## 还有问题？

- 📚 官方文档：https://docs.openclaw.ai
- 💬 Discord 群里问：https://discord.gg/clawd
- ⭐ 觉得好用，GitHub 给个 star：https://github.com/openclaw/openclaw

---

*写这东西花了点时间，希望能帮到你。如果发现有错或者过时了，Discord 里喊我更新。*
