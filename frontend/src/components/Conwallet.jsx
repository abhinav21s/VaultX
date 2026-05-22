import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Conwallet.css"
import { toast } from "react-toastify"
import { useAccount, useDisconnect, usePublicClient, useSendTransaction, useSwitchChain } from "wagmi"
import { useAppKitNetwork } from "@reown/appkit/react"
import { useAppKit } from "@reown/appkit/react"
import { formatEther, parseEther } from "viem"

const backend_url=import.meta.env.VITE_BACKEND_ROUTE

export function Conwallet() {
  const navigate = useNavigate()
  const { open } = useAppKit()
  const publicClient = usePublicClient()
  const { disconnect } = useDisconnect()

  const { address, chain, connector, isConnected } = useAccount()
  const { switchChain } = useSwitchChain()
  const [name, setName] = useState("")
  const [wallets, setWallets] = useState([])
  const [expanded, setExpanded] = useState(null)
  const [openw, setOpen] = useState(false)
  const [balance, setBalance] = useState(null)
  const [txs, setTxs] = useState([])
  const [loadingtxs, setloadingtxs] = useState(false)
  const [to, setTo] = useState("")
  const [activeTab, setActiveTab] = useState('txs')
  const [amount, setAmount] = useState("")
   
  const { sendTransaction, isPending } = useSendTransaction({
    onSuccess: (hash) => {
      toast.success("Transaction sent")
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })
  /* ---------- USER ---------- */
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) return

    fetch(`${backend_url}/cypher/userdetails`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(d => setName(d.username))
  }, [])

 
  /* ---------- SAVE WALLET ---------- */
  useEffect(() => {
    if (!isConnected || !address) return

    const token = localStorage.getItem("token")

    fetch(`${backend_url}/cypher/connectwallet`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        address,
        chain: chain?.name,
        label: connector?.name
      })
    }).then(fetchWallets)
  }, [address, chain?.id])

  async function deleteWallet(walletAddress, e) {
    e.stopPropagation()

    const token = localStorage.getItem("token")

    try {
      const res = await fetch(`${backend_url}/cypher/deletewallet`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ address: walletAddress })
      })

      const data = await res.json()

      if (res.ok) {
        toast.success("Wallet removed")

        if (isConnected && address?.toLowerCase() === walletAddress.toLowerCase()) {
          disconnect()
        }

        fetchWallets()
      } else {
        toast.error(data.message || "Failed to delete wallet")
      }
    } catch (err) {
      toast.error("Error deleting wallet")
    }
  }


  /* ---------- FETCH WALLETS ---------- */
  function fetchWallets() {
    
    const token = localStorage.getItem("token")
    fetch(`${backend_url}/cypher/getwallet`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(d => setWallets(d.wallet || []))
  }

  useEffect(fetchWallets, [])

  /* ---------- LIVE BALANCE ---------- */
  async function loadBalance(addr) {
    const bal = await publicClient.getBalance({ address: addr })
    setBalance(formatEther(bal))
  }

  /* ---------- TX HISTORY (basic RPC) ---------- */
  async function fetchTransactions(address, chainId) {
    const API_KEY = import.meta.env.VITE_ETHERSCAN_KEY

    const url = `https://api.etherscan.io/v2/api?chainid=${chainId}&module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${API_KEY}`

    const res = await fetch(url)
    const data = await res.json()

    if (data.status !== "1") return []

    return data.result
  }


  useEffect(() => {
    if (!address || !chain?.id) return

    console.log("🔗 Network changed:")
    console.log("Chain ID:", chain?.id)
    console.log("Chain Name:", chain?.name)
    console.log("Native Currency:", chain?.nativeCurrency?.symbol)
    setloadingtxs(true)
    loadBalance(address)
    fetchTransactions(address, chain.id)
      .then(txs => setTxs(txs.slice(0, 5)))
      .catch(() => setTxs([]))
      .finally(() => setloadingtxs(false))

  }, [address, chain?.id])



  /*------------Send-------------*/
  function handlesend() {
    if (!to || !amount) {
      return toast.error("To address and amount required")
    }

    sendTransaction({
      to,
      value: parseEther(amount)
    })
  }

  /*----------------logout-------------------*/
  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }
  /* ---------- UI ---------- */
  return (
    <div className="conwallet-container">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-content">
          <div className="logo-container" onClick={() => navigate("/")}>
            <img src="/images/logo.png" alt="VaultX Logo" className="logo-img" />
            <span className="logo-text">VaultX</span>
          </div>
          <div className="nav-right">
            <div className="profile-container" onClick={() => setOpen(!openw)}>
              <span className="username-label">{name}</span>
              <img
                src="/images/profile2.png"
                alt="profile"
                className="profile-img"
              />
            </div>

            {openw && (
              <div className="dropdown">
                <div className="dropdown-header">
                  <p className="user-email">{name}</p>
                </div>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="dashboard-content">
        <div className="wallet-header">
          <h2>Your Wallets</h2>
          <button className="add-wallet-btn" onClick={() => open()}>
            <span className="plus-icon">+</span> Connect New
          </button>
        </div>

        <div className="wallet-grid">
          {wallets && wallets.map(w => {
            const active =
              isConnected &&
              address?.toLowerCase() === w.address.toLowerCase()

            return (
              <div
                key={w.address}
                className={`wallet-card ${active ? "active" : ""}`}
                onClick={() => {
                  setExpanded(w.address === expanded ? null : w.address)
                  if (active) {
                    loadBalance(address)
                  }
                }}
              >
                <div className="wallet-card-header">
                  <div className="wallet-info">
                    <h3>{w.label}</h3>
                    <p className="wallet-address">{w.address.slice(0, 6)}...{w.address.slice(-4)}</p>
                  </div>
                  <button className="delete-btn" onClick={(e) => deleteWallet(w.address, e)}>
                    <img src="/images/bin5.png" alt="Delete" />
                  </button>
                </div>
                
                <div className="wallet-footer">
                  <span className={`status-indicator ${active ? 'online' : 'offline'}`}></span>
                  <p className="wallet-chain">{active ? chain?.name : w.chain}</p>
                </div>

                {expanded === w.address && (
                  <div className="wallet-details" onClick={(e) => e.stopPropagation()}>
                    {active ? (
                      <div className="active-details">
                        <div className="balance-section">
                          <span className="balance-label">Current Balance</span>
                          <p className="balance-value">
                            {balance ?? "0.00"} <span>{chain?.nativeCurrency?.symbol || "ETH"}</span>
                          </p>
                        </div>

                        {/* Tab System */}
                        <div className="tab-navigation">
                          <button
                            className={`tab-link ${activeTab === 'txs' ? 'active' : ''}`}
                            onClick={() => setActiveTab('txs')}
                          >
                            Transactions
                          </button>
                          <button
                            className={`tab-link ${activeTab === 'send' ? 'active' : ''}`}
                            onClick={() => setActiveTab('send')}
                          >
                            Send Assets
                          </button>
                        </div>

                        {/* Tab Content */}
                        <div className="tab-panel">
                          {activeTab === 'txs' && (
                            <div className="transactions-list">
                              {loadingtxs ? (
                                <p className="loading-text">Fetching transactions...</p>
                              ) : txs.length === 0 ? (
                                <p className="empty-text">No recent transactions found.</p>
                              ) : (
                                <>
                                  {txs.map(tx => (
                                    <div key={tx.hash} className="transaction-item">
                                      <div className="tx-info">
                                        <span className="tx-hash">{tx.hash.slice(0, 10)}...</span>
                                        <span className="tx-amount">{parseFloat(formatEther(BigInt(tx.value))).toFixed(4)} {chain?.nativeCurrency?.symbol || "ETH"}</span>
                                      </div>
                                      <a href={`${chain.blockExplorers.default.url}/tx/${tx.hash}`} target="_blank" rel="noreferrer" className="tx-link">
                                        View
                                      </a>
                                    </div>
                                  ))}
                                  <a className="explorer-link" href={`${chain?.blockExplorers?.default?.url}/address/${address}`} target="_blank" rel="noreferrer">
                                    View on Explorer &rarr;
                                  </a>
                                </>
                              )}
                            </div>
                          )}

                          {activeTab === 'send' && (
                            <div className="send-form">
                              <div className="input-field">
                                <label>Recipient Address</label>
                                <input
                                  placeholder="0x..."
                                  value={to}
                                  onChange={(e) => setTo(e.target.value)}
                                />
                              </div>
                              <div className="input-field">
                                <label>Amount ({chain?.nativeCurrency?.symbol || "ETH"})</label>
                                <input
                                  type="number"
                                  placeholder="0.00"
                                  value={amount}
                                  onChange={(e) => setAmount(e.target.value)}
                                />
                              </div>
                              <button className="submit-send-btn" onClick={handlesend} disabled={isPending}>
                                {isPending ? "Processing..." : "Confirm Transaction"}
                              </button>
                            </div>
                          )}
                        </div>

                        <div className="action-footer">
                          <button className="switch-net-btn" onClick={() => open({ view: 'Networks' })}>
                            Switch Network
                          </button>
                          <button className="disconnect-btn" onClick={() => disconnect()}>
                            Disconnect
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="inactive-details">
                        <p>This wallet is disconnected</p>
                        <button className="reconnect-btn" onClick={() => open()}>Connect Now</button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}


//for web3modal v1
// async function connectwallet(){

//   const modal = new Web3Modal()
//   const provider= await modal.connect()

//   let address,chain,label
//   if(provider.request){
//       const account=await provider.request({
//           method:"eth_requestAccounts"
//       })
//       address=account[0]

//      const chainId=await provider.request({
//       method:"eth_chainId"
//      })
//      chain="ethereum"

//      label= provider.isMetaMask?"MetaMask":"EVM wallet"
//   }
//   else if(provider.publicKey){
//       await provider.connect()
//       address = provider.publicKey.toString()
//       chain="solana"
//       label=provider.name || "Solana Wallet"
//   }

//   const wallet ={
//       address,
//       chain,
//       label
//   }
//   const token=localStorage.getItem("token")
//   const res = await fetch("http://localhost:3000/cypher/connectwallet",{
//       method:"POST",
//       headers:{
//           "Content-Type":"application/json",
//           Authorization:`Bearer ${token}`
//       },
//       body:JSON.stringify(wallet)
//   })
//   const data= await res.json()
//   if(res.ok){
//       toast.success(data.message)
//   }
//   else{
//       toast.error(data.message)
//   }
// }

