delete from cards 
where id = $2;

update cards
set list_location = list_location-1
where list_location > $3 and id !=$2 and list_id=$4;

select
cards.id,
cards.title as card_title,
description,
list_id,
lists.title as list_title,
author_id,
board_id,
card_img,
card_file
from cards

join lists on cards.list_id = lists.id
where author_id = $1;
