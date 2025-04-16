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
    const [disabled, setDisabled] = useState(false)
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
                body: JSON.stringify({ username, password, userId: newUserId }),
            };

            console.log(init2)
            return fetch(registerUrl, init2)
          })
          .then((response) => {
            if(response.status === 201){
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
      <>
        <h1>This is the registration form for admin</h1>
        <form onSubmit={handleSubmit}>
          <fieldset className="form-group">
            <label htmlFor="firstName">First name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              className="form-group"
              onChange={(e) => setFirstname(e.target.value)}
            />
          </fieldset>
          <fieldset className="form-group">
            <label htmlFor="amount">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              className="form-group"
              onChange={(e) => setLastname(e.target.value)}
            />
          </fieldset>

          <fieldset className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              className="form-group"
              onChange={(e) => setUsername(e.target.value)}
            />
          </fieldset>

          <fieldset className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="text"
              className="form-group"
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>

          <fieldset className="form-group">
            <button type="submit" className="btn btn-outline-success mr-4 mt-4">
              Create User
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
      </>
    );
}

export default Registration;