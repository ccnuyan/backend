ALTER TABLE messages
ADD CONSTRAINT user_to_messages
FOREIGN KEY (user_to) REFERENCES users(id)
ON DELETE CASCADE;