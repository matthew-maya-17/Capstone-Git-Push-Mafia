drop database if exists expense_tracker;
create database expense_tracker;
use expense_tracker;

-- create tabels and relationships

-- category
create table category (
category_id int primary key auto_increment,
category_name varchar(50) not null
);

-- user
create table `user` (
user_id int primary key auto_increment,
first_name varchar(50) not null,
last_name varchar(50) not null
);

-- login
create table login (
login_id int primary key auto_increment,
user_id int not null,
user_name varchar(50) not null,
password varchar(72) not null,
is_admin bit not null,
constraint fk_login_user
	foreign key (user_id)
    references `user`(user_id)
);

-- expense
create table expense (
expense_id int primary key auto_increment,
user_id int not null,
category_id int not null,
amount decimal(8,2) not null,
description VARCHAR(100) null,
created_at datetime not null,
updated_at datetime not null,
approved bit not null,
reimbursed bit not null,
receipt_url VARCHAR(2048)
);





