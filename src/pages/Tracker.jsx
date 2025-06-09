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
        <div>
            <h2>Solana Wallet Tracker</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Network:
                        <select 
                            value={network}
                            onChange={(e) => setNetwork(e.target.value)}
                        >
                            <option value="devnet">Devnet</option>
                            <option value="mainnet">Mainnet</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Wallet Address:
                        <input
                            id="wallet"
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter Solana Wallet Address"
                        />
                    </label>
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Check Balance'}
                </button>
            </form>
            {balance !== null && (
                <p>Balance: {balance} SOL on {network}</p>
            )}
            {error && <p className="error">{error}</p>}
        </div>
    )
}

export default Tracker;