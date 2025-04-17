import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleRemoveToken = () => {
    localStorage.removeItem("jwtToken");
  };

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
                <a href="/login" onClick={handleRemoveToken}>Logout</a>
              </li>
              <li className="link">
                <a href="/register">Register</a>
              </li>
            </ul>
          </div>
        </nav>
      </section>
    </>
  );
}

export default Navbar;
