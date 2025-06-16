import {Link, useLocation} from 'react-router-dom'

function Navbar(){
    const location = useLocation()
    
    return(
        <nav className="navbar">
            <div className="navbar-content">
                <div className="navbar-brand">
                    Solana Tracker
                </div>
                <ul className="navbar-nav">
                    <li>
                        <Link 
                            to='/' 
                            className={location.pathname === '/' ? 'active' : ''}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to='/tracker'
                            className={location.pathname === '/tracker' ? 'active' : ''}
                        >
                            Tracker
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;