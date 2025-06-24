import React, {useState} from 'react'
import {Connection, PublicKey} from '@solana/web3.js'
import {ethers} from 'ethers'

function Tracker(){
    const [address, setAddress] = useState('')
    const [balance, setBalance] = useState(null)
    const [tokenBalances, setTokenBalances] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [network, setNetwork] = useState('solana-devnet')
    
    // Expanded RPC endpoints for multiple chains
    const endpoints = {
        // Solana Networks
        'solana-devnet': {
            rpc: 'https://api.devnet.solana.com',
            type: 'solana',
            name: 'Solana Devnet',
            symbol: 'SOL',
            decimals: 9
        },
        'solana-mainnet': {
            rpc: 'https://solana-mainnet.g.alchemy.com/v2/demo',
            type: 'solana', 
            name: 'Solana Mainnet',
            symbol: 'SOL',
            decimals: 9
        },
        
        // Ethereum Networks
        'ethereum-mainnet': {
            rpc: 'https://ethereum.publicnode.com',
            type: 'ethereum',
            name: 'Ethereum Mainnet',
            symbol: 'ETH',
            decimals: 18
        },
        'ethereum-sepolia': {
            rpc: 'https://sepolia.gateway.tenderly.co',
            type: 'ethereum',
            name: 'Ethereum Sepolia',
            symbol: 'ETH',
            decimals: 18
        },
        
        // Layer 2 Networks
        'polygon-mainnet': {
            rpc: 'https://polygon-rpc.com',
            type: 'ethereum',
            name: 'Polygon Mainnet',
            symbol: 'MATIC',
            decimals: 18
        },
        'arbitrum-one': {
            rpc: 'https://arb1.arbitrum.io/rpc',
            type: 'ethereum',
            name: 'Arbitrum One',
            symbol: 'ETH',
            decimals: 18
        },
        'optimism-mainnet': {
            rpc: 'https://mainnet.optimism.io',
            type: 'ethereum',
            name: 'Optimism Mainnet',
            symbol: 'ETH',
            decimals: 18
        },
        'base-mainnet': {
            rpc: 'https://mainnet.base.org',
            type: 'ethereum',
            name: 'Base Mainnet',
            symbol: 'ETH',
            decimals: 18
        }
    }

    // Popular ERC-20 tokens to check
    const popularTokens = {
        'ethereum-mainnet': [
            {
                address: '0xA0b86a33E6417c39C89B44bffE5DD3a7E35FAE22',
                symbol: 'USDC',
                decimals: 6
            },
            {
                address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
                symbol: 'USDT',
                decimals: 6
            },
            {
                address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
                symbol: 'WETH',
                decimals: 18
            }
        ],
        'polygon-mainnet': [
            {
                address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
                symbol: 'USDC',
                decimals: 6
            },
            {
                address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
                symbol: 'USDT',
                decimals: 6
            }
        ]
    }

    const getEthereumBalance = async (provider, walletAddress) => {
        const balance = await provider.getBalance(walletAddress)
        return ethers.utils.formatEther(balance)
    }

    const getTokenBalance = async (provider, tokenAddress, walletAddress, decimals) => {
        const abi = ['function balanceOf(address) view returns (uint256)']
        const contract = new ethers.Contract(tokenAddress, abi, provider)
        const balance = await contract.balanceOf(walletAddress)
        return ethers.utils.formatUnits(balance, decimals)
    }

    const getSolanaBalance = async (connection, publicKey) => {
        const lamports = await connection.getBalance(publicKey)
        return lamports / 1e9
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
        setTokenBalances([])

        try{
            const networkConfig = endpoints[network]
            
            if (networkConfig.type === 'solana') {
                // Solana logic (existing)
                const connection = new Connection(networkConfig.rpc, 'confirmed')
                const publicKey = new PublicKey(address.trim())
                const solBalance = await getSolanaBalance(connection, publicKey)
                setBalance(solBalance)
                
            } else if (networkConfig.type === 'ethereum') {
                // Ethereum-compatible chains
                const provider = new ethers.providers.JsonRpcProvider(networkConfig.rpc)
                
                // Get native token balance (ETH, MATIC, etc.)
                const nativeBalance = await getEthereumBalance(provider, address.trim())
                setBalance(parseFloat(nativeBalance))
                
                // Get popular token balances
                const tokens = popularTokens[network] || []
                const tokenPromises = tokens.map(async (token) => {
                    try {
                        const balance = await getTokenBalance(
                            provider, 
                            token.address, 
                            address.trim(), 
                            token.decimals
                        )
                        return {
                            symbol: token.symbol,
                            balance: parseFloat(balance),
                            decimals: token.decimals
                        }
                    } catch (err) {
                        return {
                            symbol: token.symbol,
                            balance: 0,
                            decimals: token.decimals
                        }
                    }
                })
                
                const tokenResults = await Promise.all(tokenPromises)
                setTokenBalances(tokenResults.filter(token => token.balance > 0))
            }
            
        } catch(error) {
            console.error('Error:', error)
            if (error.message.includes('Invalid public key') || error.message.includes('invalid address')) {
                setError('Invalid wallet address format')
            } else if (error.message.includes('network')) {
                setError(`Network error: Unable to fetch balance from ${networkConfig.name}`)
            } else {
                setError(`Error: ${error.message}`)
            }
        } finally {
            setLoading(false)
        }
    }

    return(
        <div className="container">
            <div className="tracker-container">
                <h2 className="text-center">🔐 TokenVault Balance Checker</h2>
                <p className="subtitle">Track balances across Solana, Ethereum, Polygon, Arbitrum, and more!</p>
                
                <form onSubmit={handleSubmit} className="tracker-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="network">Network:</label>
                            <select 
                                id="network"
                                value={network}
                                onChange={(e) => setNetwork(e.target.value)}
                            >
                                <optgroup label="Solana">
                                    <option value="solana-devnet">Solana Devnet</option>
                                    <option value="solana-mainnet">Solana Mainnet</option>
                                </optgroup>
                                <optgroup label="Ethereum">
                                    <option value="ethereum-mainnet">Ethereum Mainnet</option>
                                    <option value="ethereum-sepolia">Ethereum Sepolia</option>
                                </optgroup>
                                <optgroup label="Layer 2">
                                    <option value="polygon-mainnet">Polygon</option>
                                    <option value="arbitrum-one">Arbitrum One</option>
                                    <option value="optimism-mainnet">Optimism</option>
                                    <option value="base-mainnet">Base</option>
                                </optgroup>
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
                            placeholder={
                                endpoints[network].type === 'solana' 
                                ? "Enter Solana Wallet Address (e.g., 11111111111111111111111111111112)"
                                : "Enter Ethereum-compatible Address (e.g., 0x742d35Cc6B06C...)"
                            }
                        />
                    </div>
                    <button type="submit" disabled={loading} className="submit-btn">
                        {loading ? 'Checking Balance...' : 'Check Balance'}
                    </button>
                </form>
                
                {balance !== null && (
                    <div className="balance-result">
                        <div className="balance-amount">
                            {balance.toFixed(4)} {endpoints[network].symbol}
                        </div>
                        <div className="balance-network">on {endpoints[network].name}</div>
                        
                        {tokenBalances.length > 0 && (
                            <div className="token-balances">
                                <h3>Token Balances</h3>
                                {tokenBalances.map((token, index) => (
                                    <div key={index} className="token-balance">
                                        <span className="token-symbol">{token.symbol}</span>
                                        <span className="token-amount">{token.balance.toFixed(4)}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
                {error && <div className="error">{error}</div>}
            </div>
        </div>
    )
}

export default Tracker;