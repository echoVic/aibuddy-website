import { Product } from '@/lib/products';

interface PurchaseConfirmationData {
  customerName: string;
  product: Product;
  orderId: string;
  downloadUrl?: string;
}

export function purchaseConfirmationTemplate(data: PurchaseConfirmationData): string {
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
