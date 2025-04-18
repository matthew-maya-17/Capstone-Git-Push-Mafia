import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { data } from "react-router-dom";
import AuthLink from "./AuthLink";
function Registration() {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [userId, setUserId] = useState(0);
  const [roleId, setRoleId] = useState(0);
  const userUrl = "http://localhost:8080/api/user";
  const registerUrl = "http://localhost:8080/api/login/register";
  const token = localStorage.getItem("jwtToken");
  const navigate = useNavigate();

const handleSubmit = (e) => {
  e.preventDefault();
  setErrors([]);

  const init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ firstName, lastName }),
  };

  fetch(userUrl, init)
    .then((response) =>
      response.json().then((data) => {
        if (response.ok) {
          return data;
        } else {
          return Promise.reject(data);
        }
      })
    )
    .then((data) => {
      const newUserId = data.userId;
      setUserId(newUserId);

      const init2 = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          userId: newUserId,
          roleId: roleId,
        }),
      };

      return fetch(registerUrl, init2);
    })
    .then((response) =>
      response.json().then((data) => {
        if (response.ok) {
          return data;
        } else {
          return Promise.reject(data);
        }
      })
    )
    .then((data) => {
      console.log("✅ Success:", data);
      if (data.userId) {
        alert("User registered successfully!");
        navigate("/home");
      } else {
        setErrors(["Unexpected response format."]);
      }
    })
    .catch(() => {
       setErrors(["Invalid Username or Password"]);
    });
};
  return (
    <AuthLink>
      <div className="container mt-5 w-50">
        <h2 className="register-heading mb-4">Register A new User</h2>
        {errors.length > 0 && (
          <div className="alert alert-danger mt-3">
            <ul className="mb-0">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <form className="form-group" onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              id="firstName"
              name="firstName"
              type="text"
              className="form-control"
              value={firstName}
              onChange={(e) => setFirstname(e.target.value)}
              placeholder="First Name"
              required
            />
          </div>
          <div className="mb-3">
            <input
              id="lastName"
              name="lastName"
              type="text"
              className="form-control"
              value={lastName}
              onChange={(e) => setLastname(e.target.value)}
              placeholder="Last Name"
              required
            />
          </div>
          <div className="mb-3">
            <input
              id="username"
              name="username"
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Email Address"
              required
            />
          </div>
          <div className="mb-3">
            <input
              id="password"
              name="password"
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <div className="mb-3">
            {/* <label htmlFor="role" className="form-label">
              Role
            </label> */}
            <select
              id="role"
              name="role"
              className="form-control"
              onChange={(e) => setRoleId(e.target.value === "USER" ? 1 : 2)}
              required
              defaultValue=""
            >
              <option value="" disabled>
                Select a Role
              </option>
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-outline-success me-3 mt-4 px-4 py-3 fs-4"
            >
              Create User
            </button>
            <Link
              to="/expense"
              className="btn btn-outline-danger me-3 mt-4 px-4 py-3 fs-4"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </AuthLink>
  );
}
export default Registration;
