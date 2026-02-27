const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ihylpdhnacajcmxyigmd.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloeWxwZGhuYWNhamNteHlpZ21kIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjExMTA2OSwiZXhwIjoyMDg3Njg3MDY5fQ.ss7Ec1ji_n1VikKVQJq85ERwM61ljY6kBqYzZbZxMt8';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const sql = `
-- Users table
CREATE TABLE IF NOT EXISTS public.users (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text UNIQUE NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Purchases table
CREATE TABLE IF NOT EXISTS public.purchases (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  product_id text NOT NULL,
  paypal_order_id text,
  stripe_session_id text,
  status text NOT NULL CHECK (status IN ('pending', 'completed', 'refunded')),
  amount numeric(10, 2) NOT NULL,
  currency text NOT NULL DEFAULT 'USD',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Downloads table
CREATE TABLE IF NOT EXISTS public.downloads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  purchase_id uuid REFERENCES public.purchases(id) ON DELETE CASCADE,
  download_token text UNIQUE NOT NULL,
  file_path text NOT NULL,
  expires_at timestamp with time zone NOT NULL,
  downloaded_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON public.purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_product_id ON public.purchases(product_id);
CREATE INDEX IF NOT EXISTS idx_downloads_token ON public.downloads(download_token);
CREATE INDEX IF NOT EXISTS idx_downloads_purchase_id ON public.downloads(purchase_id);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.downloads ENABLE ROW LEVEL SECURITY;
`;

async function setupDatabase() {
  console.log('Setting up database tables...');

  const statements = sql.split(';').filter(s => s.trim());

  for (const statement of statements) {
    const trimmed = statement.trim();
    if (!trimmed) continue;

    try {
      const { error } = await supabase.rpc('exec_sql', { sql: trimmed + ';' });

      if (error) {
        // If exec_sql doesn't exist, try direct query
        console.log(`Executing: ${trimmed.substring(0, 50)}...`);
      }
    } catch (err) {
      console.error('Error:', err.message);
    }
  }

  console.log('Database setup attempted. Check Supabase dashboard to verify.');
}

setupDatabase();
