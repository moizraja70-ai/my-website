-- Fix Admin Status Script for DentEdge
-- Replace the email below with the target user's email if different.
-- Current target: tarab_ali29@yahoo.com

-- 1. Inspect existing admin roles/tables to understand structure
-- This helps identify if admin status is stored in 'role', 'is_admin', or another column.
SELECT table_name, column_name
FROM information_schema.columns
WHERE table_schema = 'public'
  AND (column_name LIKE '%role%' OR column_name LIKE '%admin%')
ORDER BY table_name;

-- 2. Check the user in 'profiles' table (assuming standard Supabase setup)
-- This will show the current role/status for the user.
SELECT * FROM public.profiles WHERE email = 'tarab_ali29@yahoo.com';

-- 3. Check the user in 'users' table (if different from profiles)
SELECT * FROM public.users WHERE email = 'tarab_ali29@yahoo.com';

-- 4. UPDATE command to set admin status (Uncomment the correct one after inspecting above)

-- If 'role' column exists in 'profiles' and uses 'admin' value:
-- UPDATE public.profiles SET role = 'admin' WHERE email = 'tarab_ali29@yahoo.com';

-- If 'is_admin' boolean column exists in 'profiles':
-- UPDATE public.profiles SET is_admin = true WHERE email = 'tarab_ali29@yahoo.com';

-- If 'role' column exists in 'users' and uses 'admin' value:
-- UPDATE public.users SET role = 'admin' WHERE email = 'tarab_ali29@yahoo.com';

-- If 'is_admin' boolean column exists in 'users':
-- UPDATE public.users SET is_admin = true WHERE email = 'tarab_ali29@yahoo.com';

-- 5. Verification: Check the user again to confirm the update
SELECT * FROM public.profiles WHERE email = 'tarab_ali29@yahoo.com';
SELECT * FROM public.users WHERE email = 'tarab_ali29@yahoo.com';
