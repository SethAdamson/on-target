insert into lists (title, board_id)
values('To-Do', $1);

insert into lists (title, board_id)
values('Planning', $1);

insert into lists (title, board_id)
values('In-Progress', $1);

insert into lists (title, board_id)
values('Completed', $1);

select * from boards 
where author_id = $2
order by id;