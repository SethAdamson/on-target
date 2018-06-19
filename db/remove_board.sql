delete from boards
where id = $1;

select * from boards 
where author_id = $2
order by id;