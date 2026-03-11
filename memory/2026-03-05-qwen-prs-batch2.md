# Qwen Code PR 批次2 - 第11-20个 Bug Issue

## 任务目标
从 GitHub issues 第11-20个 bug issue 中选择可修复的，目标是提交 **10 个 PR**。

## 分析结果

### Issue #2072 - /skills 命令输出有奇怪符号
- **标题**: 执行 /skills 命令后输出内容的开头有奇怪的符号
- **问题**: 执行 `/skills` 命令后输出内容开头出现奇怪符号
- **状态**: 待修复
- **难度**: 低 - 可能是格式化输出问题

### Issue #2071 - Unknown command: /model
- **标题**: Unknown command: /model
- **问题**: `/model` 命令显示未知命令，但欢迎界面提示使用 `/model` 切换模型
- **状态**: 待修复
- **难度**: 中 - 需要检查命令注册逻辑

### Issue #2069 - GBK编码文件乱码
- **标题**: qwencode只支持utf8读改代码。原始GBK文件被qwencode改完就乱码了
- **问题**: 文件编码处理不支持GBK，修改后中文乱码
- **状态**: 待修复
- **难度**: 高 - 需要添加编码检测和转换

### Issue #2012 - bash tool calls failed
- **标题**: Lot's of failed bash tool calls
- **问题**: Tool "bash" not found in registry，但手动执行命令成功
- **状态**: 待修复
- **难度**: 中 - 需要检查工具注册

### Issue #2004 - OOM crashes
- **标题**: OOM crashes
- **问题**: 内存溢出崩溃
- **状态**: 待修复
- **难度**: 高 - 需要内存优化

### Issue #1996 - JetBrains WSL环境报错
- **标题**: JetBrains IDEs WSL环境报错
- **问题**: Cannot run program "D:\nodejs\npx.cmd": CreateProcess error=267
- **状态**: 待修复
- **难度**: 中 - 路径处理问题

### Issue #1981 - 文档错误
- **标题**: 文档写错了
- **问题**: 流式 JSON 输出文档有误
- **状态**: 待修复
- **难度**: 低 - 文档修正

### Issue #1977 - Windows中文文件名加空格
- **标题**: 在windows中读取中文相关的文件报错，会自动给文件名中间增加空格
- **问题**: 文件名"多agent交流文档.md"被解析为"多 agent 交流文档.md"
- **状态**: 待修复
- **难度**: 中 - 字符串处理问题

### Issue #1971 - MCP list测试disabled服务器
- **标题**: when list MCP server, still test the disabled MCP server
- **问题**: `mcp list` 命令仍然测试已禁用的MCP服务器
- **状态**: 待修复
- **难度**: 低 - 过滤逻辑问题

### Issue #1970 - Skills未被正确检测
- **标题**: Skills 未被正确检测
- **问题**: Windows环境下skill配置存在但扫描不到
- **状态**: 待修复
- **难度**: 中 - 路径或扫描逻辑问题

---

## 开始修复

