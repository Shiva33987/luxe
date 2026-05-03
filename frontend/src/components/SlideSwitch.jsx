import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './SlideSwitch.css';

gsap.registerPlugin(ScrollTrigger);

const slidesData = [
  {
    id: 1,
    title: "Precision & Artistry",
    subtitle: "Every cut is a masterpiece.",
    img: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&q=80&w=2000"
  },
  {
    id: 2,
    title: "Luxury Treatments",
    subtitle: "Revitalize your soul.",
    img: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=2000"
  },
  {
    id: 3,
    title: "Bridal Elegance",
    subtitle: "For your most important day.",
    img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=2000"
  }
];

const SlideSwitch = () => {
  const containerRef = useRef(null);
  const slidesRef = useRef([]);

  useEffect(() => {
    const slides = slidesRef.current;
    
    // Create a GSAP timeline that pins the container
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${slides.length * 100}%`,
        pin: true,
        scrub: 1, // Smooth 1-second delay catchup
        anticipatePin: 1
      }
    });

    // 3D Stacking animation
    slides.forEach((slide, i) => {
      // We don't animate the last slide out
      if (i < slides.length - 1) {
        // As we scroll, the current slide pushes back in 3D space, rotates slightly, and fades
        tl.to(slide, {
          scale: 0.8,
          rotationX: -10,
          yPercent: -20,
          autoAlpha: 0,
          filter: 'blur(10px)', // adds depth
          ease: "none"
        }, i); // sequence based on index

        // The next slide comes up from the bottom with 3D rotation
        tl.fromTo(slides[i + 1], 
          { yPercent: 100, rotationX: 20, scale: 0.9, autoAlpha: 0 },
          { yPercent: 0, rotationX: 0, scale: 1, autoAlpha: 1, ease: "none" },
          i // starts at the same time the previous slide pushes back
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section className="slide-switch-container" ref={containerRef}>
      {slidesData.map((slide, index) => (
        <div 
          key={slide.id} 
          className="slide-panel"
          ref={el => slidesRef.current[index] = el}
          style={{ zIndex: slidesData.length - index }}
        >
          <div className="slide-image-wrapper">
            <img src={slide.img} alt={slide.title} />
            <div className="slide-overlay"></div>
          </div>
          <div className="slide-content">
            <h2 className="slide-title">{slide.title}</h2>
            <p className="slide-subtitle">{slide.subtitle}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default SlideSwitch;
