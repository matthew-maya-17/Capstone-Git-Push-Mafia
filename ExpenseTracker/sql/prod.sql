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

-- role
create table role (
role_id int primary key auto_increment,
`name` varchar(50) not null unique
);

-- login
create table login (
login_id int primary key auto_increment,
user_id int not null,
user_name varchar(50) not null unique,
`password` varchar(2048) not null,
role_id int not null,
disabled bit not null default 0,
constraint fk_login_user
	foreign key (user_id)
    references `user`(user_id),
    constraint fk_login_role
	foreign key (role_id)
    references role(role_id)
);

-- expense
create table expense (
expense_id int primary key auto_increment,
user_id int not null,
category_id int not null,
amount decimal(8,2) not null,
`description` VARCHAR(100) null,
created_at datetime not null,
updated_at datetime null,
approved bit not null,
reimbursed bit not null,
receipt_url VARCHAR(2048) not null,
constraint fk_expense_user
	foreign key (user_id)
    references `user`(user_id),
constraint fk_category_expense
	foreign key (category_id)
    references category(category_id)
);


-- insert data
insert into role(`name`)
values
('USER'),('ADMIN');

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
(3, 'Joey', 'Tsui');

-- stock data for charts
insert into expense (expense_id,user_id, category_id, amount, `description`, created_at, approved, reimbursed, receipt_url)
values

-- user 1 expenses
(1,1, 2, 70.06, 'Internet charges','2024-03-10 14:20:05', 1, 1, 'https://www.example.org/'),
(2,1, 3, 223.9, 'Pay for this week','2024-01-02 06:25:05', 1, 0, 'https://www.example.org/'),
(3,1, 4, 270.24, 'Pay for this week','2025-04-11 22:20:40', 0, 0, 'https://www.example.org/'),
(4,1, 2, 419.41, 'Internet charges','2025-05-14 19:36:14', 1, 1, 'https://www.example.org/'),
(5,1, 5, 220.36, 'Pay for this week','2025-06-07 21:19:01', 0, 0, 'https://www.example.org/'),
(6,1, 5, 300.52, 'Training course','2025-07-14 22:40:54', 1, 1, 'https://www.example.org/'),
(7,1, 4, 113.13, 'Travel expense','2024-03-13 15:12:46', 0, 0, 'https://www.example.org/'),
(8,1, 4, 327.82, 'Internet charges','2024-02-03 02:39:26', 0, 1, 'https://www.example.org/'),
(9,1, 3, 212.61, 'Travel expense','2024-11-08 04:08:39', 1, 0, 'https://www.example.org/'),
(10,1, 5, 399.96, 'Internet charges','2024-12-07 04:57:17', 0, 0, 'https://www.example.org/'),
(11,1, 3, 486.2, 'Office supplies','2025-02-22 10:06:27', 1, 1, 'https://www.example.org/'),
(12,1, 4, 422.6, 'Training course','2024-02-14 22:03:48', 0, 1, 'https://www.example.org/'),
(13,1, 1, 328.37, 'Pay for this week','2024-01-11 00:08:26', 0, 0, 'https://www.example.org/'),
(14,1, 4, 293.72, 'Reimbursement','2025-09-11 17:43:35', 0, 1, 'https://www.example.org/'),
(15,1, 1, 243.99, 'Client lunch','2024-10-02 21:01:38', 1, 0, 'https://www.example.org/'),
(16,1, 2, 83.25, 'Business dinner','2024-05-14 21:45:19', 1, 1, 'https://www.example.org/'),
(17,1, 3, 474.76, 'Internet charges','2024-08-05 23:47:41', 0, 1, 'https://www.example.org/'),
(18,1, 2, 174.56, 'Pay for this week','2025-09-14 13:41:33', 1, 0, 'https://www.example.org/'),
(19,1, 2, 321.69, 'Client lunch','2025-04-08 06:15:34', 0, 0, 'https://www.example.org/'),
(20,1, 1, 104.34, 'Business dinner','2025-11-14 01:10:36', 1, 0, 'https://www.example.org/'),
(21,1, 5, 485.94, 'Internet charges','2025-12-13 04:29:31', 1, 0, 'https://www.example.org/'),
(22,1, 3, 145.73, 'Travel expense','2025-08-11 11:47:17', 0, 0, 'https://www.example.org/'),
(23,1, 2, 186.21, 'Pay for this week','2025-07-09 18:45:15', 1, 1, 'https://www.example.org/'),
(24,1, 5, 474.35, 'Office supplies','2025-07-06 10:20:26', 0, 1, 'https://www.example.org/'),
(25,1, 4, 134.97, 'Conference ticket','2025-03-02 12:47:22', 1, 0, 'https://www.example.org/'),

