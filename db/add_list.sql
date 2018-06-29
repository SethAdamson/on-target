insert into lists (title, board_location, board_id)
values ($1, $2, $3);

select 
author_id,
team_id,
lists.id as list_id,
title as list_title,
name as board_name,
board_location,
board_id
from boards

join lists on boards.id = lists.board_id
where boards.author_id = $4
order by board_location;