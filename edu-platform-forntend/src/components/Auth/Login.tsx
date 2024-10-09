import React, { useState } from "react";
import axios from "axios";
import './styles/Login.css';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/auth/login", {
                email,
                password,
            });
            console.log(res.data)
            setSuccess("Login successful!");
            setError("");
            navigate('/')
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.error || "An error occurred");
            } else {
                setError("An unknown error occurred");
            }
            setSuccess("");
        }
    };

    return (
        <div className="login-container">
            <h1 className="login-heading">Login</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="login-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                />
                <button type="submit" className="login-button">Login</button>
            </form>
            {error && <span className="login-message login-error">{error}</span>}
            {success && <span className="login-message login-success">{success}</span>}
        </div>
    );
};

export default Login;
