update cards
set list_location = $3
where id = $1;

update cards
set list_location = list_location+1
where list_location >= $3 and list_location < $2 and id !=$1 and list_id = $4;

select
cards.id,
cards.title as card_title,
description,
list_id,
lists.title as list_title,
list_location,
author_id,
board_id,
card_img,
card_file
from cards

join lists on cards.list_id = lists.id
where author_id = $5
order by list_location;
