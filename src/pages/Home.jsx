import React from 'react'
import { Link } from 'react-router-dom'

function Home(){
    return(
        <div className="container">
            <div className="home-hero">
                <div className="hero-content">
                    <div className="hero-brand">
                        <span className="hero-icon">🔐</span>
                        <h1>TokenVault</h1>
                    </div>
                    <p className="hero-tagline">
                        <strong>Professional Multi-Chain Portfolio Tracker</strong>
                    </p>
                    <p>
                        Securely track your cryptocurrency portfolio across multiple blockchains. 
                        Monitor balances, tokens, and assets across Solana, Ethereum, Polygon, 
                        Arbitrum, Optimism, and more with professional-grade tools.
                    </p>
                    <div className="hero-cta">
                        <Link to="/tracker" className="cta-button">
                            Check Your Balance
                        </Link>
                    </div>
                </div>
                
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">🌐</div>
                        <h3>Multi-Chain Support</h3>
                        <p>Track assets across 8+ blockchain networks</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🔒</div>
                        <h3>Secure & Private</h3>
                        <p>No keys required - read-only tracking</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">⚡</div>
                        <h3>Real-Time Data</h3>
                        <p>Live balance updates and token tracking</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;