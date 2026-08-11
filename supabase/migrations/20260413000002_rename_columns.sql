-- Rename the lowercase column to camelCase explicitly
ALTER TABLE minibikes RENAME COLUMN shortname TO "shortName";

-- Force Supabase's API cache to reload
NOTIFY pgrst, 'reload schema';
