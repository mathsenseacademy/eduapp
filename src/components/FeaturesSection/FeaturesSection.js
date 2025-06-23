import React from "react";
import "./FeaturesSection.css";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

import gradIcon from "../../assets/hatIcon.png";
import bookIcon from "../../assets/bookIcon.png";
import clockIcon from "../../assets/watchIcon.png";
import graphIcon from "../../assets/graphIcon.png";
import logo from "../../assets/logoWithName.png";
import mentor from "../../assets/teacher.png";

const FeaturesSection = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: gradIcon,
      title: "Expert Tutors",
      desc: "All our instructors are math experts with years of experience.",
    },
    {
      icon: bookIcon,
      title: "Interactive Classes",
      desc: "Fun, engaging sessions that keep kids excited about learning.",
    },
    {
      icon: clockIcon,
      title: "Flexible Scheduling",
      desc: "Weekend and evening classes available to fit your schedule.",
    },
    {
      icon: graphIcon,
      title: "Personalized Learning",
      desc: "Courses designed to meet each student’s unique needs and learning style.",
    },
  ];

  // Directional animation variants per index
  const getDirection = (idx) => {
    const directions = [
      { x: -60, y: 0 }, // left
      { x: 60, y: 0 },  // right
      { x: 0, y: 60 },  // bottom
      { x: 0, y: -60 }, // top
    ];
    return directions[idx % directions.length];
  };

  return (
    <section className="why-section">
      <div className="why-header">
        <h2>
          <span>Why Choose</span>
          <img src={logo} alt="Mathsense Academy" />
        </h2>
        <p className="why-heade-subtitle">At MathSense Academy, we help students from <strong>Grade 1 to 12</strong> build strong math skills through expert-led, engaging, and flexible learning</p>
      </div>

      <div className="why-grid-wrapper">
        <div className="why-grid row">
          {features.map((item, idx) => {
            const direction = getDirection(idx);
            return (
              <motion.div
                className="why-card col-md-6 col-lg-6 col-sm-6"
                key={idx}
                initial={{ opacity: 0, ...direction }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: idx * 0.2,
                  ease: [0.25, 0.8, 0.25, 1],
                }}
                viewport={{ once: true }}
              >
                <img src={item.icon} alt={item.title} />
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
  className="why-mentor"
  initial={{ opacity: 0, y: 100, filter: "blur(12px)" }}
  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
  transition={{
    duration: 1.5,
    ease: [0.22, 1, 0.36, 1], // dramatic float
  }}
  viewport={{ once: true }}
>
  <img src={mentor} alt="Mentor" />
</motion.div>

      </div>
    </section>
  );
};

export default FeaturesSection;
