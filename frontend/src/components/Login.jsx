import { Link, useNavigate } from "react-router-dom";
import './Login.css'
import { useState } from "react";
import { toast } from "react-toastify";


export function Login(){

    const [email,setemail]=useState("")
    const [password,setpass]=useState("")
     const [showPass, setShowPass] = useState(false);
     const navigate=useNavigate();

     const backend_url=import.meta.env.VITE_BACKEND_ROUTE
   async function handleform(e){
   try{

    e.preventDefault();
   //get and send data and store in db and manage and store jwt for login

    const res = await fetch(`${backend_url}/cypher/login`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({email,password})   
    })

    const data = await res.json()
    if(res.ok){
        localStorage.setItem("token",data.token)
        toast.success(data.message)
        navigate('/conwallet')
        //toast(data.token)
    }
    else{
        toast.error(data.message)
    }
   }
   catch(err){
    toast.error(err.message)
   }
    }


    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>Welcome Back</h1>
                <p className="auth-subtitle">Login to access your dashboard</p>
                <form onSubmit={handleform} method="post">
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            placeholder="name@example.com"
                            required
                            name="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <div className="password-input-wrapper">
                            <input
                                type={showPass ? "text" : "password"}
                                name="password"
                                placeholder="••••••••"
                                required
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setpass(e.target.value)}
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setShowPass(!showPass)}
                                aria-label={showPass ? "Hide password" : "Show password"}
                            >
                                <img
                                    src={showPass ? "/images/eye.png" : "/images/eye-off.png"}
                                    alt=""
                                />
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="auth-button">Login</button>
                </form>

                <div className="auth-footer">
                    Don't have an account? <Link to='/signup'>Sign Up</Link>
                </div>
            </div>
        </div>
    )
}