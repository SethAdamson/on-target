select * from boards 
where author_id = $1
order by id;
