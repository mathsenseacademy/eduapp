import React from 'react';
import './BlogPreviewSection.css';

const blogPosts = [
  {
    title: '5 Fun Ways to Practice Math at Home',
    excerpt: 'Discover creative activities to make math practice exciting and engaging for young learners.',
    image: 'https://via.placeholder.com/300x200?text=Math+Fun',
    link: '/blog/fun-math-at-home',
  },
  {
    title: 'How to Build Math Confidence in Kids',
    excerpt: 'Confidence is key in learning math. Here are proven ways to help your child feel empowered.',
    image: 'https://via.placeholder.com/300x200?text=Confidence',
    link: '/blog/build-math-confidence',
  },
  {
    title: 'Top 10 Tips for Virtual Math Learning',
    excerpt: 'Make online math classes more effective with these expert-backed tips and tricks.',
    image: 'https://via.placeholder.com/300x200?text=Virtual+Tips',
    link: '/blog/virtual-math-tips',
  },
];

const BlogPreviewSection = () => {
  return (
    <section className="blog-preview">
      <h2>From Our Blog</h2>
      <div className="blog-grid">
        {blogPosts.map((post, idx) => (
          <div className="blog-card" key={idx}>
            <img src={post.image} alt={post.title} />
            <div className="blog-content">
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <a href={post.link} className="read-more">Read More →</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogPreviewSection;
