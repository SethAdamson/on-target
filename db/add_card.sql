insert into cards (title, list_id, author_id)
values ($1, $2, $3);

select
cards.id,
cards.title as card_title,
description,
list_id,
author_id,
board_id
from cards

join lists on cards.list_id = lists.id
where board_id = $4;