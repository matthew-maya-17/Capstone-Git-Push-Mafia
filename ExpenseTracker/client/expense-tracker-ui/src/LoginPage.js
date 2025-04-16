import { useState } from "react";

function LoginPage(){
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([])
    const url = "http://localhost:8080/api/login/authenticate";

    const handleSubmit = (e) => {
        e.preventDefault();

        const init = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }

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
            console.log(localStorage)
        })
        .catch(console.log)
    }


    return (
      <>
        <h1>This is the Login Page</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
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