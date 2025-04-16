import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav>
        <Link to={"/"}>Home</Link>
        <Link to={"/expense/add"}>Add An Expense</Link>
        <Link to={"/expense"}>Expenses</Link>
        <Link to={"/login"}>Login</Link>
        <Link to={"/register"}>Register</Link>
      </nav>
    </>
  );
}

export default Navbar;
