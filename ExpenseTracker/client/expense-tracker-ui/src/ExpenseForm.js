import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AuthFetch } from "./AuthFetch";
import { jwtDecode } from "jwt-decode";

// Function to safely decode token and get userId
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

  const [Expense, setExpense] = useState({
    userId,
    categoryId: 5,
    amount: 1,
    description: "DEFAULT",
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
    const newExpense = {...Expense}

      if (event.target.type === "checkbox") {
        newExpense[event.target.name] = event.target.checked;
      } else {
        newExpense[event.target.name] = event.target.value;
      }

      setExpense(newExpense)
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
          navigate("/");
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
          navigate("/");
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

  return (
    <section>
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

      <form onSubmit={handleSubmit}>
        <fieldset className="form-group">
          <label htmlFor="categoryId">Category Id</label>
          <input
            id="categoryId"
            name="categoryId"
            type="number"
            className="form-group"
            value={Expense.categoryId}
            onChange={handleChange}
          />
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            name="amount"
            type="text"
            className="form-group"
            value={Expense.amount}
            onChange={handleChange}
          />
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="approved">Approved</label>
          <input
            id="approved"
            name="approved"
            type="checkbox"
            className="form-group"
            checked={Expense.approved}
            onChange={handleChange}
          />
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="reimbursed">Reimbursed</label>
          <input
            id="reimbursed"
            name="reimbursed"
            type="checkbox"
            className="form-group"
            checked={Expense.reimbursed}
            onChange={handleChange}
          />
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="receiptUrl">Receipt Url</label>
          <input
            id="receiptUrl"
            name="receiptUrl"
            type="text"
            className="form-group"
            value={Expense.receiptUrl}
            onChange={handleChange}
          />
        </fieldset>
        <fieldset className="form-group">
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
        </fieldset>
      </form>
    </section>
  );
}

export default ExpenseForm;
