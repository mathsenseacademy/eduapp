import React from 'react';

// Import all homepage sections
import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import FeaturesSection from '../components/FeaturesSection/FeaturesSection';
import ProgramsSection from '../components/ProgramsSection/ProgramsSection';
import AboutSection from '../components/AboutSection/AboutSection';
import TestimonialSection from '../components/TestimonialSection/TestimonialSection';
import ExpertSection from '../components/ExpertSection/ExpertSection';
import BlogPreviewSection from '../components/BlogPreviewSection/BlogPreviewSection';
import ContactCTA from '../components/ContactCTA/ContactCTA';
import Footer from '../components/Footer/Footer';

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <FeaturesSection />
      <ProgramsSection />
      <AboutSection />
      <TestimonialSection />
      <ExpertSection />
      <BlogPreviewSection />
      <ContactCTA />
      <Footer />
    </>
  );
};

export default Home;
