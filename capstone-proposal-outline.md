# Capstone-Git-Push-Mafia
#### Group 3: Matthew Maya (Developer 1), Kyle Box (Developer 2), Joey Tsui (Developer 3)

## Problem Statement:
Context: In many small to mid-sized companies, employees regularly incur business-related expenses that require tracking and approval — from travel costs to software purchases. These expenses are often submitted informally via spreadsheets, email threads, or paper receipts, leading to inconsistent workflows and administrative delays.

Core Problem: There is no streamlined, centralized platform for employees to submit and track their expenses, nor for managers to review and approve them efficiently. Current systems often lack role-based permissions and clarity, resulting in confusion over who submitted what, whether it was approved, or when reimbursement is expected.

Impact on Users: Employees feel uncertainty about the status of their expense submissions and often have to follow up manually.
- Managers lack visibility into spending trends and must deal with cluttered approval processes.
- Finance teams face difficulty reconciling records when expenses are scattered across tools or formats.

Opportunity for Solution: By building a centralized expense tracking application with role-based access (employees vs. managers), the expense reporting process can be made significantly more efficient and transparent.
- Employees will be able to easily submit, view, and update expenses.
- Managers will be able to approve or reject expenses from a dashboard.
- The organization as a whole will gain better control over its spending and improve the overall workflow between employees, management, and finance.

## Technical Solution

Overview of the Solution: We will build an expense tracking app for an individual company, which will divide operations between employees and managers based on permissions. Users create and update expenses which are then either approved, updated, or deleted by managers.

Key Features and Functionalities:

- findAllExpenses() - ADMIN & USER: finds a List of all expenses charged to the company displays relevant information ( associated employee, category, amount, description, date)
- findExpensesByCategory(categoryID) - ADMIN & USER: finds a List of all expenses (matching category id) charged to the company displays relevant information ( associated employee, amount, description, date)
- findExpenseByDateRange(startDate, endDate) - ADMIN & USER: finds a List of all expenses (within date range) charged to the company displays relevant information ( associated employee, amount, description, date)
- findByPriceRange(startPriceRange, endPriceRange) - ADMIN & USER: finds a List of all expenses (within price range) charged to the company displays relevant information ( associated employee, amount, description, date)
- findAllUsers() - ADMIN : finds a List of all users in the user database, displays relevant information: firstName, lastName, isAdmin, username, password
- addUser(user) - USER : adds a new user to the database
- deleteUser(userId)  - USER : removes a user from the database
- updateUser(userId) - ADMIN & USER : updates relevant user information (first_name, last_name, isAdmin (ADMIN only)
- addExpense(expense) - USER: adds expense to database, approved status is defaulted to false (can only be set to true by admin in updateApprovedStatus)
- updateExpense(expenseId) - ADMIN & USER: updates fields for an expense (except approvedStatus)
- updateApprovedStatus(expenseId) - ADMIN: alters approved status for an expense
- deleteExpense(expenseId) - ADMIN: removes an expense from the database

User Scenarios:

Scenario 1: Peter, an employee of Bob's Construction Co., use the expense tracker to keep track of the amount spent on labor, materials, and equipment.
Scenario 2: Bob, the owner of Bob's Construction Co., logs onto his account to review Peter's pending expenses and can decide whether to add/update/delete that exact expense.
Technology Stack:

Front End: React and Typescript
Backend: Spring Boot for creating a secure REST API to handle adding and manipulating transactions as well as users to the database.
Database: MySQL to store user and transaction data
Authentication: JWT (JSON Web Token) for secure user login and role management.

## Glossary
Company
A business or organization that uses the expense tracking system to manage and monitor employee-submitted expenses. Each company may have multiple users with different permission levels (employees and managers).

User
Any individual who has access to the expense tracking platform. Users can be either employees or managers (admins), and their permissions vary based on role.

Employee
A user who submits expenses for approval. Employees can create, view, and edit their own expense entries but cannot approve or delete them.

Admin
A user with elevated privileges who oversees submitted expenses. Managers can view all expenses, approve or reject them, update user information, and remove entries from the system. All managers are users, but not all users are managers.

Expense
A record of a cost incurred by an employee that needs to be tracked and reviewed. Each expense includes details such as amount, category, date, description, approval status, and the user who submitted it.

Approval Status
A flag indicating whether a submitted expense has been approved by a manager. New expenses default to “unapproved” and can only be marked “approved” by a manager.

Category
A classification for organizing expenses (e.g., travel, equipment, meals, software). Categories help both employees and managers track spending trends and manage budgets.

## High Level Requirements
Manage 4 Database Tables (from the schema)/MySQL Database Management
Plan to meet requirement:
We will design and implement 4 independent database entities that represent different core concepts within the application(users, login, category, expense). This will involve creating the database and populating it with production and test data.

Spring Boot, MVC, JDBC, Testing, React
Plan to meet requirement:
We will implement the backend of the application using Spring Boot, utilizing the MVC (Model-View-Controller) architecture for organizing the application structure. The JDBC will be used for database connections and data transactions. For the frontend, we will build the UI with React and TypeScript,  ensuring it is responsive and functional. I will also write unit tests to ensure the back end is meeting requirements and obeying business rules

An HTML and CSS UI Built with React
Plan to meet requirement:
We will create the user interface using React, ensuring a clean, user-friendly design with HTML and CSS. We will follow modern web development practices, including responsive design to ensure the app works on both mobile and desktop devices. The layout will be organized and intuitive for users to login and view, create, update, and delete transactions.

Sensible Layering and Pattern Choices
Plan to meet requirement:
We will follow best practices for application architecture, utilizing layered design patterns. This includes separating the logic into distinct layers such as controller, service, and repository. We will ensure that the backend follows the Single Responsibility Principle and that the code is easy to maintain and scale.

A Full Test Suite that Covers the Domain and Data Layers
Plan to meet requirement:
We will implement a comprehensive test suite for the project. This will include unit tests for the domain layer (services and models) and the data layer (repositories and database interactions). Test doubles for each repository will be created that mimic their behavior.

Must Have at Least 2 Roles (Example: User and Admin)
Plan to meet requirement:
We will implement role-based access control using Spring Security. The system will have at least two roles: User and Admin. Users will be able to add themselves to the user database, update information, and remove themselves, as well as do the same operations for transactions (exceptions delete and update approval status). Admins will be able to set transactions to approved and delete transactions, as well as view user login information in case it needs to be reset.

## User Stories
Create an Expense
Goal: As an user, I want to add an expense for reimbursement
Plan to meet requirement: I will create a form where users can fill out detailed information of the expense such as user info, date, total amount, category, description.
Precondition: User must be logged in.
Post-condition: The expense will either be approved or rejected by an admin

Update an Expense
Goal: As a user, I want to edit an expense.
Plan to meet requirement: I will create a form with information populate from the existing expense that we are trying to edit, where user can input the correct information for the expense
Precondition: User must be logged in to update the expense
Post-condition: The expense will be reviewed by admin and will either be rejected or approved

Approve an Expense
Goal: As an Admin, I want to either approve or reject an expense
Plan to meet requirement: I will create an Admin Dashboard where the admin can go through a list of expenses that are pending have approve and reject button
Precondition: User must be logged in and as ADMIN
Post-condition: The expense will either be approved or rejected.

Delete an Expense
Goal: As an admin, I want to remove an expense
Plan to meet requirement: I will display a table with the list of expenses in it where it will have a button that allows the admins to remove an expense
Precondition: User must be logged in and as ADMIN