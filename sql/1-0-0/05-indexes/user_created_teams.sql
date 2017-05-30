ALTER TABLE teams
ADD CONSTRAINT user_created_teams
FOREIGN KEY (created_by) REFERENCES users(id)
ON DELETE CASCADE;