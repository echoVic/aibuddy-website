'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { products } from '@/lib/products';

interface DownloadItem {
  productId: string;
  name: string;
  description: string;
  downloadUrl?: string;
  expiresAt?: string;
  status: 'loading' | 'ready' | 'error';
}

export default function DownloadContent() {
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);

  useEffect(() => {
    // 获取可下载的产品列表
    const availableProducts = products.filter(p => p.price > 0 && !p.comingSoon);
    
    // 初始化状态
    setDownloads(availableProducts.map(p => ({
      productId: p.id,
      name: p.name,
      description: p.description,
      status: 'loading',
    })));

    // TODO: 从后端获取实际的下载链接
    // 这里模拟 API 调用
    const fetchDownloadUrls = async () => {
      for (const product of availableProducts) {
        try {
          // 调用 Cloudflare Worker 获取签名 URL
          // const response = await fetch('https://aibuddy-download.your-subdomain.workers.dev/api/download-guide', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify({ productId: product.id, email: 'user@example.com', orderId: 'ORDER123' }),
          // });
          // const data = await response.json();
          
          // 模拟延迟
          await new Promise(resolve => setTimeout(resolve, 500));
          
          setDownloads(prev => prev.map(d => 
            d.productId === product.id 
              ? { ...d, status: 'ready' }
              : d
          ));
        } catch (error) {
          setDownloads(prev => prev.map(d => 
            d.productId === product.id 
              ? { ...d, status: 'error' }
              : d
          ));
        }
      }
    };

    fetchDownloadUrls();
  }, []);

  const handleDownload = async (productId: string) => {
    // TODO: 实际调用 Worker 获取签名 URL
    alert('下载功能需要配置 Cloudflare Worker 和 R2');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">我的下载</h1>
        <p className="text-muted-foreground mt-2">
          购买的产品可以在这里下载，链接有效期 1 小时
        </p>
      </div>

      <div className="grid gap-4">
        {downloads.map((item) => (
          <Card key={item.productId}>
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {item.status === 'loading' && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 animate-spin" />
                  正在准备下载链接...
                </div>
              )}
              
              {item.status === 'ready' && (
                <Button onClick={() => handleDownload(item.productId)}>
                  <Download className="mr-2 h-4 w-4" />
                  立即下载
                </Button>
              )}
              
              {item.status === 'error' && (
                <div className="flex items-center gap-2 text-sm text-red-500">
                  <AlertCircle className="h-4 w-4" />
                  获取下载链接失败，请刷新重试或联系客服
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-muted rounded-lg p-4 text-sm text-muted-foreground">
        <div className="flex items-start gap-2">
          <CheckCircle className="h-4 w-4 mt-0.5 text-green-500" />
          <div>
            <p className="font-medium text-foreground">下载说明</p>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>每个下载链接有效期为 1 小时</li>
              <li>可以多次下载，过期后重新生成链接即可</li>
              <li>有问题请联系 support@aibuddy.ltd</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
