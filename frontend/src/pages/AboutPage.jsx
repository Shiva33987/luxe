import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AboutPage.css';

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const containerRef = useRef(null);
  
  // 3D Floating Gallery Mouse Interaction
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 100, damping: 30 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);
  
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

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

    // Hero Parallax
    gsap.to('.about-hero-bg', {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: '.about-hero',
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // Story Text Reveal (3D Flip Up)
    const storyLines = gsap.utils.toArray('.story-line');
    storyLines.forEach((line) => {
      gsap.fromTo(line, 
        { y: 100, opacity: 0, rotateX: -45 },
        {
          y: 0, opacity: 1, rotateX: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: line,
            start: "top 90%",
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="about-page" ref={containerRef}>
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

      {/* Cinematic Hero */}
      <section className="about-hero">
        <div className="about-hero-bg">
          <img src="https://images.unsplash.com/photo-1516975080661-46b0754cae3f?auto=format&fit=crop&q=80&w=2000" alt="Salon Interior" />
          <div className="about-hero-overlay"></div>
        </div>
        <div className="about-hero-content">
          <span className="subtitle">Est. 2024</span>
          <h1>Aira Luxe</h1>
        </div>
      </section>

      {/* The Story Section */}
      <section className="about-story">
        <div className="story-container">
          <div className="story-line-wrapper"><h2 className="story-line">More than a salon.</h2></div>
          <div className="story-line-wrapper"><h2 className="story-line">A sanctuary for the modern</h2></div>
          <div className="story-line-wrapper"><h2 className="story-line">aesthete. We blend world-class</h2></div>
          <div className="story-line-wrapper"><h2 className="story-line">artistry with unparalleled</h2></div>
          <div className="story-line-wrapper"><h2 className="story-line">luxury to create an unforgettable</h2></div>
          <div className="story-line-wrapper"><h2 className="story-line">experience of self-renewal.</h2></div>
        </div>
      </section>

      {/* 3D Floating Gallery */}
      <section className="about-gallery">
        <div className="gallery-text">
          <h3>The Sanctuary</h3>
          <p>Immerse yourself in a meticulously designed space where every detail is curated for your comfort and inspiration.</p>
        </div>
        
        <div className="gallery-3d-wrapper" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <motion.div 
            className="gallery-3d-container"
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          >
            {/* Back Image */}
            <div className="gallery-img back-img" style={{ transform: "translateZ(-100px) scale(0.9)" }}>
              <img src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&q=80&w=800" alt="Detail 1" />
            </div>
            
            {/* Center Image */}
            <div className="gallery-img center-img" style={{ transform: "translateZ(0px)" }}>
              <img src="https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&q=80&w=1000" alt="Main Salon" />
            </div>
            
            {/* Front Image */}
            <div className="gallery-img front-img" style={{ transform: "translateZ(100px) scale(1.1)" }}>
              <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800" alt="Detail 2" />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
