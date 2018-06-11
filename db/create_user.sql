insert into users (first_name, last_name, profile_img, username, email, auth_id)
values ($1, $2, $3, $4, $5, $6)
returning *;