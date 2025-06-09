import {Link} from 'react-router-dom'

function Navbar(){
    return(
        <nav>
            <Link to='/'>Home</Link>
            <Link to='/tracker'>Tracker</Link>
        </nav>
    )
}

export default Navbar;