import React, { useState, useContext } from "react";
import Context from "../../Context";
import styles from "./index.module.scss";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { dispatch } = useContext(Context);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch("/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        });
        if (response.ok) {
        const data = await response.json();
        dispatch({ type: "SET_STATE", state: { user: data.user, linkSuccess: true} });
        }
    };
    
    return (
        <div className={styles.mainContainer}>
            <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                />
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                />
                <button type="submit" className={styles.formButton}>Login</button>
                <label> Not Registered? </label><a href="#">Register Here</a>
            </form>
        </div>
        </div>
    );

}

export default Login;
