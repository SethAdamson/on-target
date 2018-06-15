update boards
set background_color = $1, background_img = null
where id = $2
returning *;