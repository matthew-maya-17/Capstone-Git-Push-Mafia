import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthFetch } from "./AuthFetch";
import AuthLink from "./AuthLink";
import { jwtDecode } from "jwt-decode";

const CATEGORY_MAP = {
  1: "Labor",
  2: "Materials",
  3: "Transportation",
  4: "Equipment Rental",
  5: "Misc",
};

function ExpenseList() {
  // STATE
  const [expenses, setExpenses] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const url = "http://localhost:8080/api/expense";

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decoded = jwtDecode(token);
      console.log("Decoded JWT:", decoded);
      if (decoded && decoded.authorities === "ROLE_ADMIN") {
        setIsAdmin(true);
      }
    }
  }, []);

  // useEffect to fetch data when components mount
  useEffect(() => {
    AuthFetch(url)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          return Promise.reject(`Unexpected Status Code: ${response.status}`);
        }
      })
      .then((data) => {
        console.log(data);
        return setExpenses(data);
      })
      .catch(console.log);
  }, []); // call me once on page load

  //METHODS
  //Handle delete - only functionality needed in this component
  const handleDeleteExpense = (expenseId) => {
    const expense = expenses.find((ex) => ex.expenseId === expenseId);
    if (window.confirm(`Delete Expense Id #${expense.expenseId}`)) {
      const init = {
        method: "DELETE",
      };
      AuthFetch(`${url}/${expenseId}`, init)
        .then((response) => {
          if (response.status === 204) {
            //create a copy of the array
            //remove the expense
            const newExpenses = expenses.filter((ex) => {
              return ex.expenseId !== expenseId;
            });
            //update the expense state
            setExpenses(newExpenses);
          } else {
            return Promise.reject(`Unexpected Status Code: ${response.status}`);
          }
        })
        .catch(console.log);
    }
  };

  return (
    <AuthLink>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="container" style={{ maxWidth: "85%" }}>
          <Link className="btn btn-outline-success mb-4" to={"/expense/add"}>
            Add an Expense
          </Link>
          <table
            className="table table-striped table-bordered table-hover"
            style={{ marginTop: "4.1rem" }}
          >
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
                    <div className="d-flex">
                      <Link
                        className="btn btn-outline-warning me-3"
                        to={`/expense/edit/${expense.expenseId}`}
                      >
                        Update
                      </Link>
                      {isAdmin && (
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => handleDeleteExpense(expense.expenseId)}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AuthLink>
  );
}
export default ExpenseList;
