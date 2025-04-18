import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AuthFetch } from "./AuthFetch";
import { jwtDecode } from "jwt-decode";
import AuthLink from "./AuthLink";

const getUserIdFromToken = () => {
  const token = localStorage.getItem("jwtToken");
  try {
    const decoded = jwtDecode(token);
    return decoded?.userId || 0;
  } catch (error) {
    console.warn("Failed to decode token:", error);
    return 0;
  }
};

function ExpenseForm() {
  const userId = getUserIdFromToken();
  const navigate = useNavigate();
  const { id } = useParams();
  const url = "http://localhost:8080/api/expense";

  const [isAdmin, setIsAdmin] = useState(false);
  const [errors, setErrors] = useState([]);
  const [expense, setExpense] = useState({
    userId,
    categoryId: 5,
    amount: 0,
    description: "DEFAULT DESCRIPTION",
    approved: false,
    reimbursed: false,
    receiptUrl: "N/A",
  });

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded?.authorities === "ROLE_ADMIN") {
          setIsAdmin(true);
        }
      } catch (e) {
        console.warn("JWT Decode error:", e);
      }
    }
  }, []);

  useEffect(() => {
    if (id) {
      AuthFetch(`${url}/${id}`)
        .then((response) =>
          response.ok
            ? response.json()
            : Promise.reject(`Unexpected Status Code: ${response.status}`)
        )
        .then((data) => setExpense(data))
        .catch(console.error);
    } else {
      setExpense((prev) => ({
        ...prev,
        userId,
      }));
    }
  }, [id, userId]);

  const handleChange = (event) => {
    const { name, type, value, checked } = event.target;
    setExpense((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = { ...expense, userId };
    id ? updateExpense(payload) : addExpense(payload);
  };

  const addExpense = (payload) => {
    const init = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };

    AuthFetch(url, init)
      .then((res) =>
        res.status === 201 || res.status === 400 || res.status === 500
          ? res.json()
          : Promise.reject(`Unexpected Status Code: ${res.status}`)
      )
      .then((data) => {
        if (data.expenseId) {
          navigate("/expense");
        } else {
          const normalizedErrors = Array.isArray(data)
            ? data
            : data?.messages || ["Server side error occurred."];
          setErrors(normalizedErrors);
        }
      })
      .catch(console.error);
  };

  const updateExpense = (payload) => {
    payload.expenseId = id;
    const init = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };

    AuthFetch(`${url}/${id}`, init)
      .then((res) =>
        res.status === 204
          ? null
          : res.status === 400 || res.status === 500
          ? res.json()
          : Promise.reject(`Unexpected Status Code: ${res.status}`)
      )
      .then((data) => {
        if (data) {
          const normalizedErrors = Array.isArray(data)
            ? data
            : data?.messages || ["Server side errors occurred"];
          setErrors(normalizedErrors);
        } else {
          navigate("/expense");
        }
      })
      .catch(console.error);
  };

  return (
    <AuthLink>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="container w-50" style={{ marginTop: "90px" }}>
          <h2 className="mb-4">{id ? "Update Expense" : "Add Expense"}</h2>

          {errors.length > 0 && (
            <div className="alert alert-danger">
              <p>The Following Errors were Found:</p>
              <ul>
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <form className="form-group" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="categoryId" className="form-label">
                Select Expense Category:
              </label>
              <select
                name="categoryId"
                id="categoryId"
                className="form-control"
                value={expense.categoryId}
                onChange={handleChange}
              >
                <option value="1">Labor</option>
                <option value="2">Materials</option>
                <option value="3">Transportation</option>
                <option value="4">Equipment Rental</option>
                <option value="5">Misc</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="amount" className="form-label">
                Amount
              </label>
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                min="0"
                max="999999"
                className="form-control"
                value={expense.amount}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                id="description"
                name="description"
                type="text"
                className="form-control"
                value={expense.description}
                onChange={handleChange}
              />
            </div>

            {isAdmin && (
              <>
                <div className="mb-3">
                  <label htmlFor="approved" className="me-3">
                    Approved?
                  </label>
                  <input
                    id="approved"
                    name="approved"
                    type="checkbox"
                    style={{ transform: "scale(1.5)" }}
                    checked={expense.approved}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="reimbursed" className="me-3">
                    Reimbursed?
                  </label>
                  <input
                    id="reimbursed"
                    name="reimbursed"
                    type="checkbox"
                    style={{ transform: "scale(1.5)" }}
                    checked={expense.reimbursed}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}

            <div className="mb-3">
              <label htmlFor="receiptUrl">Receipt URL</label>
              <input
                className="form-control"
                id="receiptUrl"
                name="receiptUrl"
                type="url"
                value={expense.receiptUrl}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <button
                type="submit"
                className="btn btn-outline-success me-3 mt-4 px-4 py-3 fs-4"
              >
                {id ? "Update Expense" : "Add Expense"}
              </button>
              <Link
                to="/expense"
                className="btn btn-outline-danger mt-4 px-4 py-3 fs-4"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </AuthLink>
  );
}

export default ExpenseForm;
