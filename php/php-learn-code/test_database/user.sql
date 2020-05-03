create table if not exists user(
    id int primary key auto_increment,
    name varchar(32) not null,
    email varchar(32),
    created_at timestamp,
    status smallint default 0
);

insert into user (name,email,created_at) values 
('buuug7','youpp@126.com',now()),
('bob',"3190136675@qq.com",now());