import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { data } from "react-router-dom"

function Registration(){
    const [firstName, setFirstname ] = useState("")
    const [lastName, setLastname] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [userId, setUserId] = useState(0)
    const [roleId, setRoleId] = useState(0)
    const userUrl = "http://localhost:8080/api/user"
    const registerUrl = "http://localhost:8080/api/login/register";
    const token = localStorage.getItem("jwtToken")

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const init = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ firstName, lastName }),
        };

        fetch(userUrl, init)
          .then((response) => {
            if (response.status === 201) {
              return response.json();
            } else {
              return Promise.reject(
                `Unexpected Status Code: ${response.status}`
              );
            }
          })
          .then((data) => {
            const newUserId = data.userId
            setUserId(data.userId);

            const init2 = {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password, userId: newUserId, roleId: roleId }),
            };

            console.log(init2)
            return fetch(registerUrl, init2)
          })
          .then((response) => {
            if(response.status === 201){
                alert("User registered successfully!");
                return response.json();
                
            }else{
              return Promise.reject(`Unexpected Status Code: ${response.status}`);                
            }
          })
          .then((data) => {
            console.log(data)
          })
    }


    return (
      <div className="container mt-5 w-50">
        <h2 className="mb-4">Register A new User</h2>
        <form className="form-group" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              First name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              className="form-control"
              value={firstName}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Last name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              className="form-control"
              value={lastName}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="role" className="form-label">
              Role
            </label>
            <select
              id="role"
              name="role"
              className="form-control"
              onChange={(e) => setRoleId(e.target.value === "USER" ? 1 : 2)}
              required
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <div>
            <button type="submit" className="btn btn-outline-success mr-4 mt-4">
              Create User
            </button>
            <Link to="/expense" className="btn btn-outline-danger mr-4 mt-4">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    );
}

export default Registration;