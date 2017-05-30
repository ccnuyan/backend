create table replys(
  id bigint primary key not null default id_generator(),
  
  entry_id bigint not null,
  parent_id bigint not null,
  created_by bigint not null,

  depth int default 0,

  created_at timestamptz default now() not null,
  active boolean default true,
  title varchar(127),
  content varchar(65535)
);