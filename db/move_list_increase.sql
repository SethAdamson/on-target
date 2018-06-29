update lists
set board_location = $3
where id = $1;

update lists
set board_location = board_location-1
where board_location <= $3 and board_location > $2 and id !=$1 and board_id=$4;

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
where boards.author_id = $5
order by board_location;