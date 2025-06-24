import React from 'react'
import {Link, useLocation} from 'react-router-dom'

function Navbar(){
    const location = useLocation()
    
    return(
        <nav className="navbar">
            <div className="navbar-content">
                <Link to="/" className="navbar-brand">
                    <span className="brand-icon">🔐</span>
                    TokenVault
                </Link>
                <ul className="navbar-nav">
                    <li>
                        <Link 
                            to='/tracker' 
                            className={location.pathname === '/tracker' ? 'active' : ''}
                        >
                            Balance Checker
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;