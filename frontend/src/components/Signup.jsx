import { Link } from "react-router-dom";
import './Login.css'
import { toast } from "react-toastify"
import { useState } from "react";

export function Signup() {
    const [username, setuser] = useState("")
    const [email, setemail] = useState("")
    const [password, setpass] = useState("")
    const [showPass, setShowPass] = useState(false);
    const backend_url=import.meta.env.VITE_BACKEND_ROUTE
    async function handleform(e) {
        try {
            e.preventDefault();

            const res = await fetch(`${backend_url}/cypher/register`, {//res recieves an obj which has a key ok which is used down 
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
        <div className="auth-container">
            <div className="auth-card">
                <h1>Create Account</h1>
                <p className="auth-subtitle">Join VaultX to manage your crypto assets</p>
                <form onSubmit={handleform} method="post">
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            placeholder="username"
                            required
                            name="username"
                            value={username}
                            autoComplete="username"
                            onChange={(e) => setuser(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            placeholder="name@example.com"
                            required
                            name="email"
                            value={email}
                            autoComplete="email"
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
                    <button type="submit" className="auth-button">Create Account</button>
                </form>

                <div className="auth-footer">
                    Already have an account? <Link to='/login'>Login</Link>
                </div>
            </div>
        </div>
    )
}