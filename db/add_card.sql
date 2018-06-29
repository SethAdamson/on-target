insert into cards (title, list_id, list_location, author_id)
values ($1, $2, $3, $4);

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
where author_id = $5;