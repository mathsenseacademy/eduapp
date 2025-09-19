import 'animate.css';
import './TestimonialSection.css';
import { useEffect, useRef } from 'react';
import ReactOwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const testimonials = [
  {
    title: 'Anushka Dey',
    text: 'Mathsense Academy makes learning math fun and easy, helping me feel confident and score better in class! ',
    img: require('../../assets/AnushkaDey.png'),
  },
  {
    title: 'Susmita Adhikary',
    text: 'Math Sense Academy has transformed the way I understand math, making complex topics simple and enjoyable!',
    img: require('../../assets/Susmita-Adhikary.png'),
  },
  {
    title: 'Sourashis Banerjee',
    text: 'Thanks to Mathsense Academy, I now find math exciting and easier to understand!',
    img: require('../../assets/Sourashis-Banerjee.png'),
  },
];

export default function TestimonialSection() {
  const scrollRef = useRef(null);
  const options = {
    items: 1,
    nav: true,
    loop: true,
    autoplay: true,
    autoplayTimeout: 6000,
    autoplayHoverPause: true,
    dotsContainer: '.owl-dots',
    animateIn: 'animate__flipInX',
    animateOut: 'animate__slideOutDown',
  };
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
      <div className="testimonial-section">
        <div className="ts-inner">
          <div className='tsi-heading'>
            <span>Testimonials</span>
            <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</span>
          </div>
          <div className="tsi-carousel">
            <ReactOwlCarousel className="owl-theme" {...options}>
            {
              testimonials.map((item, index) => {
                return(
                  <div className="item" key={index}>
                    <div class="testimonial">
                      <div class="pic">
                          <img src={item.img} alt={item.title} />
                      </div>
                      <div class="testimonial-content">
                          <h3 class="testimonial-title">{item.title}</h3>
                          <p class="description">{item.text}</p>
                      </div>
                    </div>
                  </div>
                )
              })
            }
            </ReactOwlCarousel>
          </div>
        </div>
      </div>
  );
}
