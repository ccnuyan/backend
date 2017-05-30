create table messages(
  id bigint primary key not null default id_generator(),

  team_id bigint not null,
  channel_id bigint not null,
  user_from bigint not null,
  user_to bigint not null,
  
  created_at timestamptz default now() not null,
  content varchar(65535)
);