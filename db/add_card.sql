insert into cards (title, list_id, list_location, author_id)
values ($1, $2, $3, $4);

select
cards.id,
cards.title as card_title,
description,
list_id,
list_location,
author_id,
board_id
from cards

join lists on cards.list_id = lists.id
where board_id = $5;