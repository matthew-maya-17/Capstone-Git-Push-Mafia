import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AuthFetch } from "./AuthFetch";
import { jwtDecode } from "jwt-decode";

// Function to safely decode token and get userId
const getUserIdFromToken = () => {
  const token = localStorage.getItem("jwtToken");
  try {
    const decoded = jwtDecode(token);
    console.log(decoded);
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
  const token = localStorage.getItem("jwtToken") != null ? localStorage.getItem("jwtToken") : null;
  const [Expense, setExpense] = useState({
    userId,
    categoryId: 5,
    amount: 0,
    description: "DEFAULT DESCRIPTION",
    approved: false,
    reimbursed: false,
    receiptUrl: "N/A",
  });

  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (id) {
      AuthFetch(`${url}/${id}`)
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            return Promise.reject(`Unexpected Status Code: ${response.status}`);
          }
        })
        .then((data) => {
          setExpense(data);
        })
        .catch(console.log);
    } else {
      // Ensure userId persists on a fresh form
      setExpense((prev) => ({
        ...prev,
        userId,
      }));
    }
  }, [id]);

  const handleChange = (event) => {
    const newExpense = { ...Expense };

    if (event.target.type === "checkbox") {
      newExpense[event.target.name] = event.target.checked;
    } else {
      newExpense[event.target.name] = event.target.value;
    }
    setExpense(newExpense);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedExpense = { ...Expense, userId: userId };

    if (id) {
      updateExpense(updatedExpense);
    } else {
      addExpense(updatedExpense);
    }
  };

  const addExpense = (updatedExpense) => {
    const init = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedExpense),
    };

    AuthFetch(url, init)
      .then((response) => {
        if (response.status === 201 || response.status === 400) {
          return response.json();
        } else {
          return Promise.reject(`Unexpected Status Code: ${response.status}`);
        }
      })
      .then((data) => {
        if (data.expenseId) {
          navigate("/expense");
        } else {
          setErrors(data);
        }
      })
      .catch(console.log);
  };

  const updateExpense = (updatedExpense) => {
    updatedExpense.expenseId = id;

    const init = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedExpense),
    };

    AuthFetch(`${url}/${id}`, init)
      .then((response) => {
        if (response.status === 204) {
          navigate("/expense");
        } else if (response.status === 400) {
          return response.json();
        } else {
          return Promise.reject(`Unexpected Status Code: ${response.status}`);
        }
      })
      .then((data) => {
        if (data) {
          setErrors(data);
        }
      })
      .catch(console.log);
  };

  return token == null ? (
    navigate("/login")
  ) : (
    <>
      <div className="container mt-5 w-50">
        <h2 className="mb-4">{id ? "Update Expense" : "Add Expense"}</h2>

        {errors.length > 0 && (
          <div className="alert alert-danger">
            <p>The Following Errors were Found: </p>
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
              value={Expense.categoryId}
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
              className="form-control"
              value={Expense.amount}
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
              value={Expense.description}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="receiptUrl">Receipt Url</label>
            <input
              className="form-control"
              type="file"
              id="formFile"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-outline-success mr-4 mt-4">
              {id ? "Update Expense" : "Add Expense"}
            </button>
            <Link
              type="button"
              className="btn btn-outline-danger mt-4"
              to={"/expense"}
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default ExpenseForm;
