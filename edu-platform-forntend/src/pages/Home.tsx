import React from 'react';
import './style/homePage.css';
import Footer from '../components/Shared/Footer';
import Header from '../components/Shared/Header';
import Login from '../components/Auth/Login';

const HomePage = () => {
    return (
        <>
        <Header />
        <div className="bg-gray-50">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="container">
                    <h1>Welcome to Your Awesome Platform</h1>
                    <p>Engage with your community and enjoy premium content</p>
                    <a href="/signup" className="btn-primary">Get Started</a>
                </div>
            </section>

            {/* Image and Friendly Comments Section */}
            <section className="intro-section">
                <div className="container">
                    <div className="intro-content">
                        {/* Left: Image */}
                        <div className="intro-image">
                            <img src="/images/community1.jpg" alt="Community" />
                        </div>
                        {/* Right: Friendly Text */}
                        <div className="intro-text">
                            <h2>Join Our Vibrant Community</h2>
                            <p>At <strong>Our Platform</strong>, we believe in the power of connection. Whether you’re a creator, a community leader, or simply looking to engage with like-minded individuals, we’ve got you covered. </p>
                            <p>Start conversations, share insights, and grow your network—all in a friendly and welcoming space.</p>
                            <a href="/signup" className="btn-secondary">Become a Member</a>
                        </div>
                    </div>
                </div>
            </section>
   
<section className="blur-bg-section">
    <div className="blur-content">
        <h2>Welcome to Our Community</h2>
        <p>Join like-minded individuals and grow together in a space designed for collaboration and support.</p>
        <a href="/signup" className="btn-primary">Join Now</a>
    </div>
</section>


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

            {/* Features Section */}
           

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <h2>Ready to Get Started?</h2>
                    <p>Join thousands of users engaging with communities around the world.</p>
                    <a href="/signup" className="btn-primary">Sign Up Now</a>
                </div>
            </section>
        </div>
        <Footer />
        </>
    );
};

export default HomePage;
