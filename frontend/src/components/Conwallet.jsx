import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Conwallet.css"
import { toast } from "react-toastify"
import { useAccount, useDisconnect, usePublicClient, useSendTransaction, useSwitchChain } from "wagmi"
import { useAppKitNetwork } from "@reown/appkit/react"
import { useAppKit } from "@reown/appkit/react"
import { formatEther, parseEther } from "viem"


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

    fetch("http://localhost:3000/cypher/userdetails", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(d => setName(d.username))
  }, [])

  /* ---------- SAVE WALLET ---------- */
  useEffect(() => {
    if (!isConnected || !address) return

    const token = localStorage.getItem("token")

    fetch("http://localhost:3000/cypher/connectwallet", {
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
      const res = await fetch("http://localhost:3000/cypher/deletewallet", {
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
    fetch("http://localhost:3000/cypher/getwallet", {
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
    function handleLogout(){
    localStorage.removeItem("token");
    navigate("/login");
  }
  /* ---------- UI ---------- */
  return (
    <>
      {/* NAVBAR */}
      <div className="navbar">
        <img src="/images/logo1.png" className="logo" onClick={() => navigate("/")} />
        <div className="nav-right">
        <img 
          src="/images/profile4.png" 
          alt="profile" 
          className="profile-img"
          onClick={() => setOpen(!openw)}
        />

        {openw && (
          <div className="dropdown">
            <div className="username">{name}</div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
      </div>




      {/* WALLETS */}
      <div className="wallet-column">
        {wallets && wallets.map(w => {
          const active =
            isConnected &&
            address?.toLowerCase() === w.address.toLowerCase()

          return (
            <div
              key={w.address}
              className={`wallet-card ${active ? "active" : ""}`}
              onClick={() => {
                setExpanded(w.address)
                if (active) {
                  loadBalance(address)
                  //loadTxs(address)
                }
              }}
            >
              <img src="/images/bin1.png" className="delete-wallet-btn"
                onClick={(e) => deleteWallet(w.address, e)} alt="" />

              <h3>{w.label}</h3>
              <p>{w.address.slice(0, 6)}...{w.address.slice(-4)}</p>
              <p>{active ? chain?.name : w.chain}</p>

              {expanded === w.address && (
                <div className="wallet-details">
                  {active ? (
                    <>
                      <h4>Balance</h4>
                      <p>{balance ?? "Loading..."}</p>

                      <h4>Transactions</h4>
                      {loadingtxs && <p>Loading transactions...</p>}

                      {!loadingtxs && txs.length === 0 && (
                        <p>No recent transactions</p>
                      )}

                      {txs.map(tx => (
                        <div key={tx.hash} className="tx-row">
                          <span>{tx.hash.slice(0, 10)}...</span>
                          <span>{formatEther(BigInt(tx.value))} ETH</span>
                          <a
                            href={`${chain.blockExplorers.default.url}/tx/${tx.hash}`}
                            target="_blank"
                            rel="noreferrer"
                          >View</a>

                        </div>
                      ))}
                      <div>
                        <a href={`${chain?.blockExplorers?.default?.url}/address/${address}`}
                          target="_blank"
                          rel="noreferrer">
                          View all Transactions on {chain?.name}
                        </a>
                      </div>


                      <h4>Send</h4>
                      <input placeholder="To address"
                        value={to}
                        onChange={(e) => { setTo(e.target.value) }} />

                      <input placeholder="Amount"
                        value={amount}
                        onChange={(e) => { setAmount(e.target.value) }} />

                      <button onClick={handlesend} disabled={isPending}>
                        {isPending ? "Sending..." : "Send"}
                      </button>

                      <button onClick={(e) => {
                        e.stopPropagation()
                        disconnect()
                      }}>Disconnect</button>

                      <button onClick={(e) => {
                        e.stopPropagation()
                        open({ view: 'Networks' })  // ✅ Opens only network switcher
                      }}>
                        Switch Network
                      </button>
                    </>
                  ) : (
                    <button onClick={() => open()}>Reconnect</button>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div><button onClick={() => open()} style={{ marginTop: "80px" }}>Connect Wallet</button></div>
    </>
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

