import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HorizontalScroll.css';

gsap.registerPlugin(ScrollTrigger);

const panelsData = [
  {
    id: 'hair-styling',
    title: 'Hair Styling',
    description: 'Masterfully crafted cuts and styles.',
    img: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3',
  },
  {
    id: 'coloring',
    title: 'Coloring',
    description: 'Vibrant, long-lasting custom coloring.',
    img: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3',
  },
  {
    id: 'spa-treatments',
    title: 'Spa Treatments',
    description: 'Rejuvenating facials and massages.',
    img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3',
  },
  {
    id: 'bridal-services',
    title: 'Bridal Services',
    description: 'Flawless preparation for your special day.',
    img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=800',
  },
];

const HorizontalScroll = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(1); // Start with 'Coloring' in center if desired, or 0. Let's use 1 so there's one on the left.

  // The core animation function that positions the cards
  const updateCarousel = (index, duration = 0.8) => {
    const panels = gsap.utils.toArray('.horizontal-panel');
    
    panels.forEach((panel, i) => {
      const diff = i - index; // Distance from active index
      
      // Calculate 3D position based on distance from center
      let x = 0;
      let z = 0;
      let rotateY = 0;
      let scale = 1;
      let opacity = 1;
      let zIndex = 10 - Math.abs(diff);

      if (diff === 0) {
        // Center card
        x = 0;
        z = 0;
        rotateY = 0;
        scale = 1.05;
        opacity = 1;
      } else if (diff < 0) {
        // Left cards
        x = -120 * Math.abs(diff) + "%";
        z = -200 * Math.abs(diff);
        rotateY = 35;
        scale = 0.8;
        opacity = Math.abs(diff) > 1 ? 0 : 0.6; // Hide if too far
      } else {
        // Right cards
        x = 120 * Math.abs(diff) + "%";
        z = -200 * Math.abs(diff);
        rotateY = -35;
        scale = 0.8;
        opacity = Math.abs(diff) > 1 ? 0 : 0.6; // Hide if too far
      }

      gsap.to(panel, {
        x: x,
        z: z,
        rotationY: rotateY,
        scale: scale,
        opacity: opacity,
        zIndex: zIndex,
        duration: duration,
        ease: "power3.out",
        overwrite: "auto"
      });

      // Parallax inner image
      const img = panel.querySelector('img');
      if (img) {
        gsap.to(img, {
          xPercent: diff * 20, // Move image in opposite direction for parallax
          duration: duration,
          ease: "power3.out",
          overwrite: "auto"
        });
      }
    });
  };

  useEffect(() => {
    // Initial setup
    const panels = gsap.utils.toArray('.horizontal-panel');
    gsap.set(panels, { transformPerspective: 1500, transformStyle: "preserve-3d" });
    
    // Initial position without animation delay
    updateCarousel(activeIndex, 0);

    // Create a ScrollTrigger that scrubs through the indices!
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=2000", // 2000px of scrolling
      pin: true,
      onUpdate: (self) => {
        // Map scroll progress (0 to 1) to an index (0 to length - 1)
        const progress = self.progress;
        const newIndex = Math.round(progress * (panelsData.length - 1));
        
        if (newIndex !== activeIndex) {
          setActiveIndex(newIndex);
        }
      }
    });

    return () => {
      st.kill();
    };
  }, []);

  // When activeIndex changes via click or scroll, update the GSAP positions
  useEffect(() => {
    updateCarousel(activeIndex, 0.8);
  }, [activeIndex]);

  const handleCardClick = (index) => {
    // If they click a card, we manually update the active index
    setActiveIndex(index);
    
    // We also need to update the scroll position so it doesn't instantly snap back 
    // to the old index if the user touches the scroll wheel!
    const st = ScrollTrigger.getAll().find(trigger => trigger.pin === sectionRef.current);
    if (st) {
      const targetProgress = index / (panelsData.length - 1);
      const scrollY = st.start + (st.end - st.start) * targetProgress;
      window.scrollTo({
        top: scrollY,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section ref={sectionRef} className="horizontal-section">
      <div className="horizontal-header container">
        <h2>Our Services</h2>
        <p>A journey through our premium offerings</p>
      </div>
      
      <div className="carousel-container" ref={containerRef}>
        {panelsData.map((panel, index) => (
          <div 
            key={panel.id} 
            className="horizontal-panel"
            onClick={() => handleCardClick(index)}
            style={{ cursor: index === activeIndex ? 'default' : 'pointer' }}
          >
            <div className="panel-image-wrapper">
              <img src={panel.img} alt={panel.title} />
              <div className="panel-overlay"></div>
            </div>
            <div className="panel-content">
              <h3>{panel.title}</h3>
              <p>{panel.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HorizontalScroll;
