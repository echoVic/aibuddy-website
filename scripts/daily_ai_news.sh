#!/bin/bash
# 每日 AI 热点新闻整理脚本
# 运行时间：每天早上 10:00

DATE=$(date +"%Y-%m-%d")
LOG_FILE="/root/.openclaw/workspace/memory/ai-news-${DATE}.md"

echo "# AI 热点新闻日报 - ${DATE}" > "$LOG_FILE"
echo "" >> "$LOG_FILE"
echo "生成时间: $(date '+%Y-%m-%d %H:%M:%S')" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"

# 获取虎嗅科技频道内容
echo "## 📊 数据来源" >> "$LOG_FILE"
echo "- 虎嗅网前沿科技" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"

echo "日报已生成: $LOG_FILE"
