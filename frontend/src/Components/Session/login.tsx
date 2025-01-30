import React, { useState, useContext } from "react";
import Context from "../../Context";
import styles from "./index.module.scss";
import { useNavigate } from "react-router";
//comment

const Login = () => {
    const [user, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { dispatch } = useContext(Context);
    const navigate = useNavigate();
    
    const handleSubmit = async (e: React.FormEvent) => {
        console.log( JSON.stringify({ user, password }))
        e.preventDefault();

        const formData = new FormData();
        formData.append("user", user);
        formData.append("password", password);
        const response = await fetch(`/api/auth/login`, {
        method: "POST",
       /* headers: {
            "Content-Type": "multipart/form-data",
        },*/
        body: formData,
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            dispatch({ type: "SET_STATE", state: { user: data.user, linkSuccess: true, isAuthenticated: true} });
            navigate("/");
        }
    };
    
    return (
        <div className={styles.mainContainer}>
            <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
                <input
                type="text"
                value={user}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="User"
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
