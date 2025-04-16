import { useState } from "react";

function LoginPage(){
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([])
    const url = "http://localhost:8080/api/login/authenticate";

    const handleSubmit = (e) => {
        const init = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userName, password }),
        }

        fetch(url, init)
        .then(response => {
            response.json()
        })
        .then(data => {
            console.log(data)
        })
    }


    return (
      <>
        <h1>This is the Login Page</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </>
    );
}

export default LoginPage;