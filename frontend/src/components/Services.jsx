import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import './Services.css';

const TiltCard = ({ number, title, description }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXPos = useMotionValue(0);
  const mouseYPos = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // 3D Tilt
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);

    // Spotlight
    mouseXPos.set(mouseX);
    mouseYPos.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const spotlightBackground = useMotionTemplate`radial-gradient(circle at ${mouseXPos}px ${mouseYPos}px, rgba(212, 175, 55, 0.25) 0%, transparent 70%)`;

  return (
    <motion.div 
      className="service-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
    >
      <motion.div 
        className="card-spotlight"
        style={{ background: spotlightBackground }}
      />
      
      <div className="card-border-glow" style={{ transform: "translateZ(30px)" }}></div>
      
      <div className="card-content-wrapper" style={{ transform: "translateZ(60px)" }}>
        <div className="card-number">{number}</div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const cards = gsap.utils.toArray('.service-card-wrapper');
    
    cards.forEach((card, i) => {
      gsap.fromTo(card, 
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
  }, []);

  return (
    <section className="services-section section" ref={containerRef}>
      <div className="container">
        <div className="services-header text-center">
          <h2 className="title">Why Choose Aira Luxe</h2>
          <p className="subtitle">The pinnacle of self-care and aesthetic perfection.</p>
        </div>

        <div className="services-grid" style={{ perspective: "1000px" }}>
          <div className="service-card-wrapper">
            <TiltCard 
              number="01" 
              title="Master Artists" 
              description="Our team consists of award-winning stylists with decades of experience in high-end fashion and beauty." 
            />
          </div>
          <div className="service-card-wrapper mt-5">
            <TiltCard 
              number="02" 
              title="Premium Products" 
              description="We exclusively use organic, sustainably sourced, and top-tier luxury brands for all our treatments." 
            />
          </div>
          <div className="service-card-wrapper">
            <TiltCard 
              number="03" 
              title="Tailored Experience" 
              description="Every session begins with a personalized consultation to ensure results that perfectly complement your features." 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
