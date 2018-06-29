update lists
set title = $1
where id = $2;

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
where boards.author_id = $3
order by board_location;