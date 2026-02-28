'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, MessageCircle, Download, ArrowRight, Mail } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const DISCORD_INVITE_URL = 'https://discord.gg/39sVCGPU';

export default function SuccessContent() {
  const [orderSaved, setOrderSaved] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const email = searchParams.get('email');
  const productId = searchParams.get('productId');
  const productName = searchParams.get('productName') || 'AI Buddy Product';
  const amount = searchParams.get('amount');

  useEffect(() => {
    // Save order and send email after successful payment
    if (orderId && email && !orderSaved) {
      saveOrderAndSendEmail();
    }
  }, [orderId, email, orderSaved]);

  const saveOrderAndSendEmail = async () => {
    try {
      // Save order to database
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          productId,
          productName,
          amount: parseFloat(amount || '0'),
          paypalOrderId: orderId,
          status: 'completed',
        }),
      });

      setOrderSaved(true);

      // Send confirmation email
      const emailRes = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: email,
          subject: `Thank you for your purchase - ${productName}`,
          html: `
            <h1>Thank you for your purchase!</h1>
            <p>Hi there,</p>
            <p>Your order for <strong>${productName}</strong> has been confirmed.</p>
            <p>Amount paid: $${amount}</p>
            <p>Order ID: ${orderId}</p>
            <p>You can access your downloads at: <a href="https://aibuddy.ltd/dashboard/downloads">https://aibuddy.ltd/dashboard/downloads</a></p>
            <p>Join our Discord community: <a href="${DISCORD_INVITE_URL}">${DISCORD_INVITE_URL}</a></p>
            <br/>
            <p>Best regards,<br/>AI Buddy Team</p>
          `,
        }),
      });

      if (emailRes.ok) {
        setEmailSent(true);
      }
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        {/* Success Card */}
        <Card className="border-green-500/20">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-2xl">Payment Successful!</CardTitle>
            <CardDescription>
              Thank you for purchasing <strong>{productName}</strong>. 
              {emailSent && " A confirmation email has been sent to your inbox."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Email Confirmation */}
            {emailSent && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-sm">Check Your Email</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      We&apos;ve sent a confirmation email to <strong>{email}</strong> with your order details and download link.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Discord CTA */}
            <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <MessageCircle className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">Join Our Discord Community</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Connect with other members, get support, and access exclusive content.
                  </p>
                  <a 
                    href={DISCORD_INVITE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full mt-3 bg-[#5865F2] hover:bg-[#4752C4]">
                      Join Discord Server
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>

            {/* Download CTA */}
            <div className="flex items-center gap-3 p-4 border rounded-lg">
              <Download className="h-5 w-5 text-primary" />
              <div className="flex-1">
                <h3 className="font-semibold text-sm">Access Your Products</h3>
                <p className="text-sm text-muted-foreground">
                  Download your purchased guides and resources
                </p>
              </div>
              <Link href="/dashboard/downloads">
                <Button variant="outline" size="sm">
                  Downloads
                </Button>
              </Link>
            </div>

            {/* Back to Home */}
            <Link href="/">
              <Button variant="ghost" className="w-full">
                Back to Home
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Support Footer */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Need help? Contact us at{' '}
          <a href="mailto:support@aibuddy.ltd" className="text-primary hover:underline">
            support@aibuddy.ltd
          </a>
        </p>
      </div>
    </div>
  );
}
