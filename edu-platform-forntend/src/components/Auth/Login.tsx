import React, { useState, FormEvent, ChangeEvent } from "react";
import axios from "axios";
import './styles/Login.css';
import { Link, useNavigate } from "react-router-dom";

interface User {
  email: string;
  role: string;
}

interface LoginProps {
  setUser: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ setUser }) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/auth/login", {
                email,
                password,
            });

            const token = res.data.access_token.access_token;
            localStorage.setItem('access_token', token);

            const userData: User = {
                email,
                role: res.data.role,  
            };
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));

            setSuccess("Login successful!");
            setError("");

            if (res.data.role === 'ADMIN') {
                navigate('/admin');  
            } else {
                navigate('/'); 
            }

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
        <>
        <div className="login-container">
            <h1 className="login-heading">Login</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    className="login-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    className="login-input"
                />
                <button type="submit" className="login-button">Login</button>
                <Link to='/signup' >signup</Link>
            </form>
            {error && <span className="login-message login-error">{error}</span>}
            {success && <span className="login-message login-success">{success}</span>}
        </div>
        </>
    );
};

export default Login; 