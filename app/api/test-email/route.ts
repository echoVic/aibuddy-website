import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email/client';
import { purchaseConfirmationTemplate } from '@/lib/email/templates';
import { products } from '@/lib/products';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Get the quick start guide product for testing
    const product = products.find(p => p.id === 'openclaw-quickstart');
    
    if (!product) {
      return NextResponse.json(
        { error: 'Test product not found' },
        { status: 500 }
      );
    }

    // Generate a test download URL
    const downloadUrl = `${process.env.NEXT_PUBLIC_APP_URL}/guides/openclaw-quickstart.pdf`;

    // Send test email
    const result = await sendEmail({
      to: email,
      subject: `【测试】购买确认 - ${product.name}`,
      html: purchaseConfirmationTemplate({
        customerName: '测试用户',
        product,
        orderId: 'TEST-' + Date.now(),
        downloadUrl,
      }),
    });

    if (!result.success) {
      return NextResponse.json(
        { error: 'Failed to send email', details: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully',
      emailId: result.id,
    });
  } catch (error) {
    console.error('Test email error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Test failed', details: errorMessage },
      { status: 500 }
    );
  }
}
