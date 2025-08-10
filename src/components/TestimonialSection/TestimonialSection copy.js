import React, { useEffect, useRef } from 'react';
import './TestimonialSection.css';
import leaf from '../../assets/leaf.png'
const testimonials = [
  {
    title: 'Anushka Dey',
    text: 'Mathsense Academy makes learning math fun and easy, helping me feel confident and score better in class! ',
    // bgColor: '#d6b5f4',
    img: require('../../assets/AnushkaDey.png'),
    // img: require('../../assets/Anushka-Dey.svg'),
    // img: require('../../../src/assets/testimonialSVG.svg'),
    // background-image: url(../../../src/assets/testimonialSVG.svg);
  },
  {
    title: 'Susmita Adhikary',
    text: 'Math Sense Academy has transformed the way I understand math, making complex topics simple and enjoyable!',
    // bgColor: '#f57c29',
    // img: require('../../assets/Susmita-Adhikary.svg'),
    img: require('../../assets/Susmita-Adhikary.png'),
    // img: require('../../assets/bookIcon.png'),
    // img: require('../../../src/assets/testimonialSVG.svg'),
  },
  {
    title: 'Sourashis Banerjee',
    text: 'Thanks to Mathsense Academy, I now find math exciting and easier to understand!',
    // bgColor: '#8dd4c0',
    // img: require('../../assets/Sourashis-Banerjee.svg'),
    img: require('../../assets/Sourashis-Banerjee.png'),
    // img: require('../../../src/assets/testimonialSVG.svg'),
  },
  // {
  //   title: 'Progress reports',
  //   text: 'Track academic performance over time',
  //   // bgColor: '#ffcc80',
  //   img: require('../../assets/bookIcon.png'),
  //   // img: require('../../../src/assets/testimonialSVG.svg'),
  // },
  // {
  //   title: 'Safe environment',
  //   text: 'Ensure your child is in a supportive setting',
  //   // bgColor: '#b2ebf2',
  //   img: require('../../assets/bookIcon.png'),
  //   // img: require('../../../src/assets/testimonialSVG.svg'),
  // }
];

export default function TestimonialSection() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    const card = container?.querySelector('.testimonial-card');
    const scrollAmount = card?.offsetWidth + 16 || 300;

    let index = 0;

    const interval = setInterval(() => {
      if (!container) return;

      const totalCards = container.querySelectorAll('.testimonial-card').length;
      index++;

      if (index > totalCards - 3) {
        // Reset to beginning after last visible set
        index = 0;
      }

      container.scrollTo({
        left: index * scrollAmount,
        behavior: 'smooth',
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  return (
    <section className="testimonial-carousel-section py-5">
      <div className="">
        <div className="text-center mb-4">
          <img src={leaf} alt="Icon" width={40} />
          <h2 className="fw-bold display-6">Testimonials</h2>
        </div>

        <div className="scrolling-wrapper d-flex gap-3 overflow-auto" ref={scrollRef}>
          {testimonials.map((item, index) => (
            <div
              className="testimonial-card flex-shrink-0 p-4"
              style={{ backgroundColor: item.bgColor }}
              key={index}
            >
              <h4 className="testimonial-title">{item.title}</h4>
              <hr />
              <p className="testimonial-text">{item.text}</p>
              <img src={item.img} alt={item.title} className="testimonial-img" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
