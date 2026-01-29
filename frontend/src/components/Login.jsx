import { Link, useNavigate } from "react-router-dom";
import './Login.css'
import { useState } from "react";
import { toast } from "react-toastify";


export function Login(){

    const [email,setemail]=useState("")
    const [password,setpass]=useState("")
     const [showPass, setShowPass] = useState(false);
     const navigate=useNavigate();

   async function handleform(e){
   try{

    e.preventDefault();
   //get and send data and store in db and manage and store jwt for login

    const res = await fetch("http://localhost:3000/cypher/login",{
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


    return(
        <div className="out">
            <h1>Login</h1>
            <form onSubmit={handleform} method="post">
                
                <div className="formgroup">
                    <label htmlFor="">Email</label>
                    <input type="email" placeholder="Email" required name="email" autoComplete="email" value={email} onChange={(e)=>setemail(e.target.value)}/>
                </div>
                <div className="formgroup">
                     <input
                        type={showPass ? "text" : "password"}
                        name="password"
                        placeholder="password"
                        required
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setpass(e.target.value)}
                    />

                    <img
                        src={showPass ? "/images/eye-off.png" : "/images/eye.png"}
                        alt="toggle"
                        className="eye-icon-lg"
                        onClick={() => setShowPass(!showPass)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>

            <div className="foot">
                Dont have an account ? <Link to='/signup'style={{textDecoration:"none"}}>SignUp</Link>
            </div>
            

        </div>
    )
}