// import React from 'react';
// import './BlogPreviewSection.css';

// const blogPosts = [
//   {
//     title: '5 Fun Ways to Practice Math at Home',
//     excerpt: 'Discover creative activities to make math practice exciting and engaging for young learners.',
//     image: 'https://via.placeholder.com/300x200?text=Math+Fun',
//     link: '/blog/fun-math-at-home',
//   },
//   {
//     title: 'How to Build Math Confidence in Kids',
//     excerpt: 'Confidence is key in learning math. Here are proven ways to help your child feel empowered.',
//     image: 'https://via.placeholder.com/300x200?text=Confidence',
//     link: '/blog/build-math-confidence',
//   },
//   {
//     title: 'Top 10 Tips for Virtual Math Learning',
//     excerpt: 'Make online math classes more effective with these expert-backed tips and tricks.',
//     image: 'https://via.placeholder.com/300x200?text=Virtual+Tips',
//     link: '/blog/virtual-math-tips',
//   },
// ];

// const BlogPreviewSection = () => {
//   return (
//     <section className="blog-preview">
//       <h2>From Our Blog</h2>
//       <div className="blog-grid">
//         {blogPosts.map((post, idx) => (
//           <div className="blog-card" key={idx}>
//             <img src={post.image} alt={post.title} />
//             <div className="blog-content">
//               <h3>{post.title}</h3>
//               <p>{post.excerpt}</p>
//               <a href={post.link} className="read-more">Read More →</a>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default BlogPreviewSection;


import React from "react";
import "./BlogPreviewSection.css";
import icon1 from "../../assets/bookIcon.png";
import icon2 from "../../assets/bookIcon.png";
import icon3 from "../../assets/bookIcon.png";

export default function BlogPreviewSection() {
  return (
    <section className="blogs-section py-5">
      <div className="container">
        <h2 className="text-center fw-bold mb-5">Blogs</h2>
        <div className="row justify-content-center g-4">

          {/* Exam Reminder */}
          <div className="col-12 col-md-6 col-lg-4">
            <div className="blog-card orange-bg">
              <img src={icon1} alt="exam icon" className="blog-icon" />
              <h4 className="blog-title">Exam reminder</h4>
              <hr />
              <p>The unit exam will be on the following dates:</p>
              <p><strong>December 8: 8B<br />December 9: 8A, 8C</strong></p>
              <hr />
              <p className="blog-footer">Check your class syllabus for exam coverage.</p>
            </div>
          </div>

          {/* Volunteer Opportunity */}
          <div className="col-12 col-md-6 col-lg-4">
            <div className="blog-card purple-bg">
              <img src={icon2} alt="volunteer icon" className="blog-icon" />
              <h4 className="blog-title">Volunteer opportunity</h4>
              <hr />
              <p>
                The science department is looking for passionate students to join EcoAction.
                As a volunteer, you'll use your knowledge and skills in real-world conservation and research.
              </p>
              <hr />
              <p className="blog-footer">Make a difference! Apply today at <strong>hello@reallygreatsite.com</strong>.</p>
            </div>
          </div>

          {/* Science Fair */}
          <div className="col-12 col-md-6 col-lg-4">
            <div className="blog-card green-bg">
              <img src={icon3} alt="science icon" className="blog-icon" />
              <h4 className="blog-title">Science fair competition</h4>
              <hr />
              <p>
                Are you a budding scientist? Sign up for the Annual Science Fair!
              </p>
              <p>
                <strong>KEY DATES:</strong><br />
                Submission: <strong>November 23, 2030</strong><br />
                Fair: <strong>April 17, 2030</strong>
              </p>
              <hr />
              <p className="blog-footer">Register at <strong>www.reallygreatsite.com</strong></p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
