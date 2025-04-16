import {Link} from "react-router-dom";

function Navbar(){
    return(<>
        <nav>
            <Link to={'/'}>Home</Link>
            <Link to={'/login'}>Login</Link>
            <Link to={'/register'}>Register</Link>
            <Link to={'/agents'}>Agents</Link>
            <Link to={'/agent/add'}>Add An Agent</Link>
        </nav>

    </>)
}


export default Navbar;