"""
飞书机器人 Agent
用于接收用户消息并通过飞书 API 发送回复
"""

import json
import requests
from veadk import Agent


def get_tenant_access_token(app_id: str, app_secret: str) -> dict:
    """获取飞书 tenant_access_token
    
    Args:
        app_id: 飞书应用的 App ID
        app_secret: 飞书应用的 App Secret
    
    Returns:
        dict: 包含 token 信息的字典，如 {"tenant_access_token": "xxx", "expire": 7200}
              或错误信息 {"error": "..."}
    """
    url = "https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal"
    headers = {
        "Content-Type": "application/json; charset=utf-8"
    }
    data = {
        "app_id": app_id,
        "app_secret": app_secret
    }
    
    try:
        response = requests.post(url, headers=headers, json=data, timeout=30)
        result = response.json()
        
        if result.get("code") == 0:
            return {
                "tenant_access_token": result.get("tenant_access_token"),
                "expire": result.get("expire")
            }
        else:
            return {
                "error": f"获取 token 失败: {result.get('msg', '未知错误')}",
                "code": result.get("code")
            }
    except Exception as e:
        return {"error": f"请求异常: {str(e)}"}


def send_feishu_message(
    receive_id: str,
    content: str,
    msg_type: str = "text",
    receive_id_type: str = "open_id"
) -> dict:
    """发送飞书消息
    
    Args:
        receive_id: 接收者的 ID (open_id/user_id/union_id/chat_id)
        content: 消息内容
        msg_type: 消息类型，默认为 text (可选: text, post, image, file, interactive 等)
        receive_id_type: 接收者 ID 类型，默认为 open_id (可选: open_id, user_id, union_id, chat_id)
    
    Returns:
        dict: 发送结果，成功返回 {"message_id": "xxx"}，失败返回 {"error": "..."}
    """
    # 从环境变量或全局配置中获取 token 和 app 凭证
    # 注意：实际使用时需要在 Agent 初始化时设置这些值
    app_id = "cli_a9157daa87389bde"
    app_secret = "Ufwtbyk1IZdTzokvZuyTkgmBcSsxBoij"
    
    # 获取 tenant_access_token
    token_result = get_tenant_access_token(app_id, app_secret)
    if "error" in token_result:
        return token_result
    
    token = token_result.get("tenant_access_token")
    
    url = "https://open.feishu.cn/open-apis/im/v1/messages"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json; charset=utf-8"
    }
    params = {
        "receive_id_type": receive_id_type
    }
    
    # 构建消息内容
    if msg_type == "text":
        message_content = json.dumps({"text": content})
    elif msg_type == "post":
        # 富文本消息
        message_content = content if isinstance(content, str) else json.dumps(content)
    else:
        message_content = content if isinstance(content, str) else json.dumps(content)
    
    data = {
        "receive_id": receive_id,
        "msg_type": msg_type,
        "content": message_content
    }
    
    try:
        response = requests.post(url, headers=headers, params=params, json=data, timeout=30)
        result = response.json()
        
        if result.get("code") == 0:
            return {
                "message_id": result.get("data", {}).get("message_id"),
                "status": "success"
            }
        else:
            return {
                "error": f"发送消息失败: {result.get('msg', '未知错误')}",
                "code": result.get("code")
            }
    except Exception as e:
        return {"error": f"请求异常: {str(e)}"}


def reply_feishu_message(
    message_id: str,
    content: str,
    msg_type: str = "text"
) -> dict:
    """回复飞书消息（通过 message_id 回复指定消息）
    
    Args:
        message_id: 要回复的消息 ID
        content: 回复内容
        msg_type: 消息类型，默认为 text
    
    Returns:
        dict: 发送结果，成功返回 {"message_id": "xxx"}，失败返回 {"error": "..."}
    """
    app_id = "cli_a9157daa87389bde"
    app_secret = "Ufwtbyk1IZdTzokvZuyTkgmBcSsxBoij"
    
    # 获取 tenant_access_token
    token_result = get_tenant_access_token(app_id, app_secret)
    if "error" in token_result:
        return token_result
    
    token = token_result.get("tenant_access_token")
    
    url = f"https://open.feishu.cn/open-apis/im/v1/messages/{message_id}/reply"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json; charset=utf-8"
    }
    
    # 构建消息内容
    if msg_type == "text":
        message_content = json.dumps({"text": content})
    else:
        message_content = content if isinstance(content, str) else json.dumps(content)
    
    data = {
        "content": message_content,
        "msg_type": msg_type
    }
    
    try:
        response = requests.post(url, headers=headers, json=data, timeout=30)
        result = response.json()
        
        if result.get("code") == 0:
            return {
                "message_id": result.get("data", {}).get("message_id"),
                "status": "success"
            }
        else:
            return {
                "error": f"回复消息失败: {result.get('msg', '未知错误')}",
                "code": result.get("code")
            }
    except Exception as e:
        return {"error": f"请求异常: {str(e)}"}


# 定义根 Agent
root_agent = Agent(
    name="飞书机器人助手",
    description="一个能够与用户交互并通过飞书 API 发送消息的机器人助手",
    instruction="""你是飞书机器人助手，负责与用户进行对话并帮助他们发送飞书消息。

你的核心能力：
1. 理解用户的需求，提供有帮助的回复
2. 使用工具向指定的飞书用户或群组发送消息
3. 回复特定的飞书消息

使用工具的指南：
- 当用户想要发送消息给某人时，使用 `send_feishu_message` 工具
- 当用户想要回复某条特定消息时，使用 `reply_feishu_message` 工具
- 如果需要获取访问令牌，可以使用 `get_tenant_access_token` 工具

注意事项：
- 发送消息前确认接收者 ID 和消息内容
- 如果用户没有提供必要参数，请主动询问
- 处理工具返回的错误信息，并向用户解释
- 保持友好、专业的沟通风格

App ID 和 App Secret 已内置配置，无需用户提供。""",
    tools=[
        get_tenant_access_token,
        send_feishu_message,
        reply_feishu_message
    ]
)
