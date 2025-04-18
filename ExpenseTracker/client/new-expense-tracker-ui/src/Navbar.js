import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Navbar() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  const handleRemoveToken = () => {
    localStorage.removeItem("jwtToken");
  };

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded && decoded.authorities === "ROLE_ADMIN") {
        setIsAdmin(true);
      }
    }
  }, []);

  return (
    <>
      <section className="section1">
        <nav className="container" aria-label="Main Navigation">
          <div className="logo">
            <h2>Expense Tracker</h2>
          </div>

          <div className="navlink">
            <ul>
              <li className="link">
                <a href="/home">Home</a>
              </li>
              <li className="link">
                <a href="/expense">Expenses</a>
              </li>
              <li className="link">
                <a href="/expense/add">Add An Expense</a>
              </li>
              <li className="link">
                <a href="/login" onClick={handleRemoveToken}>
                  Logout
                </a>
              </li>
              {isAdmin && (
                <li className="link">
                  <a href="/register">Register</a>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </section>
    </>
  );
}

export default Navbar;
