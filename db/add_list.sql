insert into lists (title, board_id)
values ($1, $2);

select 
author_id,
team_id,
lists.id as list_id,
title as list_title,
name as board_name,
board_location
from boards

join lists on boards.id = lists.board_id
where boards.id = $2
order by board_location;