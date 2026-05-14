-- Create media bucket for general uploads (leaders, dept heads, etc)
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

-- Storage Policies
create policy "Media is publicly accessible."
  on storage.objects for select
  using ( bucket_id = 'media' );

create policy "Admins can upload media."
  on storage.objects for insert
  with check ( 
    bucket_id = 'media' 
    AND (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'))
  );

create policy "Admins can update media."
  on storage.objects for update
  using ( 
    bucket_id = 'media' 
    AND (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'))
  );

create policy "Admins can delete media."
  on storage.objects for delete
  using ( 
    bucket_id = 'media' 
    AND (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'))
  );
