import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const url = "http://localhost:8080/api/login/authenticate";

  const handleSubmit = (e) => {
    e.preventDefault();

    const init = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    };

        fetch(url, init)
        .then(response => {
            if (!response.ok) {
            throw new Error("Login failed");
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem("jwtToken", data.jwt_token);
            localStorage.setItem("userId", data.user_id);
            navigate("/home");
        })
        .catch(console.log)
    }

    return (
      <>
        <div
          id="login-container"
          className="d-flex justify-content-center align-items-center vh-100 bg-dark"
        >
          <div className="card shadow p-5 w-25 mt-5">
            <h2 className="mb-4">Login</h2>
            <form onSubmit={handleSubmit} className="form-group ">
              <div className="mb-3">
                {/* <label className="form-label">Username</label> */}
                <input
                  type="text"
                  placeholder="Email Address"
                  className="form-control"
                  value={username}
                  style={{ fontSize: "1.25rem" }}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                {/* <label className="form-label">Password</label> */}
                <input
                  type="password"
                  placeholder="Password"
                  className="form-control"
                  value={password}
                  style={{ fontSize: "1.25rem" }}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                style={{ fontSize: "1.25rem" }}
                className="btn btn-outline-success mr-4 mt-4"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </>
    );
}

export default LoginPage;
