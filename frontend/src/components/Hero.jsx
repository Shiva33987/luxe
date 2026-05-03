import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const largeLogoRef = useRef(null);
  const heroImageRef = useRef(null);
  const textLeftRef = useRef(null);
  const textRightRef = useRef(null);
  const subtitleRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    // 1. Initial State Setup
    gsap.set(largeLogoRef.current, { x: 0, y: 0, scale: 1 });
    gsap.set(navRef.current, { opacity: 0, top: "-80px" });
    gsap.set(textLeftRef.current, { xPercent: -50, autoAlpha: 0 });
    gsap.set(textRightRef.current, { xPercent: 50, autoAlpha: 0 });
    gsap.set(subtitleRef.current, { autoAlpha: 0, y: 20 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=2000", // The duration of the scroll
        scrub: 1, // Smooth scrubbing
        pin: true, // Pin the entire section
        anticipatePin: 1,
      }
    });

    // We animate the large logo to shrink and move to the top-center
    tl.to(largeLogoRef.current, {
      scale: 0.2,
      top: "40px",    // Centers vertically in the 80px tall nav
      bottom: "auto", // Release the bottom CSS constraint
      yPercent: -50,  // Adjust center to the 40px mark
      ease: "power2.inOut",
      duration: 1
    }, 0);

    // Slide down the Navigation background smoothly from the very start of the scroll
    tl.to(navRef.current, {
      opacity: 1,
      top: "0px",
      ease: "power2.out",
      duration: 1
    }, 0);

    // Simultaneously, the central hero image scales up dramatically
    tl.to(heroImageRef.current, {
      scale: 3.5, // Zoom in effect
      opacity: 0.3, // Darken as it zooms to reveal text
      ease: "power2.inOut",
      duration: 1
    }, 0);

    // Text reveals and comes together from the sides as the logo is almost finished moving
    tl.to(textLeftRef.current, {
      xPercent: 0,
      autoAlpha: 1,
      ease: "power2.out",
      duration: 0.5
    }, 0.8);

    tl.to(textRightRef.current, {
      xPercent: 0,
      autoAlpha: 1,
      ease: "power2.out",
      duration: 0.5
    }, 0.8);

    // Subtitle appears below it at the same time
    tl.to(subtitleRef.current, {
      y: 0,
      autoAlpha: 1,
      ease: "power2.out",
      duration: 0.5
    }, 0.8);

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="hero-container">
      {/* Sticky Navigation Background & Links (hidden initially) */}
      <div ref={navRef} className="hero-nav">
        <ul className="hero-nav-links">
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/services">SERVICES</Link></li>
        </ul>
        <ul className="hero-nav-links">
          <li><Link to="/about">ABOUT</Link></li>
          <li><Link to="/contact">CONTACT</Link></li>
        </ul>
      </div>

      {/* The massive logo that shrinks into the nav */}
      <img
        ref={largeLogoRef}
        src="https://i.ibb.co/KzNkVpTg/Whats-App-Image-2026-05-01-at-12-37-44-PM-removebg-preview.png"
        alt="Aira Luxe Logo"
        className="hero-large-logo"
      />

      {/* The Hero Image that zooms in */}
      <div className="hero-image-wrapper">
        <img 
          ref={heroImageRef}
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3" 
          alt="Luxury Salon" 
          className="hero-image"
        />
      </div>

      {/* The Text that reveals after zoom */}
      <div className="hero-text-overlay">
        <h1 ref={textLeftRef} className="hero-heading-left">AIRA</h1>
        <h1 ref={textRightRef} className="hero-heading-right">LUXE</h1>
      </div>
      
      {/* Subtitle that appears underneath */}
      <div ref={subtitleRef} className="hero-subtitle-overlay">
        <p>HAIR AND BEAUTY</p>
      </div>
    </section>
  );
};

export default Hero;
