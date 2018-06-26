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
where board_id = $1
order by list_location;
