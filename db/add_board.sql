insert into boards (name, author_id, team_id)
values ($1, $2, $3)
returning id;