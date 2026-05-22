import { Link } from "react-router-dom"
import './Dashboard.css'
export function Dashboard(){
   return (
  <div className="dashboard-container">
    <nav className="navbar">
      <div className="navbar-content">
        <div className="logo-container">
          <img src="/images/logo.png" alt="VaultX Logo" className="logo-img" />
          <span className="logo-text">VaultX</span>
        </div>
        <div className="nav-actions">
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/signup" className="nav-btn">Sign Up</Link>
        </div>
      </div>
    </nav>

    <main className="hero-section">
      <div className="hero-content">
        <h1>Securely manage your <span>Crypto Assets</span></h1>
        <p>Connect and manage wallets across Ethereum and its ecosystem of EVM-compatible chains. Track balances, view transactions, and send assets — all from one unified dashboard.</p>
        
        <div className="hero-cta">
          <Link to="/signup" className="primary-btn">Get Started</Link>
          <a href="#features" className="secondary-btn">Explore Features</a>
        </div>

        <div className="stats-container">
          <div className="stat-card">
            <span className="stat-value">7+</span>
            <span className="stat-label">EVM Chains</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">Real-time</span>
            <span className="stat-label">Balances</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">100%</span>
            <span className="stat-label">Non-Custodial</span>
          </div>
        </div>
      </div>
    </main>

    <section id="features" className="features-section">
      <div className="section-header">
        <h2>Powerful Features</h2>
        <p>Everything you need to manage your multi-chain portfolio</p>
      </div>
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
          </div>
          <h3>Multi-Chain</h3>
          <p>Connect wallets across Ethereum and its entire EVM ecosystem from one place.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
          </div>
          <h3>Live Balances</h3>
          <p>View real-time balances for all your wallets across every supported chain.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
          </div>
          <h3>Transaction History</h3>
          <p>Track all transactions with block explorer links and easy filtering.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </div>
          <h3>Quick Sends</h3>
          <p>Send tokens directly from your dashboard without switching apps.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          </div>
          <h3>Secure</h3>
          <p>Your private keys never leave your wallet. VaultX only reads on-chain data.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
          </div>
          <h3>Network Switching</h3>
          <p>Switch between chains instantly and see updated data in real time.</p>
        </div>
      </div>
    </section>

    <footer className="dashboard-footer">
      <p>&copy; 2024 VaultX. All rights reserved.</p>
    </footer>
  </div>
)
}