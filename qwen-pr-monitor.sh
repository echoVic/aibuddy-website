#!/bin/bash
# Qwen Code PR 监控脚本

REPO_DIR="/root/.openclaw/workspace/qwen-code"
LOG_FILE="/root/.openclaw/workspace/memory/qwen-pr-monitor.log"
STATUS_FILE="/root/.openclaw/workspace/memory/qwen-pr-status.json"

cd "$REPO_DIR" || exit 1

# 获取当前时间
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

echo "[$TIMESTAMP] 开始检查 PR 状态..." >> "$LOG_FILE"

# 检查 GitHub CLI 是否可用
if command -v gh &> /dev/null; then
    # 使用 gh CLI 检查 PR 状态
    echo "=== 我的 Open PRs ===" >> "$LOG_FILE"
    gh pr list --author @me --state open --json number,title,headRefName,baseRefName,mergeable,reviewDecision,reviews 2>/dev/null >> "$LOG_FILE"
    
    # 检查是否有 review comments
    gh pr list --author @me --state open --json number | jq -r '.[].number' 2>/dev/null | while read pr_num; do
        echo "[$TIMESTAMP] Checking PR #$pr_num reviews..." >> "$LOG_FILE"
        gh api repos/QwenLM/qwen-code/pulls/$pr_num/reviews 2>/dev/null | jq '.[] | select(.state == "CHANGES_REQUESTED" or .state == "COMMENTED")' >> "$LOG_FILE"
        gh api repos/QwenLM/qwen-code/pulls/$pr_num/comments 2>/dev/null | jq '.[]' >> "$LOG_FILE"
    done
else
    echo "[$TIMESTAMP] gh CLI not available" >> "$LOG_FILE"
fi

# 更新状态文件
cat > "$STATUS_FILE" << EOF
{
    "lastCheck": "$TIMESTAMP",
    "branch": "$(git rev-parse --abbrev-ref HEAD)",
    "commitsAhead": $(git rev-list --count HEAD ^upstream/main 2>/dev/null || echo 0),
    "uncommittedChanges": $(git status --porcelain | wc -l)
}
EOF

echo "[$TIMESTAMP] 检查完成" >> "$LOG_FILE"
