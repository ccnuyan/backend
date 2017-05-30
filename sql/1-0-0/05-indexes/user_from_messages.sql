ALTER TABLE messages
ADD CONSTRAINT user_from_messages
FOREIGN KEY (user_from) REFERENCES users(id)
ON DELETE CASCADE;