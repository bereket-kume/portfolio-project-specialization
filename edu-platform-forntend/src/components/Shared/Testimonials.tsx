import React, { useState } from 'react';
import './styles/Testimonial.css';

const testimonials = [
    {
        text: "This platform has completely transformed how I connect with others in my field. The premium communities are well worth it!",
        name: "- Sarah, Premium Member"
    },
    {
        text: "I’ve found so many helpful free communities. It’s a great place to start learning and growing.",
        name: "- John, Free Member"
    },
    {
        text: "Joining this community has been a game changer for my career. I've met so many talented individuals!",
        name: "- Emily, Premium Member"
    },
    {
        text: "The connections I made here are invaluable. Highly recommend!",
        name: "- Mark, Free Member"
    }
];

const TestimonialSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section className="testimonial-slider">
            <h2 className="slider-heading">What Our Members Say</h2>
            <div className="testimonial-item">
                <p className="testimonial-text">{testimonials[currentIndex].text}</p>
                <h3 className="testimonial-name">{testimonials[currentIndex].name}</h3>
            </div>
            <div className="slider-controls">
                <button className="arrow left" onClick={handlePrev}>&lt;</button>
                <button className="arrow right" onClick={handleNext}>&gt;</button>
            </div>
        </section>
    );
};

export default TestimonialSlider;
