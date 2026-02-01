import { Link } from "react-router-dom";
import './Login.css'
import { toast } from "react-toastify"
import { useState } from "react";

export function Signup() {
    const [username, setuser] = useState("")
    const [email, setemail] = useState("")
    const [password, setpass] = useState("")
    const [showPass, setShowPass] = useState(false);

    async function handleform(e) {
        try {
            e.preventDefault();

            const res = await fetch("http://localhost:3000/cypher/register", {//res recieves an obj which has a key ok which is used down 
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password, email })
            }
            )

            const data = await res.json();

            if (res.ok) {
                toast.success(data.message)
            }
            else {
                toast.error(data.message)
            }
        }
        catch (err) {
            toast.error(err.message)
        }


    }
    return (
        <div className="out">
            <h1>SignUp</h1>
            <form onSubmit={handleform} method="post">
                <div className="formgroup">
                    <label htmlFor="">Username</label>
                    <input type="text" placeholder="username" required name="username" value={username} autoComplete="username" onChange={(e) => setuser(e.target.value)} />
                </div>
                <div className="formgroup">
                    <label htmlFor="">Email</label>
                    <input type="email" placeholder="Email" required name="email" value={email} autoComplete="email" onChange={(e) => setemail(e.target.value)} />
                </div>
                <div className="formgroup">
                    <label htmlFor="">Password</label>
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
                        src={showPass ?  "/images/eye.png" : "/images/eye-off.png"}
                        alt="toggle"
                        className="eye-icon"
                        onClick={() => setShowPass(!showPass)}
                    />
                </div>
                <button type="submit">Create Account</button>
            </form>

            <div className="foot">
                Already have an account? <Link to='/login' style={{ textDecoration: "none" }}>Login</Link>
            </div>


        </div>
    )
}