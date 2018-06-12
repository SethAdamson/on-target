create table users (
    id serial primary key,
    first_name varchar(50) not null,
    last_name varchar(100) not null,
    profile_img text,
    username varchar(255) not null unique,
    email varchar(255) not null unique,
    auth_id text not null
);

create table teams (
    id serial primary key,
    name varchar(255)
);

create table boards (
    id serial primary key,
    name varchar(100) not null,
    background_color text,
    author_id integer references users(id),
    team_id integer references teams(id)
);

create table lists (
    id serial primary key,
    title varchar(50) not null,
    board_id integer references boards(id)
);

create table cards (
    id serial primary key,
    title varchar(255) not null,
    description varchar(1000),
    list_id integer references lists(id),
    author_id integer references users(id)
);