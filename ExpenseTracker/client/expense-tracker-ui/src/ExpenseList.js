import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthFetch } from "./AuthFetch";

function ExpenseList() {
  // STATE
  const [expenses, setExpenses] = useState([]);
  const url = "http://localhost:8080/api/expense";
  const navigate = useNavigate();

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
        console.log(data)
        return setExpenses(data)})
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
            const newExpenses = expenses.filter(
              (ex) => {
                return ex.expenseId !== expenseId}
            );
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
    <>
      <section>
        <h2 className="mb-4">Expenses</h2>
        <Link className="btn btn-outline-success mb-4" to={"/expense/add"}>
          Add an Expense
        </Link>
        <table className="table table-striped table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>User Id</th>
              <th>Category Id</th>
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
                <td>{expense.categoryId}</td>
                <td>{expense.description}</td>
                <td>{expense.createdAt}</td>
                <td>{expense.updatedAt}</td>
                <td>{expense.approved}</td>
                <td>{expense.reimbursed}</td>
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
      </section>
    </>
  );
}
export default ExpenseList;
