import {Link} from "react-router-dom";

function Navbar(){
    return(<>
        <nav>
            <Link to={'/'}>Home</Link>
            <Link to={'/login'}>Login</Link>
            <Link to={'/register'}>Register</Link>
            <Link to={'/expenses'}>Expenses</Link>
            <Link to={'/expense/add'}>Add An Expense</Link>
        </nav>

    </>)
}


export default Navbar;