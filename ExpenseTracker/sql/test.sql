drop database if exists expense_tracker_test;
create database expense_tracker_test;
use expense_tracker_test;

-- create tables and relationships

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
updated_at datetime null,
approved bit not null,
reimbursed bit not null,
receipt_url VARCHAR(2048)
);

-- insert data
insert into category(category_id,category_name)
values
(1, 'LABOR'),
(2, 'MATERIALS'),
(3, 'TRANSPORTATION'),
(4, 'EQUIPMENT_RENTAL'),
(5, 'MISC');

insert into `user`(user_id, first_name, last_name)
values
(1, 'Kyle', 'Box'),
(2, 'Matthew', 'Maya'),
(3, 'Joey ', 'Tsui');

insert into expense (expense_id,user_id, category_id, amount, `description`, created_at, approved, reimbursed, receipt_url)
values
(1,1, 1, 150.79, 'Pay for this week','2025-04-06 06:03:49', 0, 0, 'https://www.example.org/'),
(2,2, 3, 70.50, 'Compensation for Gas', '2025-10-17 04:30:49', 1, 0, 'http://www.example.com/#actor'),
(3, 3, 2, 200.30, 'Compensation for Drywall Purchase','2025-02-28 02:15:49', 1, 1, 'https://www.example.net/?acoustics=alarm&belief=army');

-- set known good state for tests
delimiter //

create procedure set_known_good_state()
begin
delete from category;
delete from expense;
insert into `user`(user_id, first_name, last_name)
values
(1, 'Kyle', 'Box'),
(2, 'Matthew', 'Maya'),
(3, 'Joey ', 'Tsui');

insert into expense (expense_id,user_id, category_id, amount, `description`, created_at, approved, reimbursed, receipt_url)
values
(1,1, 1, 150.79, 'Pay for this week','2025-04-06 06:03:49', 0, 0, 'https://www.example.org/'),
(2,2, 3, 70.50, 'Compensation for Gas', '2025-10-17 04:30:49', 1, 0, 'http://www.example.com/#actor'),
(3, 3, 2, 200.30, 'Compensation for Drywall Purchase','2025-02-28 02:15:49', 1, 1, 'https://www.example.net/?acoustics=alarm&belief=army');

end //