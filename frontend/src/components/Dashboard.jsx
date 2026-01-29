import { Link } from "react-router-dom"
import './Dashboard.css'
export function Dashboard(){
    return (
    <div>
        <div className="nav">
            <div className="left">
                <img src="/images/logo1.png" alt="logo" />
            </div>

            <div className="right">
                <Link to="/login" style={{textDecoration: "none" ,marginTop:"-20px"}}><button>Login</button> </Link>
                <Link to="/signup" style={{ textDecoration: "none" ,marginTop:"-20px"}}><button>Sign Up</button></Link>
            </div>
        </div>

       
            <h1>Welcome To VaultX</h1>
            <p>Manage all your digital wallets in one place.</p>
            <p>Connect different blockchain wallets, view detailed balances, </p>
              <p>  and perform transactions seamlessly through a single unified platform.</p>
             <Link to="/signup"><button style={{marginTop:"100px"}}>Get Started</button></Link>
        
    </div>
)
}