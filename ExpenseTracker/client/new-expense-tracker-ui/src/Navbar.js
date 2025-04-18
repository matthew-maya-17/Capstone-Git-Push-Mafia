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
          <div className="text-center my-4">
            <h2 className="d-inline-flex align-items-center gap-2">
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17 5H7V7H17V5Z" fill="currentColor"></path>
                <path d="M7 9H9V11H7V9Z" fill="currentColor"></path>
                <path d="M9 13H7V15H9V13Z" fill="currentColor"></path>
                <path d="M7 17H9V19H7V17Z" fill="currentColor"></path>
                <path d="M13 9H11V11H13V9Z" fill="currentColor"></path>
                <path d="M11 13H13V15H11V13Z" fill="currentColor"></path>
                <path d="M13 17H11V19H13V17Z" fill="currentColor"></path>
                <path d="M15 9H17V11H15V9Z" fill="currentColor"></path>
                <path d="M17 13H15V19H17V13Z" fill="currentColor"></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3 3C3 1.89543 3.89543 1 5 1H19C20.1046 1 21 1.89543 21 3V21C21 22.1046 20.1046 23 19 23H5C3.89543 23 3 22.1046 3 21V3ZM5 3H19V21H5V3Z"
                  fill="currentColor"
                ></path>
              </svg>
              Expense Tracker
            </h2>
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
