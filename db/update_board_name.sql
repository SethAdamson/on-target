update boards
set name = $1
where id = $2
returning *;