-- user 2 expenses
(26,2, 1, 483.12, 'Parking fee','2024-04-01 12:00:00', 0, 1, 'https://www.example.org/'),
(27,2, 2, 174.51, 'Client lunch','2024-12-02 13:00:00', 1, 1, 'https://www.example.org/'),
(28,2, 4, 132.76, 'Training course','2025-02-02 18:59:00', 1, 0, 'https://www.example.org/'),
(29,2, 2, 113.4, 'Travel expense','2025-01-03 20:46:00', 0, 0, 'https://www.example.org/'),
(30,2, 5, 257.51, 'Client lunch','2025-03-02 15:07:00', 1, 1, 'https://www.example.org/'),
(31,2, 1, 188.03, 'Travel expense','2024-09-09 05:43:00', 0, 1, 'https://www.example.org/'),
(32,2, 5, 297.15, 'Internet charges','2025-04-14 14:03:00', 1, 0, 'https://www.example.org/'),
(33,2, 3, 396.44, 'Client lunch','2025-04-03 20:50:00', 1, 1, 'https://www.example.org/'),
(34,2, 1, 354.67, 'Travel expense','2024-05-01 03:11:00', 0, 0, 'https://www.example.org/'),
(35,2, 5, 117.09, 'Training course','2025-02-14 23:27:00', 0, 1, 'https://www.example.org/'),
(36,2, 3, 444.01, 'Pay for this week','2024-11-11 18:16:00', 1, 0, 'https://www.example.org/'),
(37,2, 4, 106.32, 'Client lunch','2025-03-12 04:25:00', 1, 0, 'https://www.example.org/'),
(38,2, 3, 364.75, 'Training course','2025-02-14 14:19:00', 0, 1, 'https://www.example.org/'),
(39,2, 1, 118.56, 'Office supplies','2025-01-12 20:59:00', 1, 0, 'https://www.example.org/'),
(40,2, 4, 170.94, 'Client lunch','2025-01-14 16:47:00', 0, 0, 'https://www.example.org/'),
(41,2, 2, 172.79, 'Training course','2025-01-14 03:21:00', 1, 1, 'https://www.example.org/'),
(42,2, 3, 272.25, 'Pay for this week','2025-03-08 08:32:00', 0, 0, 'https://www.example.org/'),
(43,2, 1, 222.93, 'Reimbursement','2025-04-06 05:41:00', 1, 1, 'https://www.example.org/'),
(44,2, 2, 173.8, 'Internet charges','2025-04-07 21:58:00', 1, 0, 'https://www.example.org/'),
(45,2, 4, 277.71, 'Office supplies','2025-04-15 10:28:00', 0, 1, 'https://www.example.org/'),
(46,2, 5, 289.3, 'Pay for this week','2025-04-02 01:05:00', 1, 0, 'https://www.example.org/'),
(47,2, 3, 426.67, 'Reimbursement','2025-04-13 11:13:00', 1, 0, 'https://www.example.org/'),
(48,2, 5, 392.38, 'Office supplies','2025-04-11 12:01:00', 0, 1, 'https://www.example.org/'),
(49,2, 1, 439.93, 'Internet charges','2025-04-14 22:34:00', 0, 0, 'https://www.example.org/'),
(50,2, 2, 245.89, 'Client lunch','2025-04-07 03:56:00', 1, 1, 'https://www.example.org/'),

