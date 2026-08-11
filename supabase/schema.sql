-- Create Minibikes Table
CREATE TABLE IF NOT EXISTS minibikes (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  shortName TEXT,
  color TEXT,
  description TEXT,
  price NUMERIC NOT NULL,
  image TEXT,
  images TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Note: We are not creating a 'reviews' table as per the user's instructions to keep reviews static.

-- Create storage bucket for bike images
-- Run this in your Supabase SQL editor or via the Dashboard UI:
insert into storage.buckets (id, name, public) values ('bike-images', 'bike-images', true)
ON CONFLICT (id) DO NOTHING;

-- Set up Storage Policies to allow frontend uploads
-- Note: Because we are using custom password auth instead of Supabase Auth, we allow public uploads to this bucket.
create policy "Allow public viewing"
on storage.objects for select
to public
using ( bucket_id = 'bike-images' );

create policy "Allow public uploads"
on storage.objects for insert
to public
with check ( bucket_id = 'bike-images' );

create policy "Allow public deletes"
on storage.objects for delete
to public
using ( bucket_id = 'bike-images' );
