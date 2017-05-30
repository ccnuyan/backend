-- get
set search_path=membership;

create or replace function get_containers_by_ids(cids bigint[])
returns setof containers
as $$
BEGIN
  set search_path=membership;

  return query
  select * from containers where containers.id = any(cids);
END;
$$ LANGUAGE plpgsql;

create or replace function get_container_by_id(cid bigint)
returns containers
as $$
DECLARE
found_container containers;
BEGIN
  set search_path=membership;
  select * from containers where containers.id = cid into found_container;
  return found_container;
END;
$$ LANGUAGE plpgsql;

-- tenant_containers

create or replace function get_tenant_containers(tid bigint)
returns setof containers
as $$
BEGIN
  return query
  select 		
    *
  from 
    containers
  where 
    containers.tenant_id = tid;
END;
$$ LANGUAGE plpgsql;

-- create_container

create or replace function create_container(uid bigint, tid bigint, nm membership.containers.name%type)
returns containers
as $$
DECLARE
new_container_id bigint;
BEGIN


  set search_path=membership;

  insert into containers(created_by, tenant_id, name) values (uid, tid, nm) returning containers.id into new_container_id;

  return get_container_by_id(new_container_id);
END;
$$ LANGUAGE plpgsql;

-- delete_container

create or replace function delete_container(uid bigint, tid bigint, cid bigint)
returns containers
as $$
DECLARE
container_tobe_delete containers;
BEGIN
  set search_path=membership;
  container_tobe_delete:=get_container_by_id(cid);
  delete from 
    containers 
  where 
    id=cid 
  and created_by = uid and containers.tenant_id = tid;
  return container_tobe_delete;
END;
$$ LANGUAGE plpgsql;

-- lock_containers

create or replace function lock_container(uid bigint, cid bigint)
returns containers
as $$
BEGIN
  set search_path=membership;
  update containers set active = false
  where id=cid and tenant_id = uid;
  return get_container_by_id(cid);
END;
$$ LANGUAGE plpgsql;

-- unlock_containers

create or replace function unlock_container(uid bigint, cid bigint)
returns containers
as $$
BEGIN
  set search_path=membership;
  update containers set active = true
  where id=cid and tenant_id = uid;
  return get_container_by_id(cid);
END;
$$ LANGUAGE plpgsql;