-- user 3 expenses
(51,3, 1, 123.45, 'Travel expense','2024-02-01 10:15:00', 1, 0, 'https://www.example.org/'),
(52,3, 2, 210.67, 'Client lunch','2024-12-02 12:30:00', 0, 1, 'https://www.example.org/'),
(53,3, 3, 98.50, 'Training course','2025-01-03 14:45:00', 1, 1, 'https://www.example.org/'),
(54,3, 4, 175.00, 'Internet charges','2025-02-04 09:20:00', 0, 0, 'https://www.example.org/'),
(55,3, 5, 300.00, 'Reimbursement','2025-03-05 11:00:00', 1, 0, 'https://www.example.org/'),
(56,3, 1, 215.75, 'Office supplies','2025-03-06 08:10:00', 1, 1, 'https://www.example.org/'),
(57,3, 2, 134.90, 'Pay for this week','2024-07-07 07:45:00', 0, 1, 'https://www.example.org/'),
(58,3, 3, 450.30, 'Travel expense','2024-08-08 16:00:00', 1, 0, 'https://www.example.org/'),
(59,3, 4, 160.80, 'Client lunch','2024-09-09 10:05:00', 0, 0, 'https://www.example.org/'),
(60,3, 5, 240.60, 'Training course','2024-10-10 13:15:00', 1, 1, 'https://www.example.org/'),
(61,3, 1, 190.00, 'Internet charges','2024-11-11 09:30:00', 0, 1, 'https://www.example.org/'),
(62,3, 2, 310.25, 'Office supplies','2024-05-12 15:45:00', 1, 0, 'https://www.example.org/'),
(63,3, 3, 255.00, 'Reimbursement','2025-03-13 11:20:00', 1, 1, 'https://www.example.org/'),
(64,3, 4, 140.90, 'Pay for this week','2025-02-14 12:10:00', 0, 0, 'https://www.example.org/'),
(65,3, 5, 175.50, 'Client lunch','2025-01-15 10:50:00', 1, 0, 'https://www.example.org/'),
(66,3, 1, 289.99, 'Travel expense','2025-03-01 08:25:00', 1, 1, 'https://www.example.org/'),
(67,3, 2, 199.00, 'Internet charges','2025-02-02 10:40:00', 0, 1, 'https://www.example.org/'),
(68,3, 3, 130.75, 'Office supplies','2025-03-03 14:30:00', 1, 0, 'https://www.example.org/'),
(69,3, 4, 178.45, 'Training course','2024-07-04 09:50:00', 0, 0, 'https://www.example.org/'),
(70,3, 5, 159.60, 'Reimbursement','2025-03-05 15:05:00', 1, 1, 'https://www.example.org/'),
(71,3, 1, 123.80, 'Pay for this week','2025-02-06 12:35:00', 1, 0, 'https://www.example.org/'),
(72,3, 2, 144.90, 'Client lunch','2025-02-07 10:20:00', 0, 0, 'https://www.example.org/'),
(73,3, 3, 215.45, 'Internet charges','2025-04-08 13:50:00', 1, 1, 'https://www.example.org/'),
(74,3, 4, 278.10, 'Reimbursement','2025-04-09 11:15:00', 0, 1, 'https://www.example.org/'),
(75,3, 5, 199.95, 'Office supplies','2025-04-10 14:05:00', 1, 0, 'https://www.example.org/');


-- passwords are set to "P@ssw0rd!"
insert into login (user_id, user_name, `password`, role_id, disabled)
values
(1, "kbox799@gmail.com", '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 2, false),
(2, "mmaya@gmail.com",'$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1, false ),
(3, "jtsui@gmail.com",'$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1, true );

select * from expense;    
    





