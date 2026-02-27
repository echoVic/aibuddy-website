import { NextRequest, NextResponse } from 'next/server';
import { capturePayPalOrder, getPayPalOrder } from '@/lib/paypal/client';
import { supabaseAdmin } from '@/lib/supabase/client';
import { sendEmail } from '@/lib/email/client';
import { purchaseConfirmationTemplate } from '@/lib/email/templates';
import { products, getProduct } from '@/lib/products';
import { randomUUID } from 'crypto';

// Generate a secure download token
function generateDownloadToken(): string {
  return randomUUID();
}

// Calculate expiration date (7 days from now)
function getExpirationDate(): Date {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return date;
}

export async function POST(request: NextRequest) {
  try {
    const { orderId } = await request.json();

    console.log('Capturing PayPal order:', orderId);

    // Get order details first to extract customer email and product info
    const orderDetails = await getPayPalOrder(orderId);
    console.log('Order details:', JSON.stringify(orderDetails, null, 2));

    // Capture the payment
    const capture = await capturePayPalOrder(orderId);
    console.log('Payment captured:', capture.id, capture.status);

    // Extract customer email from payer info
    const customerEmail = orderDetails.payer?.email_address;
    const customerName = orderDetails.payer?.name?.given_name || '';

    if (!customerEmail) {
      console.error('No customer email found in order');
      return NextResponse.json(
        { error: 'Customer email not found' },
        { status: 400 }
      );
    }

    // Get product info from purchase unit
    const purchaseUnit = capture.purchase_units?.[0];
    const productId = purchaseUnit?.reference_id;
    const product = getProduct(productId);

    if (!product) {
      console.error('Product not found:', productId);
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 400 }
      );
    }

    // Generate download token for digital products
    let downloadUrl: string | undefined;
    let downloadToken: string | undefined;

    if (product.type === 'pdf' && product.downloadUrl) {
      downloadToken = generateDownloadToken();
      downloadUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/download?token=${downloadToken}`;
    }

    // Save order to database if Supabase is configured
    if (supabaseAdmin) {
      try {
        // Check if user exists, create if not
        const { data: existingUser } = await supabaseAdmin
          .from('users')
          .select('id')
          .eq('email', customerEmail)
          .single();

        let userId = existingUser?.id;

        if (!userId) {
          // Create new user
          const { data: newUser, error: userError } = await supabaseAdmin
            .from('users')
            .insert({ email: customerEmail })
            .select('id')
            .single();

          if (userError) {
            console.error('Failed to create user:', userError);
          } else {
            userId = newUser.id;
          }
        }

        // Create purchase record
        const { data: purchase, error: purchaseError } = await supabaseAdmin
          .from('purchases')
          .insert({
            user_id: userId,
            product_id: productId,
            paypal_order_id: orderId,
            status: 'completed',
            amount: product.price,
            currency: product.currency,
          })
          .select('id')
          .single();

        if (purchaseError) {
          console.error('Failed to save purchase:', purchaseError);
        } else if (downloadToken) {
          // Create download record
          const { error: downloadError } = await supabaseAdmin
            .from('downloads')
            .insert({
              purchase_id: purchase.id,
              download_token: downloadToken,
              file_path: product.downloadUrl,
              expires_at: getExpirationDate().toISOString(),
            });

          if (downloadError) {
            console.error('Failed to save download:', downloadError);
          }
        }
      } catch (dbError) {
        console.error('Database error:', dbError);
        // Don't fail the request if DB save fails - we still want to send email
      }
    } else {
      console.warn('Supabase admin not configured, skipping database save');
    }

    // Send confirmation email
    const emailResult = await sendEmail({
      to: customerEmail,
      subject: `购买确认 - ${product.name}`,
      html: purchaseConfirmationTemplate({
        customerName,
        product,
        orderId,
        downloadUrl,
      }),
    });

    if (!emailResult.success) {
      console.error('Failed to send email:', emailResult.error);
      // Don't fail the request if email fails, but log it
    }

    return NextResponse.json({
      success: true,
      capture,
      emailSent: emailResult.success,
    });
  } catch (error) {
    console.error('Capture error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to capture payment', details: errorMessage },
      { status: 500 }
    );
  }
}
