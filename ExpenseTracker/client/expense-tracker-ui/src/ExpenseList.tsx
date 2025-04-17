import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthFetch } from "./AuthFetch";

// Typing for Expense
type CategoryId = 1 | 2 | 3 | 4 | 5;

type Expense = {
  expenseId: number;
  userId: number;
  categoryId: CategoryId;
  amount: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  approved: boolean;
  reimbursed: boolean;
  receiptUrl: string;
};

// CATEGORY_MAP, typing keys and values
const CATEGORY_MAP: Record<CategoryId, string> = {
  1: "Labor",
  2: "Materials",
  3: "Transportation",
  4: "Equipment Rental",
  5: "Misc",
};

const ExpenseList = () => {
  // STATE: Expenses
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // Getting the JWT Token from localStorage
  const token = localStorage.getItem("jwtToken");

  const url = "http://localhost:8080/api/expense";
  const navigate = useNavigate();

  // useEffect to fetch data when component mounts
  useEffect(() => {
    AuthFetch(url)
      .then((response: Promise<Expense[]>) => {
        if (response.status === 200) {
          return response.json() as Promise<Expense[]>;  // Typing the JSON response
        } else {
          return Promise.reject(`Unexpected Status Code: ${response.status}`);
        }
      })
      .then((data) => setExpenses(data))  // Set the state with the fetched data
      .catch(console.error);  // Handle errors
  }, []); // Call once on page load

  // Handle delete expense
  const handleDeleteExpense = (expenseId: number): void => {
    const expense = expenses.find((ex) => ex.expenseId === expenseId);
    if (expense && window.confirm(`Delete Expense Id #${expense.expenseId}`)) {
      const init = {
        method: "DELETE",
      };
      AuthFetch(`${url}/${expenseId}`, init)
        .then((response) => {
          if (response.status === 204) {
            // Remove the deleted expense from the array
            const newExpenses = expenses.filter((ex) => ex.expenseId !== expenseId);
            setExpenses(newExpenses);
          } else {
            return Promise.reject(`Unexpected Status Code: ${response.status}`);
          }
        })
        .catch(console.error); // Log errors
    }
  };

  return (
    <div className="container" style={{ maxWidth: "90%" }}>
      <table className="table table-striped table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>User Id</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Approved?</th>
            <th>Reimbursed?</th>
            <th>Receipt URL</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.expenseId}>
              <td>{expense.userId}</td>
              <td>{CATEGORY_MAP[expense.categoryId]}</td>
              <td>${Number(expense.amount).toFixed(2)}</td>
              <td>{expense.description}</td>
              <td>{expense.createdAt}</td>
              <td>{expense.updatedAt}</td>
              <td>{expense.approved ? "Yes" : "No"}</td>
              <td>{expense.reimbursed ? "Yes" : "No"}</td>
              <td>{expense.receiptUrl}</td>
              <td>
                <Link
                  className="btn btn-outline-warning mr-4"
                  to={`/expense/edit/${expense.expenseId}`}
                >
                  Update
                </Link>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleDeleteExpense(expense.expenseId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link className="btn btn-outline-success mb-4" to={"/expense/add"}>
        Add an Expense
      </Link>
    </div>
  );
};

export default ExpenseList;
