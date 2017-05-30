set search_path = membership;

create table containers(
  id bigint primary key not null default id_generator(),
  tenant_id bigint not null,
  created_by bigint not null,
  created_at timestamptz default now() not null,
  active boolean default true,
  name varchar(127)
);
