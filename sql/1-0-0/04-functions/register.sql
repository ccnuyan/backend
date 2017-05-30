create or replace function register(un varchar, password varchar, is_admin boolean default false)
returns table(
  id bigint,
  username varchar(255),
  authentication_token varchar(36),
  role int,
  success boolean,
  message varchar(255)
) as $$
BEGIN
  set search_path=membership;
  -- see if they exist
  if not exists (select users.username from users where users.username = un) 
  then
    -- add them, get new id
    if is_admin 
    then
      insert into users(username, role)
      values (un,0)
      returning users.id, users.role into id, role;
    else
      insert into users(username)
      values (un)
      returning users.id, users.role into id, role;
    end if;
    -- add login for local
    insert into logins(user_id, provider_key, provider_token)
    values(id, un, crypt(password, gen_salt('bf', 10)));

    -- for token-based login
    authentication_token := random_string(36);
    insert into logins(user_id, provider, provider_key, provider_token)
    values(id, 'token', 'token', authentication_token);

    success := true;
    message := 'Welcome!';
  else
    success := false;
    select 'This username is already registered' into message;
  end if;

  -- return the goods
  return query
  select id, un, authentication_token, role, success, message;
END;
$$
language plpgsql;