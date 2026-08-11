-- Safely add any missing columns to 'minibikes'
ALTER TABLE minibikes 
  ADD COLUMN IF NOT EXISTS shortName TEXT,
  ADD COLUMN IF NOT EXISTS color TEXT,
  ADD COLUMN IF NOT EXISTS description TEXT,
  ADD COLUMN IF NOT EXISTS price NUMERIC DEFAULT 0,
  ADD COLUMN IF NOT EXISTS image TEXT,
  ADD COLUMN IF NOT EXISTS images TEXT[];

-- Force Supabase's API cache to reload so it notices the new columns!
NOTIFY pgrst, 'reload schema';
