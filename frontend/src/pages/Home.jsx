import React from 'react';
import Hero from '../components/Hero';
import SlideSwitch from '../components/SlideSwitch';
import HorizontalScroll from '../components/HorizontalScroll';
import Services from '../components/Services';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <SlideSwitch />
      <HorizontalScroll />
      <Services />
    </div>
  );
};

export default Home;
