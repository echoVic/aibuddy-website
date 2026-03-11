import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Package, Settings } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Package className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Purchases</CardTitle>
              <CardDescription>View your purchase history</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/purchases">
                <Button variant="outline" className="w-full">View Purchases</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Download className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Downloads</CardTitle>
              <CardDescription>Download your products</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/downloads">
                <Button variant="outline" className="w-full">View Downloads</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Settings className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Settings</CardTitle>
              <CardDescription>Manage your account</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" disabled>Coming Soon</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}