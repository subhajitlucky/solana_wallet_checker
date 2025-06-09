# Solana Wallet Tracker

A simple web application to check the SOL balance of any Solana wallet address on Devnet or Mainnet, built with React and Vite.

## Features
- Enter any Solana wallet address and instantly view its SOL balance
- Switch between Devnet and Mainnet
- Fast, modern UI with React Router navigation
- Error handling for invalid addresses and network issues

## Demo
[Live Demo](https://subhajitlucky.github.io/solana_wallet_checker/) <!-- Add your deployed link here if available -->

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### Installation
```bash
git clone https://github.com/subhajitlucky/solana_wallet_checker.git
cd solana_wallet_checker
npm install
```

### Running Locally
```bash
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production
```bash
npm run build
```

### Linting
```bash
npm run lint
```

## Project Structure
```
solana-wallet-tracker/
├── src/
│   ├── components/      # Navbar, Footer
│   ├── pages/           # Home, Tracker
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── public/
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

## Tech Stack
- React 19
- Vite
- @solana/web3.js
- React Router DOM
- ESLint

## License
MIT
