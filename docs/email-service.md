# Email Service Setup

## Overview

Email service is powered by [Resend](https://resend.com) - a modern email API for developers.

## Features

- Purchase confirmation emails
- Download link delivery (7-day expiration)
- GitHub repo access instructions
- 1v1 consultation booking links

## Setup Instructions

### 1. Get Resend API Key

1. Sign up at https://resend.com
2. Add your domain (aibuddy.ltd)
3. Verify domain ownership (DNS records)
4. Create an API key

### 2. Configure Environment Variables

Add to `.env.local`:

```bash
RESEND_API_KEY=re_your_api_key_here
```

### 3. Install Dependencies

```bash
npm install resend
```

### 4. Set Up Database Tables

Run the SQL in `supabase/schema.sql` in your Supabase SQL Editor.

Required tables:
- `users` - Customer information
- `purchases` - Order records
- `downloads` - Download tokens and expiration

## Email Flow

1. Customer completes PayPal checkout
2. Frontend calls `/api/capture` with order ID
3. Server captures payment via PayPal API
4. Server extracts customer email from order details
5. Server saves purchase to database
6. Server generates secure download token (for PDF products)
7. Server sends confirmation email with:
   - Order details
   - Download link (if applicable)
   - GitHub repo access (if applicable)
   - Calendly booking link (for consultations)

## Testing

### Test Email Sending

```bash
# Start dev server
npm run dev

# Make a test purchase using PayPal sandbox
# Check console logs for email sending status
```

### Sandbox Mode

PayPal is currently in sandbox mode. Use [PayPal Sandbox Accounts](https://developer.paypal.com/dashboard/accounts) to test purchases without real money.

## Troubleshooting

### Email not sent

- Check `RESEND_API_KEY` is set correctly
- Verify domain is verified in Resend dashboard
- Check server logs for error messages

### Download link not working

- Ensure `downloadUrl` is set in product config (`lib/products.ts`)
- Check database has download record with valid token
- Verify token hasn't expired (7 days)

### Database errors

- Ensure Supabase service role key is configured
- Run schema.sql to create required tables
- Check RLS policies allow service role access

## Customization

Edit `lib/email/templates.ts` to customize email:
- Colors and branding
- Email copy
- Additional sections

## Production Checklist

- [ ] Domain verified in Resend
- [ ] API key uses production environment
- [ ] Database tables created
- [ ] RLS policies configured
- [ ] Download files uploaded to storage
- [ ] PayPal switched to live mode
- [ ] Tested complete purchase flow
