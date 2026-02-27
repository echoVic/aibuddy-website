// Cloudflare Worker - R2 Signed URL Generator
// 部署命令: wrangler deploy

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };
    
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }
    
    // 生成签名下载链接
    if (url.pathname === '/api/download-guide' && request.method === 'POST') {
      try {
        const { productId, email, orderId } = await request.json();
        
        // 验证必要参数
        if (!productId || !email || !orderId) {
          return new Response(JSON.stringify({ error: 'Missing required fields' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        
        // 产品文件映射
        const productFiles = {
          'openclaw-quickstart': 'guides/openclaw-quickstart.pdf',
          'openclaw-complete-guide': 'guides/openclaw-complete-guide.pdf',
          'agent-config-pack': 'guides/agent-config-pack.zip',
        };
        
        const filePath = productFiles[productId];
        if (!filePath) {
          return new Response(JSON.stringify({ error: 'Product not found' }), {
            status: 404,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        
        // TODO: 验证订单是否已支付（查询数据库或 PayPal API）
        // const isPaid = await verifyPayment(orderId);
        // if (!isPaid) {
        //   return new Response(JSON.stringify({ error: 'Payment not verified' }), {
        //     status: 403,
        //     headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        //   });
        // }
        
        // 生成签名 URL（1小时有效）
        const signedUrl = await env.R2_BUCKET.get(filePath, {
          expiresIn: 3600, // 1小时
        });
        
        if (!signedUrl) {
          return new Response(JSON.stringify({ error: 'File not found' }), {
            status: 404,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        
        // 返回签名 URL
        return new Response(JSON.stringify({
          success: true,
          downloadUrl: signedUrl.url,
          expiresAt: new Date(Date.now() + 3600000).toISOString(),
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
        
      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }
    
    // 健康检查
    if (url.pathname === '/health') {
      return new Response(JSON.stringify({ status: 'ok' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    return new Response('Not Found', { status: 404, headers: corsHeaders });
  },
};
