ALTER TABLE channels
ADD CONSTRAINT user_created_channels
FOREIGN KEY (created_by) REFERENCES users(id)
ON DELETE CASCADE;