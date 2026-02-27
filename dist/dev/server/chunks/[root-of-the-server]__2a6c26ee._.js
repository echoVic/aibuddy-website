module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/email/client.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FROM_EMAIL",
    ()=>FROM_EMAIL,
    "sendEmail",
    ()=>sendEmail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$resend$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/resend/dist/index.mjs [app-route] (ecmascript)");
;
const resend = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$resend$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Resend"](process.env.RESEND_API_KEY);
const FROM_EMAIL = 'AI Buddy <onboarding@resend.dev>';
async function sendEmail({ to, subject, html }) {
    if (!process.env.RESEND_API_KEY) {
        console.warn('RESEND_API_KEY not set, skipping email send');
        return {
            success: false,
            error: 'RESEND_API_KEY not configured'
        };
    }
    try {
        const { data, error } = await resend.emails.send({
            from: FROM_EMAIL,
            to,
            subject,
            html
        });
        if (error) {
            console.error('Resend error:', error);
            return {
                success: false,
                error
            };
        }
        console.log('Email sent successfully:', data?.id);
        return {
            success: true,
            id: data?.id
        };
    } catch (error) {
        console.error('Failed to send email:', error);
        return {
            success: false,
            error
        };
    }
}
}),
"[project]/lib/email/templates.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "purchaseConfirmationTemplate",
    ()=>purchaseConfirmationTemplate
]);
function purchaseConfirmationTemplate(data) {
    const { customerName, product, orderId, downloadUrl } = data;
    const isConsultation = product.type === 'consultation';
    const downloadSection = downloadUrl ? `
    <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 24px 0;">
      <h3 style="margin-top: 0; color: #111827;">📥 下载您的产品</h3>
      <p>点击下方按钮获取您的 ${product.name}：</p>
      <a href="${downloadUrl}" 
         style="display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; 
                text-decoration: none; border-radius: 6px; font-weight: 600; margin-top: 12px;">
        立即下载
      </a>
      <p style="font-size: 14px; color: #6b7280; margin-top: 16px;">
        链接将在 7 天后过期，请及时下载。
      </p>
    </div>
  ` : '';
    const consultationSection = isConsultation ? `
    <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 24px 0;">
      <h3 style="margin-top: 0; color: #111827;">📅 预约咨询</h3>
      <p>请点击下方链接预约您的 1v1 咨询时间：</p>
      <a href="https://calendly.com/aibuddy/consultation" 
         style="display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; 
                text-decoration: none; border-radius: 6px; font-weight: 600; margin-top: 12px;">
        选择时间
      </a>
      <p style="font-size: 14px; color: #6b7280; margin-top: 16px;">
        请在购买后 30 天内完成预约。
      </p>
    </div>
  ` : '';
    const githubSection = product.githubRepo ? `
    <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 24px 0;">
      <h3 style="margin-top: 0; color: #111827;">🔗 GitHub 仓库访问</h3>
      <p>您已获得私有仓库访问权限：</p>
      <a href="https://github.com/${product.githubRepo}" 
         style="display: inline-block; background: #24292e; color: white; padding: 12px 24px; 
                text-decoration: none; border-radius: 6px; font-weight: 600; margin-top: 12px;">
        访问仓库
      </a>
      <p style="font-size: 14px; color: #6b7280; margin-top: 16px;">
        访问申请已发送，请检查您的 GitHub 通知。
      </p>
    </div>
  ` : '';
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>购买确认 - AI Buddy</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
             line-height: 1.6; color: #374151; max-width: 600px; margin: 0 auto; padding: 20px;">
  
  <div style="text-align: center; padding: 32px 0; border-bottom: 2px solid #e5e7eb;">
    <h1 style="color: #111827; margin: 0; font-size: 28px;">AI Buddy</h1>
    <p style="color: #6b7280; margin: 8px 0 0 0;">感谢购买！</p>
  </div>

  <div style="padding: 32px 0;">
    <p>Hi ${customerName || 'there'},</p>
    
    <p>感谢您购买 <strong>${product.name}</strong>！我们已收到您的付款，订单详情如下：</p>

    <table style="width: 100%; border-collapse: collapse; margin: 24px 0;">
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">产品</td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 600;">${product.name}</td>
      </tr>
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">价格</td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 600;">$${product.price}</td>
      </tr>
      <tr>
        <td style="padding: 12px; color: #6b7280;">订单号</td>
        <td style="padding: 12px; text-align: right; font-family: monospace; font-size: 14px;">${orderId}</td>
      </tr>
    </table>

    ${downloadSection}
    ${consultationSection}
    ${githubSection}

    <div style="background: #fef3c7; padding: 16px; border-radius: 8px; margin: 24px 0;">
      <p style="margin: 0; font-size: 14px; color: #92400e;">
        <strong>需要帮助？</strong><br>
        回复此邮件或联系 support@aibuddy.ltd，我们会在 24 小时内回复。
      </p>
    </div>
  </div>

  <div style="border-top: 1px solid #e5e7eb; padding: 24px 0; text-align: center; color: #9ca3af; font-size: 14px;">
    <p>AI Buddy · https://aibuddy.ltd</p>
    <p style="margin-top: 8px;">这是一封自动发送的邮件，请勿直接回复。</p>
  </div>

</body>
</html>
  `.trim();
}
}),
"[project]/lib/products.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getProduct",
    ()=>getProduct,
    "products",
    ()=>products
]);
const products = [
    {
        id: 'openclaw-quickstart',
        name: 'OpenClaw Quick Start Guide',
        description: '30分钟从零到能用，PDF 指南 + 代码示例',
        price: 1,
        currency: 'usd',
        type: 'pdf',
        features: [
            '什么是 OpenClaw',
            '5分钟安装配置',
            '10个即用场景',
            '进阶：写你的第一个 Skill',
            '源码示例'
        ],
        downloadUrl: '/guides/openclaw-quickstart.pdf'
    },
    {
        id: 'openclaw-complete-guide',
        name: 'OpenClaw 完整指南',
        description: '深度教程 + 实战案例 + 源码解析',
        price: 29,
        currency: 'usd',
        type: 'pdf',
        features: [
            '完整架构解析',
            '20+ 实战案例',
            'Skill 开发进阶',
            '私有 Discord 社群',
            '终身更新'
        ]
    },
    {
        id: 'agent-config-pack',
        name: 'Agent 配置包',
        description: '10个开箱即用的 Agent 配置 + Skill 模板',
        price: 79,
        currency: 'usd',
        type: 'config',
        features: [
            '10个实用场景配置',
            '完整 Skill 模板',
            '视频教程',
            '私有 GitHub 仓库访问',
            '30天退款保证'
        ],
        githubRepo: 'aibuddy/agent-configs'
    },
    {
        id: '1v1-consultation',
        name: '1v1 定制咨询',
        description: '专属 Agent 架构设计 + 代码审查',
        price: 299,
        currency: 'usd',
        type: 'consultation',
        features: [
            '2小时 1v1 视频',
            '需求深度分析',
            '架构设计方案',
            '代码 Review',
            '7天跟进支持'
        ]
    }
];
function getProduct(id) {
    return products.find((p)=>p.id === id);
}
}),
"[project]/app/api/test-email/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$email$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/email/client.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$email$2f$templates$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/email/templates.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$products$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/products.ts [app-route] (ecmascript)");
;
;
;
;
async function POST(request) {
    try {
        const { email } = await request.json();
        if (!email) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Email is required'
            }, {
                status: 400
            });
        }
        // Get the quick start guide product for testing
        const product = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$products$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["products"].find((p)=>p.id === 'openclaw-quickstart');
        if (!product) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Test product not found'
            }, {
                status: 500
            });
        }
        // Generate a test download URL
        const downloadUrl = `${("TURBOPACK compile-time value", "https://aibuddy.ltd")}/guides/openclaw-quickstart.pdf`;
        // Send test email
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$email$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendEmail"])({
            to: email,
            subject: `【测试】购买确认 - ${product.name}`,
            html: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$email$2f$templates$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["purchaseConfirmationTemplate"])({
                customerName: '测试用户',
                product,
                orderId: 'TEST-' + Date.now(),
                downloadUrl
            })
        });
        if (!result.success) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Failed to send email',
                details: result.error
            }, {
                status: 500
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: 'Test email sent successfully',
            emailId: result.id
        });
    } catch (error) {
        console.error('Test email error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Test failed',
            details: errorMessage
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__2a6c26ee._.js.map