create table teams(
  id bigint primary key not null default id_generator(),

  created_by bigint not null,
  
  created_at timestamptz default now() not null,
  active boolean default true,
  name varchar(127)
);
