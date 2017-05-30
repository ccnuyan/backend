ALTER TABLE entrys
ADD CONSTRAINT channel_entrys
FOREIGN KEY (channel_id) REFERENCES channels(id)
ON DELETE CASCADE;