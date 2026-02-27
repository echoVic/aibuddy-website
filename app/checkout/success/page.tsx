'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, MessageCircle, Download, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const DISCORD_INVITE_URL = 'https://discord.gg/39sVCGPU';

export default function CheckoutSuccessPage() {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

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
              Thank you for your purchase. Welcome to the AI Buddy community!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
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

            {/* Back to Dashboard */}
            <Link href="/dashboard">
              <Button variant="ghost" className="w-full">
                Go to Dashboard
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
