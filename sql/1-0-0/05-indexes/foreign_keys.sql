ALTER TABLE logins
ADD CONSTRAINT logins_users
FOREIGN KEY (user_id) REFERENCES users(id)
ON DELETE CASCADE;

ALTER TABLE containers
ADD CONSTRAINT admin_created_containers
FOREIGN KEY (created_by) REFERENCES users(id)
ON DELETE CASCADE;

ALTER TABLE containers
ADD CONSTRAINT tenant_owned_containers
FOREIGN KEY (created_by) REFERENCES users(id)
ON DELETE CASCADE;