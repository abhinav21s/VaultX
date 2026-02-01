import { Link } from "react-router-dom"
import './Dashboard.css'
export function Dashboard(){
   return (
  <div className="dashboard">
    {/* NAVBAR */}
    <div className="nav">
      <div className="left">
        <img src="/images/logo.png" alt="logo" />
      </div>
      <div className="right">
        <Link to="/login" style={{ textDecoration: "none" }}><button>Login</button></Link>
        <Link to="/signup" style={{ textDecoration: "none" }}><button>Sign Up</button></Link>
      </div>
    </div>

    {/* HERO - fills full screen */}
    <div className="hero">
      <h1>Welcome To <span>VaultX</span></h1>
      <p>Connect and manage wallets across Ethereum and its ecosystem of EVM-compatible chains. Track balances, view transactions and send assets — all from one unified dashboard.</p>
      <Link to="/signup" style={{ textDecoration: "none" }}>
        <button className="btn-getstarted">Get Started</button>
      </Link>
      <div className="stats-row">
        <div className="stat-item">
          <h3>7+</h3>
          <p>EVM Chains</p>
        </div>
        <div className="stat-item">
          <h3>Live</h3>
          <p>Balances</p>
        </div>
        <div className="stat-item">
          <h3>100%</h3>
          <p>Non-Custodial</p>
        </div>
      </div>
    </div>

    {/* FEATURES - small scroll to see */}
    <div className="features">
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">🔗</div>
          <h3>Multi-Chain</h3>
          <p>Connect wallets across Ethereum and its entire EVM ecosystem from one place.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">💰</div>
          <h3>Live Balances</h3>
          <p>View real-time balances for all your wallets across every supported chain.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3>Transaction History</h3>
          <p>Track all transactions with block explorer links and easy filtering.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📤</div>
          <h3>Quick Sends</h3>
          <p>Send tokens directly from your dashboard without switching apps.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔐</div>
          <h3>Secure</h3>
          <p>Your private keys never leave your wallet. VaultX only reads on-chain data.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3>Network Switching</h3>
          <p>Switch between chains instantly and see updated data in real time.</p>
        </div>
      </div>
    </div>
  </div>
)
}