-- Fix content table RLS policy for secure admin access
-- Run this in your Supabase SQL editor

-- Drop the existing policies
DROP POLICY IF EXISTS "Content is writable by authenticated users" ON content;
DROP POLICY IF EXISTS "Content is publicly writable" ON content;

-- Create new policy that only allows service role writes
CREATE POLICY "Content is writable by service role only" ON content FOR ALL USING (auth.role() = 'service_role');
