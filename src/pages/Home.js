import Hero from '../components/Hero/Hero';
import FeaturesSection from '../components/FeaturesSection/FeaturesSection';
import ProgramsSection from '../components/ProgramsSection/ProgramsSection';
import AboutSection from '../components/AboutSection/AboutSection';
import TestimonialSection from '../components/TestimonialSection/TestimonialSection';

const Home = ({ heroRef, sentinelRef }) => {
  return (
    <>
    {/* <section data-scroll-section> */}
      {/* <Header /> */}
      <section id="hero" className="hero-section" ref={heroRef}> <Hero /></section>
       {/* 1-pixel sentinel marks end of hero */}
      <div ref={sentinelRef} style={{ height: 1 }} />
      <FeaturesSection />
      <section id="programs">
      <ProgramsSection />
      </section>
      <section id="testimonials">
      <TestimonialSection />
      </section>
      <section id="about">
      <AboutSection />
      </section>

      {/*<ExpertSection />*/}
      {/* <BlogPreviewSection />  */}
      {/* <ContactCTA /> */}
      {/* <Footer /> */}
      {/* </section> */}
    </>
  );
};

export default Home;
