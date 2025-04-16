import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AuthFetch } from "./AuthFetch";
//DEFAULT VARIABLE
const EXPENSE_DEFAULT = {
  userId: 0,
  categoryId: 5,
  amount: 1,
  description: "DEFAULT",
  approved: false,
  reimbursed: false,
  receiptUrl: "N/A",
};

function ExpenseForm() {
  //STATE
  const [Expense, setExpense] = useState(EXPENSE_DEFAULT);
  const [errors, setErrors] = useState([]);

  const url = "http://localhost:8080/api/expense";
  const navigate = useNavigate();
  const { id } = useParams();

  //useEffect
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
          //Set form state with the existing panel data
          setExpense(data);
        })
        .catch(console.log);
    } else {
      setExpense(EXPENSE_DEFAULT);
    }
  }, [id]); // HEY REACT, PLEASE CALL my useEffect function every time the id route in the url parameter changes

  //METHODS
  // handleChange
  const handleChange = (event) => {
    const newExpense = { ...Expense };

    if (event.target.type === "checkbox") {
      newExpense[event.target.name] = event.target.checked;
    } else {
      newExpense[event.target.name] = event.target.value;
    }
    setExpense(newExpense);
  };

  // handleSubmit
  const handleSubmit = (event) => {
    event.preventDefault();

    if (id) {
      updateExpense();
    } else {
      addExpense();
    }
  };

  // AddFieldAgent
  const addExpense = () => {
    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Expense),
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
        console.log("Received from POST:", data);
        if (data.expenseId) {
          // Success - navigate to home page
          navigate("/");
        } else {
          //Unhappy Path
          setErrors(data);
        }
      })
      .catch(console.log);
  };

  // updateFieldAgent
  const updateExpense = () => {
    //Assign field agentId
    Expense.expenseId = id;
    const init = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Expense),
    };
    AuthFetch(`${url}/${id}`, init)
      .then((response) => {
        if (response.status === 204) {
          return null;
        } else if (response.status === 400) {
          return response.json();
        } else {
          return Promise.reject(`Unexpected Status Code: ${response.status}`);
        }
      })
      .then((data) => {
        //Happy path
        if (!data) {
          navigate("/");
        } else {
          //Unhappy Path
          setErrors(data);
        }
      })
      .catch(console.log);
  };

  // updateForm
  return (
    <>
      <section>
        <h2 className="mb-4">{id > 0 ? "Update Expense" : "Add Expense"}</h2>
        {errors.length > 0 && (
          <div className="alert alert-danger">
            <p>The Following Errors were Found: </p>
            <ul>
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <fieldset className="form-group">
            <label htmlFor="categoryId">Select Expense Category:</label>
            <select
              name="categoryId"
              id="categoryId"
              className="form-group"
              onChange={handleChange}
            >
              <option value="1">Labor</option>
              <option value="2">Materials</option>
              <option value="3">Transportation</option>
              <option value="4">Equipment Rental</option>
              <option value="5">Misc</option>
            </select>
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
            ></input>
          </fieldset>
          <fieldset className="form-group">
            <label htmlFor="approved">Approved</label>
            <input
              id="approved"
              name="approved"
              type="checkbox"
              className="form-group"
              value={Expense.approved}
              onChange={handleChange}
            ></input>
          </fieldset>
          <fieldset className="form-group">
            <label htmlFor="reimbursed">reimbursed</label>
            <input
              id="reimbursed"
              name="reimbursed"
              type="checkbox"
              className="form-group"
              value={Expense.reimbursed}
              onChange={handleChange}
            ></input>
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
            ></input>
          </fieldset>
          <fieldset className="form-group">
            <button type="submit" className="btn btn-outline-success mr-4 mt-4">
              {id > 0 ? "Update Expense" : "Add Expense"}
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
    </>
  );
}

export default ExpenseForm;
