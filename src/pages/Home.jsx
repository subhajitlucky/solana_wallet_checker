import React from 'react'
import { Link } from 'react-router-dom'

function Home(){
    return(
        <div className="container">
            <div className="home-hero">
                <h1>Solana Wallet Tracker</h1>
                <p>
                    Check the SOL balance of any Solana wallet address instantly. 
                    Switch between Devnet and Mainnet networks with ease.
                </p>
                <p>
                    Simple, fast, and reliable wallet tracking for the Solana ecosystem.
                </p>
                <Link to="/tracker" className="hero-cta">
                    <button>Start Tracking</button>
                </Link>
            </div>
        </div>
    )
}

export default Home;