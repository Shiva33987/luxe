import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import gsap from 'gsap';
import './ContactPage.css';

const ContactPage = () => {
  // 3D Tilt for the Contact Info Card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 100, damping: 30 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);
  
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    mouseX.set(x / width - 0.5);
    mouseY.set(y / height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    // Stagger text entrance
    gsap.fromTo('.contact-header h1', 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
    gsap.fromTo('.contact-header p', 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.2, ease: "power3.out" }
    );

    // Form fields stagger
    gsap.fromTo('.input-group', 
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, stagger: 0.1, delay: 0.4, ease: "power2.out" }
    );

  }, []);

  return (
    <div className="contact-page">
      {/* Global Navigation Bar */}
      <div className="services-nav">
        <ul className="hero-nav-links">
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/services">SERVICES</Link></li>
        </ul>
        <img 
          src="https://i.ibb.co/KzNkVpTg/Whats-App-Image-2026-05-01-at-12-37-44-PM-removebg-preview.png" 
          alt="Aira Luxe Logo" 
          className="services-nav-logo"
        />
        <ul className="hero-nav-links">
          <li><Link to="/about">ABOUT</Link></li>
          <li><Link to="/contact">CONTACT</Link></li>
        </ul>
      </div>

      <div className="contact-container">
        
        {/* Left Side: 3D Contact Info Card */}
        <div className="contact-info-wrapper" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <motion.div 
            className="contact-info-card"
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          >
            <div className="card-glare"></div>
            
            <div className="info-content" style={{ transform: "translateZ(50px)" }}>
              <h2>Visit the<br/>Sanctuary</h2>
              
              <div className="info-block">
                <h4>Address</h4>
                <p>123 Luxury Avenue,<br/>Film Nagar, Hyderabad 500096</p>
              </div>

              <div className="info-block">
                <h4>Contact</h4>
                <p>+91 98765 43210<br/>hello@airaluxe.com</p>
              </div>

              <div className="info-block">
                <h4>Hours</h4>
                <p>Mon - Sat: 10:00 AM - 8:00 PM<br/>Sun: 11:00 AM - 6:00 PM</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Premium Form */}
        <div className="contact-form-wrapper">
          <div className="contact-header">
            <h1>Get in Touch</h1>
            <p>Request an appointment or ask a question. Our concierge will assist you shortly.</p>
          </div>

          <form className="luxury-form" onSubmit={(e) => e.preventDefault()}>
            <div className="input-row">
              <div className="input-group">
                <input type="text" id="firstName" required />
                <label htmlFor="firstName">First Name</label>
                <div className="focus-border"></div>
              </div>
              <div className="input-group">
                <input type="text" id="lastName" required />
                <label htmlFor="lastName">Last Name</label>
                <div className="focus-border"></div>
              </div>
            </div>

            <div className="input-group">
              <input type="email" id="email" required />
              <label htmlFor="email">Email Address</label>
              <div className="focus-border"></div>
            </div>

            <div className="input-group">
              <select id="service" required defaultValue="">
                <option value="" disabled hidden></option>
                <option value="hair">Hair Styling & Coloring</option>
                <option value="spa">Spa & Wellness</option>
                <option value="bridal">Bridal Makeup</option>
                <option value="other">General Inquiry</option>
              </select>
              <label htmlFor="service">Service of Interest</label>
              <div className="focus-border"></div>
            </div>

            <div className="input-group">
              <textarea id="message" rows="4" required></textarea>
              <label htmlFor="message">Your Message</label>
              <div className="focus-border"></div>
            </div>

            <button type="submit" className="submit-btn">
              <span>Send Request</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;
