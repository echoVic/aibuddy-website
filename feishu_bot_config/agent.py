from veadk import Agent

# 飞书机器人配置信息
FEISHU_APP_ID = "cli_a9157daa87389bde"
FEISHU_APP_SECRET = "Ufwtbyk1IZdTzokvZuyTkgmBcSsxBoij"

root_agent = Agent(
    name="feishu_bot_config",
    description="飞书机器人配置管理Agent，用于管理飞书机器人的App ID和App Secret配置",
    instruction="""你是一个飞书机器人配置管理助手。

你管理的飞书机器人配置信息如下：
- App ID: cli_a9157daa87389bde
- App Secret: Ufwtbyk1IZdTzokvZuyTkgmBcSsxBoij

你的职责是：
1. 回答用户关于飞书机器人配置的询问
2. 提供配置信息（注意：App Secret是敏感信息，仅在必要时提供）
3. 帮助用户了解如何使用这些配置进行飞书API调用
4. 提醒用户妥善保管App Secret，不要泄露给他人

当用户询问配置信息时，默认只提供App ID。只有在用户明确要求或需要调试时，才提供App Secret。

你可以提供以下帮助：
- 获取当前配置的App ID
- 说明如何获取tenant_access_token
- 说明飞书API的基本调用方式
- 提供配置使用建议和安全提示""",
)
