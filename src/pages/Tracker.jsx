import React, {useState} from 'react'
import {Connection, PublicKey} from '@solana/web3.js'

function Tracker(){
    const [address, setAddress] = useState('')
    const [balance, setBalance] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [network, setNetwork] = useState('devnet')
    
    // RPC endpoints
    const endpoints = {
        devnet: 'https://api.devnet.solana.com',
        mainnet: 'https://solana-mainnet.g.alchemy.com/v2/demo'
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        
        if(!address.trim()){
            setError('Please enter a wallet address')
            return
        }

        setLoading(true)
        setBalance(null)

        try{
            const connection = new Connection(endpoints[network], 'confirmed')
            const publicKey = new PublicKey(address.trim())
            const lamports = await connection.getBalance(publicKey)
            const solBalance = lamports / 1e9
            setBalance(solBalance)
        } catch(error) {
            console.error('Error:', error)
            if (error.message.includes('Invalid public key')) {
                setError('Invalid wallet address format')
            } else {
                setError(`Network error: Unable to fetch balance from ${network}`)
            }
        } finally {
            setLoading(false)
        }
    }

    return(
        <div className="container">
            <div className="tracker-container">
                <h2 className="text-center">Solana Wallet Tracker</h2>
                <form onSubmit={handleSubmit} className="tracker-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="network">Network:</label>
                            <select 
                                id="network"
                                value={network}
                                onChange={(e) => setNetwork(e.target.value)}
                            >
                                <option value="devnet">Devnet</option>
                                <option value="mainnet">Mainnet</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="wallet">Wallet Address:</label>
                        <input
                            id="wallet"
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter Solana Wallet Address (e.g., 11111111111111111111111111111112)"
                        />
                    </div>
                    <button type="submit" disabled={loading} className="submit-btn">
                        {loading ? 'Checking Balance...' : 'Check Balance'}
                    </button>
                </form>
                
                {balance !== null && (
                    <div className="balance-result">
                        <div className="balance-amount">{balance.toFixed(4)} SOL</div>
                        <div className="balance-network">on {network}</div>
                    </div>
                )}
                {error && <div className="error">{error}</div>}
            </div>
        </div>
    )
}

export default Tracker;