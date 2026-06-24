-- Supabase SQL: subscribers table
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS subscribers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Only allow service role (backend) to insert/select
CREATE POLICY "Allow service role insert" ON subscribers
  FOR INSERT TO service_role WITH CHECK (true);

CREATE POLICY "Allow service role select" ON subscribers
  FOR SELECT TO service_role USING (true);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);
CREATE INDEX IF NOT EXISTS idx_subscribers_created_at ON subscribers(created_at DESC);
