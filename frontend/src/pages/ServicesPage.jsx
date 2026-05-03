import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ServicesPage.css';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    id: "hair-styling",
    title: "Hair Styling & Cutting",
    desc: "Sculpting your identity with precision cuts and bespoke styling tailored to your facial structure. Experience the artistry of true craftsmanship.",
    img: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=800",
    side: "left"
  },
  {
    id: "color-alchemy",
    title: "Color Alchemy",
    desc: "From seamless balayage to vivid transformations, our master colorists bring your vision to life using premium, restorative formulas.",
    img: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&q=80&w=800",
    side: "right"
  },
  {
    id: "rejuvenating-spa",
    title: "Rejuvenating Spa",
    desc: "Immerse yourself in our sensory spa experiences. Deep tissue massages, organic facials, and therapies designed to heal and renew.",
    img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=800",
    side: "left"
  },
  {
    id: "bridal-masterpiece",
    title: "Bridal Masterpiece",
    desc: "Your journey to the altar begins here. Flawless makeup, intricate updos, and an aura of pure elegance curated just for you.",
    img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=800",
    side: "right"
  }
];

const JourneyCard = ({ data, index }) => {
  const cardRef = useRef(null);
  
  // Framer Motion 3D interactive logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXPos = useMotionValue(0);
  const mouseYPos = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
    mouseXPos.set(mouseX);
    mouseYPos.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const spotlightBackground = useMotionTemplate`radial-gradient(circle at ${mouseXPos}px ${mouseYPos}px, rgba(212, 175, 55, 0.25) 0%, transparent 60%)`;

  return (
    <div className={`journey-row ${data.side}`} ref={cardRef}>
      <motion.div 
        className="journey-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
      >
        <motion.div className="card-spotlight" style={{ background: spotlightBackground }} />
        <div className="card-border-glow"></div>
        
        <div className="journey-card-inner">
          <div className="journey-image-wrapper" style={{ transform: "translateZ(30px)" }}>
            <img src={data.img} alt={data.title} />
          </div>
          <div className="journey-content" style={{ transform: "translateZ(60px)" }}>
            <span className="journey-number">0{index + 1}</span>
            <h2>{data.title}</h2>
            <p>{data.desc}</p>
            <button className="book-btn">Book Experience</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ServicesPage = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Scroll to top when loading the page
    window.scrollTo(0, 0);

    const rows = gsap.utils.toArray('.journey-row');
    
    rows.forEach((row, i) => {
      const isLeft = row.classList.contains('left');
      const xOffset = isLeft ? -150 : 150;
      
      gsap.fromTo(row,
        { 
          opacity: 0, 
          x: xOffset,
          rotationY: isLeft ? -20 : 20,
          z: -200
        },
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          z: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 85%", // Trigger when the top of the row hits 85% of the viewport height
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="services-page" ref={containerRef}>
      {/* Global Navigation Bar for Services Page */}
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

      <div className="services-hero">
        <h1>The Hair & Beauty Journey</h1>
        <p>Step into a world where artistry meets luxury.</p>
        <div className="scroll-indicator">
          <span>Explore</span>
          <div className="line"></div>
        </div>
      </div>

      <div className="journey-timeline-container">
        {/* The central glowing line */}
        <div className="timeline-line"></div>
        
        <div className="journey-grid">
          {servicesData.map((service, index) => (
            <JourneyCard key={service.id} data={service} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
