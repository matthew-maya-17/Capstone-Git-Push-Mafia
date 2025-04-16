import { useState } from "react"

function Registration(){
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [userId, setUserId] = useState(0)
    const [roleId, setRoleId] = useState(0)
    const [disabled, setDisabled] = useState(false)
    return (
      <>
        <h1>This is the registration form for admin</h1>
        <form >
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
          <label>
            <input
              type="checkbox"
              checked={disabled}
              onChange={(e) => setDisabled(e.target.checked)}
            />
            Disabled
          </label>
          <button type="submit">Register</button>
        </form>
      </>
    );
}

export default Registration;