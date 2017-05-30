ALTER TABLE replys
ADD CONSTRAINT user_created_replys
FOREIGN KEY (created_by) REFERENCES users(id)
ON DELETE CASCADE;