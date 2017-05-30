ALTER TABLE messages
ADD CONSTRAINT channel_messages
FOREIGN KEY (channel_id) REFERENCES channels(id)
ON DELETE CASCADE;