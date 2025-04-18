import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthFetch } from "./AuthFetch";
import AuthLink from "./AuthLink";
import pieChart from "./pieChart";
import { jwtDecode } from "jwt-decode";
import { Pie, Line } from "react-chartjs-2";
import lineGraph from "./lineGraph";
import pieChartByUser from "./PieChartByUser";
import { useLocation } from "react-router-dom";

const CATEGORY_MAP = {
  1: "Labor",
  2: "Materials",
  3: "Transportation",
  4: "Equipment Rental",
  5: "Misc",
};

function ExpenseList() {
  // STATE
  const location = useLocation();
  const [expenses, setExpenses] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());
  const years = [
    ...new Set(expenses.map((exp) => new Date(exp.createdAt).getFullYear())),
  ].sort();
  const url = "http://localhost:8080/api/expense";

  // useEffect to fetch data when components mount
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded && decoded.authorities === "ROLE_ADMIN") {
        setIsAdmin(true);
      }
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (!token) return;

    const decoded = jwtDecode(token);
    const userId = decoded.userId;
    const isAdminUser = decoded.authorities === "ROLE_ADMIN";
    setIsAdmin(isAdminUser);

    AuthFetch(url)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          return Promise.reject(`Unexpected Status Code: ${response.status}`);
        }
      })
      .then((data) => {
        // Only set all expenses for admin
        if (isAdminUser) {
          setExpenses(data);
        } else {
          // Filter only this user's expenses
          const userExpenses = data.filter((exp) => exp.userId === userId);
          setExpenses(userExpenses);
        }
      })
      .catch(console.log);
  }, []);

  const { data, options } = lineGraph(expenses, year);

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
        <div className="container mt-50px" style={{ maxWidth: "90%" }}>
          <div
            className="row g-5 mb-4"
            style={{ marginTop: "50px", display: isAdmin ? "flex" : "none" }}
          >
            <div className="col-lg-6">
              <div
                className="text-center mb-3 bg-black text-white"
                style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
              >
                <h4>Expense by Category</h4>
              </div>
              <div
                style={{
                  height: "500px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Pie
                  data={pieChart(expenses)}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: "right",
                        labels: {
                          boxWidth: 12,
                          font: {
                            size: 12,
                          },
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div
                className="text-center mt-6 bg-black text-white"
                style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
              >
                <h4>Expense by Month in {year}</h4>
              </div>
              <div className="mb-3 text-center">
                <label htmlFor="year-select" className="form-label me-2">
                  Select Year:
                </label>
                <select
                  id="year-select"
                  className="form-select d-inline-block"
                  style={{ width: "auto" }}
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                >
                  {[
                    ...new Set(
                      expenses.map((exp) =>
                        new Date(exp.createdAt).getFullYear()
                      )
                    ),
                  ]
                    .sort()
                    .map((yr) => (
                      <option key={yr} value={yr}>
                        {yr}
                      </option>
                    ))}
                </select>
              </div>
              <div
                style={{
                  height: "500px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Line data={data} options={options} />
              </div>
            </div>
            <div className="col-lg-6 offset-lg-3">
              <div
                className="text-center mb-3 bg-black text-white"
                style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
              >
                <h4>Expense by User</h4>
              </div>
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "500px", width: "100%" }}
              >
                <Pie
                  data={pieChartByUser(expenses)}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: "right",
                        labels: {
                          boxWidth: 12,
                          font: {
                            size: 12,
                          },
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
          <Link
            className="btn btn-outline-success mb-4 btn-lg"
            to={"/expense/add"}
          >
            Add an Expense
          </Link>
          <div
            className="table-responsive"
            style={{ maxHeight: "500px", overflowY: "auto" }}
          >
            <table className="table table-striped table-bordered table-hover mb-5">
              <thead className="table-dark sticky-header">
                <tr>
                  <th>User Id</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Description</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                  <th>Approved?</th>
                  {isAdmin && <th>Reimbursed?</th>}
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
                    <td>{expense.approved ? "Approved" : "Pending..."}</td>
                    {isAdmin && (
                      <td>
                        {expense.reimbursed ? "Reimbursed" : "Not Reimbursed"}
                      </td>
                    )}
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
                            onClick={() =>
                              handleDeleteExpense(expense.expenseId)
                            }
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}

                {/* Fill up to 10 rows if needed */}
                {expenses.length < 10 &&
                  Array.from({ length: 10 - expenses.length }).map(
                    (_, index) => (
                      <tr key={`empty-${index}`}>
                        <td colSpan={isAdmin ? 10 : 9}>&nbsp;</td>
                      </tr>
                    )
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AuthLink>
  );
}
export default ExpenseList;
