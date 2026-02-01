# VaultX 

VaultX is a modern Web3 wallet dashboard built for **Ethereum and EVM-compatible blockchains**.  
It allows users to connect multiple wallets, view balances, track transactions, and send tokens — all in a clean, developer-friendly interface.

---

##  Features

-  Secure authentication with JWT
-  Connect multiple EVM wallets (MetaMask, WalletConnect, etc.)
-  View native balances (ETH, MATIC, etc.)
-  View recent transaction history
-  Auto-updates on network or account change
-  Send native tokens directly via connected wallets
-  Wallet state persistence per user
-  Clean UI with expandable wallet cards

---

## Supported Networks

VaultX currently supports **Ethereum and EVM-compatible chains**, including:

- Ethereum Mainnet
- Sepolia (Testnet)
- Polygon
- Arbitrum
- Optimism
- Base

> ⚠️ Non-EVM chains (e.g. Solana) are **not supported** in the current version.

---

##  Tech Stack

### Frontend
- React
- Wagmi
- Reown AppKit
- Viem
- React Router
- React Toastify

### Backend
- Node.js
- Express
- MongoDB
- JWT Authentication

---

##  Wallet Integration

Wallet connections are handled using **Reown AppKit + Wagmi**, providing:

- Wallet selection modal
- Network switching
- Account change detection
- Secure transaction signing

---



## 🧪 Running Locally

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/vaultx.git
cd vaultx
