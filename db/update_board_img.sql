update boards
set background_img = $1
where id = $2
returning *;