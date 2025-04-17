import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleRemoveToken = () => {
    localStorage.removeItem("jwtToken");
  };

  return (
    <>
      <nav>
        <Link to={"/home"}>Home</Link>
        <Link to={"/expense/add"}>Add An Expense</Link>
        <Link to={"/expense"}>Expenses</Link>
        <Link to={"/login"} onClick={handleRemoveToken}>
          Log Out
        </Link>
        <Link to={"/register"}>Register</Link>
      </nav>
    </>
  );
}

export default Navbar;
