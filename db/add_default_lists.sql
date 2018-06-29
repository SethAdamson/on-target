insert into lists (title, board_id, board_location)
values('To-Do', $1, 0);

insert into lists (title, board_id, board_location)
values('Planning', $1, 1);

insert into lists (title, board_id, board_location)
values('In-Progress', $1, 2);

insert into lists (title, board_id, board_location)
values('Completed', $1, 3);

select * from boards 
where author_id = $2
order by id;