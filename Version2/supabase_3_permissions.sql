-- ==========================================
-- FIX ROW LEVEL SECURITY PERMISSIONS
-- ==========================================

-- 1. Ensure RLS is active
ALTER TABLE public.portfolio_messages ENABLE ROW LEVEL SECURITY;

-- 2. Drop any existing potentially conflicting policies
DROP POLICY IF EXISTS "Allow internal insert" ON public.portfolio_messages;
DROP POLICY IF EXISTS "Allow internal select" ON public.portfolio_messages;
DROP POLICY IF EXISTS "Allow internal delete" ON public.portfolio_messages;
DROP POLICY IF EXISTS "Enable insert for everyone" ON public.portfolio_messages;
DROP POLICY IF EXISTS "Enable read access for authenticated users only" ON public.portfolio_messages;
DROP POLICY IF EXISTS "Enable delete access for authenticated users only" ON public.portfolio_messages;

-- 3. Policy: Allow ANYONE (both anon and authenticated) to submit a contact form message
CREATE POLICY "Enable insert for everyone" 
ON public.portfolio_messages 
FOR INSERT 
TO public 
WITH CHECK (true);

-- 4. Policy: Allow ONLY logged in admins to view the messages
CREATE POLICY "Enable read access for authenticated users only" 
ON public.portfolio_messages 
FOR SELECT 
TO authenticated 
USING (true);

-- 5. Policy: Allow ONLY logged in admins to delete messages
CREATE POLICY "Enable delete access for authenticated users only" 
ON public.portfolio_messages 
FOR DELETE 
TO authenticated 
USING (true);
