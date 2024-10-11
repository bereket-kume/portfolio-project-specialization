import React, { useState } from "react";
import axios from "axios";
import './styles/Login.css';
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {  // Accept setUser as a prop
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/auth/login", {
                email,
                password,
            });
            console.log(res.data);

            // Store access token in local storage
            localStorage.setItem('access_token', res.data.access_token);

            // Set user information (if you have user info in your response)
            setUser({ email });  // Assuming you want to store just the email, modify as needed
            
            setSuccess("Login successful!");
            setError("");
            navigate('/');
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
        <section className="intro-section">
    <div className="container">
        

        {/* New Div Below the Intro Content */}
        <div className="intro-extra-content m-10">
            <div className="extra-text">
                <h3>Why Our Community is Different</h3>
                <p>We focus on meaningful connections, bringing together creators and like-minded individuals. Whether you want to share ideas or collaborate on projects, our platform is the perfect place to grow together.</p>
                <p>Join us today and experience a community built on trust, creativity, and innovation.</p>
            </div>
            <div className="extra-features">
                <div className="feature">
                    <i className="fas fa-hands-helping"></i>
                    <h4>Supportive Environment</h4>
                    <p>Our community is all about helping one another, fostering growth, and creating opportunities.</p>
                </div>
                <div className="feature">
                    <i className="fas fa-lightbulb"></i>
                    <h4>Innovative Ideas</h4>
                    <p>Find and share creative ideas with others who are just as passionate as you are.</p>
                </div>
            </div>
        </div>

        <div className="intro-content">
            {/* Left: Image */}
            <div className="intro-image">
                <img src="/images/community2.jpg" alt="Community" />
            </div>
            {/* Right: Friendly Text */}
            
        </div>
    </div>
</section>
        </>
    );
};

export default Login;
