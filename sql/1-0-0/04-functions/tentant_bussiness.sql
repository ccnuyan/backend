-- get
set search_path=membership;

create or replace function get_tenants_by_ids(tids bigint[])
returns setof users
as $$
BEGIN
  set search_path=membership;

  return query
  select * from users where users.id = any(tids);
END;
$$ LANGUAGE plpgsql;

create or replace function get_tenant_by_id(tid bigint)
returns users
as $$
DECLARE
found_tenant users;
BEGIN
  set search_path=membership;
  select * from tenants where users.id = tid into found_tenant;
  return found_tenant;
END;
$$ LANGUAGE plpgsql;

-- tenant_tenants

create or replace function get_all_tenants()
returns setof users
as $$
BEGIN
  return query
  select 		
    *
  from 
    users
  where 
    users.role = 10;
END;
$$ LANGUAGE plpgsql;