import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Conwallet.css";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";
import {useAppKit} from "@reown/appkit/react"
export function Conwallet(){

  const [name, setname] = useState("");
  const [openw, setOpen] = useState(false);
  const [walletsaved,setwalletsaved] = useState(false)
  const navigate = useNavigate();
  const {address,chain,connector,isConnected} = useAccount();

  const {open} = useAppKit()
  useEffect(() => {
    
    const token = localStorage.getItem("token");

   if(!token) return
    fetch("http://localhost:3000/cypher/userdetails", {
        method:"GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      setname(data.username);
    });
  }, []);

  useEffect(()=>{
    if(!isConnected || !address || walletsaved) return

    const wallet={
      address : address,
      chain : chain?.name || "Unknown",
      label : connector?.name || "Wallet"
    }
 const token = localStorage.getItem("token");
    const res = fetch("http://localhost:3000/cypher/connectwallet",{
      method :"POST",
      headers :{
        Authorization :`Bearer ${token}`,
        "Content-Type":"application/json"
      },
      body : JSON.stringify(wallet)
    }).then(res=>res.json())
    .then(data=>{toast.success(data.message)
      setwalletsaved(true)
    })
    .catch(()=>toast.error("Failed to connect wallet"))
  },[isConnected,address])

  function handleLogout(){
    localStorage.removeItem("token");
    navigate("/login");
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


  return(
    <>
    <div className="navbar">
      <div className="nav-left">
        <img src="/images/logo1.png" alt="logo" className="logo" onClick={()=>navigate('/')}/>
      </div>

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
        <button onClick={()=>open()}>Connect Wallet</button>
 
     {isConnected && (
        <div>
          <p>Wallet: {connector?.name}</p>
          <p>Address: {address}</p>
          <p>Network: {chain?.name}</p>
        </div>
     )}

    </>
    

  )
}
