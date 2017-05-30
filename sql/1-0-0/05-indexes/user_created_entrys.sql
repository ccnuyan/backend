ALTER TABLE entrys
ADD CONSTRAINT user_created_entrys
FOREIGN KEY (created_by) REFERENCES users(id)
ON DELETE CASCADE;