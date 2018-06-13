update lists
set title = $1
where id = $2;

select 
author_id,
team_id,
lists.id as list_id,
title as list_title,
name as board_name
from boards

join lists on boards.id = lists.board_id
where boards.id = $3
order by list_id;