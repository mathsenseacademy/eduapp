import React from 'react';

// Import all homepage sections
// import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import FeaturesSection from '../components/FeaturesSection/FeaturesSection';
import ProgramsSection from '../components/ProgramsSection/ProgramsSection';
import AboutSection from '../components/AboutSection/AboutSection';
// import TestimonialSection from '../components/TestimonialSection/TestimonialSection';
// import ExpertSection from '../components/ExpertSection/ExpertSection';
// import BlogPreviewSection from '../components/BlogPreviewSection/BlogPreviewSection';
import ContactCTA from '../components/ContactCTA/ContactCTA';
// import Footer from '../components/Footer/Footer';

const Home = ({ heroRef, sentinelRef }) => {
  return (
    <>
    {/* <section data-scroll-section> */}
      {/* <Header /> */}
      <section id="hero" className="hero-section" ref={heroRef}> <Hero /></section>
       {/* 1-pixel sentinel marks end of hero */}
      <div ref={sentinelRef} style={{ height: 1 }} />
      <FeaturesSection />
      <ProgramsSection />
      <AboutSection />
      {/* <TestimonialSection />
      <ExpertSection />
      <BlogPreviewSection /> */}
      <ContactCTA />
      {/* <Footer /> */}
      {/* </section> */}
    </>
  );
};

export default Home;
