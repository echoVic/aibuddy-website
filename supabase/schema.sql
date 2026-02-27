-- AI Buddy Database Schema
-- Run this in Supabase SQL Editor

-- Users table (extends Supabase auth.users)
create table if not exists public.users (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.users enable row level security;

-- Purchases table
create table if not exists public.purchases (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users(id) on delete cascade,
  product_id text not null,
  paypal_order_id text,
  stripe_session_id text,
  status text not null check (status in ('pending', 'completed', 'refunded')),
  amount numeric(10, 2) not null,
  currency text not null default 'USD',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.purchases enable row level security;

-- Downloads table
create table if not exists public.downloads (
  id uuid default gen_random_uuid() primary key,
  purchase_id uuid references public.purchases(id) on delete cascade,
  download_token text unique not null,
  file_path text not null,
  expires_at timestamp with time zone not null,
  downloaded_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.downloads enable row level security;

-- Create indexes for performance
create index if not exists idx_purchases_user_id on public.purchases(user_id);
create index if not exists idx_purchases_product_id on public.purchases(product_id);
create index if not exists idx_downloads_token on public.downloads(download_token);
create index if not exists idx_downloads_purchase_id on public.downloads(purchase_id);

-- RLS Policies

-- Users can only read their own data
create policy "Users can view own profile"
  on public.users for select
  using (auth.uid()::text = id::text);

-- Users can only view their own purchases
create policy "Users can view own purchases"
  on public.purchases for select
  using (user_id::text = auth.uid()::text);

-- Service role can manage all data (for server-side operations)
create policy "Service role can manage users"
  on public.users for all
  using (true)
  with check (true);

create policy "Service role can manage purchases"
  on public.purchases for all
  using (true)
  with check (true);

create policy "Service role can manage downloads"
  on public.downloads for all
  using (true)
  with check (true);
