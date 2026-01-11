-- Create the RPC function for bulk updating sort order
create or replace function upsert_media_order(payload jsonb)
returns void
language plpgsql
as $$
declare
  item jsonb;
begin
  for item in select * from jsonb_array_elements(payload)
  loop
    update media_items
    set sort_order = (item->>'sort_order')::int
    where id = (item->>'id')::uuid;
  end loop;
end;
$$;
