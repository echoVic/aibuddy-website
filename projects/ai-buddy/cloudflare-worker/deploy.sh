#!/bin/bash
set -e

echo "🚀 Deploying Cloudflare Worker for R2 Downloads..."

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "Installing wrangler..."
    npm install -g wrangler
fi

# Login to Cloudflare (if not already logged in)
echo "Checking Cloudflare authentication..."
wrangler whoami || wrangler login

# Create R2 bucket if not exists
echo "Creating R2 bucket (if not exists)..."
wrangler r2 bucket create aibuddy-guides 2>/dev/null || echo "Bucket already exists"

# Deploy worker
echo "Deploying worker..."
wrangler deploy

echo "✅ Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Upload PDF files to R2 bucket:"
echo "   wrangler r2 object put aibuddy-guides/guides/openclaw-quickstart.pdf --file=../private/guides/openclaw-quickstart.pdf"
echo ""
echo "2. Test the API:"
echo "   curl -X POST https://aibuddy-download.your-subdomain.workers.dev/api/download-guide \\"
echo "     -H 'Content-Type: application/json' \\"
echo "     -d '{\"productId\":\"openclaw-quickstart\",\"email\":\"test@example.com\",\"orderId\":\"ORDER123\"}'"
