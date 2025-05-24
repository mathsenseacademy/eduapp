// src/components/Hero/Hero.js
import React from "react";
import "./Hero.css";
import heroImg from "../../assets/hero-boy-transparent2.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
const Hero = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="hero">
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 dangerouslySetInnerHTML={{ __html: t("hero.title") }} />

          <p dangerouslySetInnerHTML={{ __html: t("hero.description") }} />
          <button
            className="hero-btn"
            onClick={() => navigate("/student/register")}
          >
            {t("hero.registerButton")}
          </button>
        </motion.div>
      </div>

      <div className="hero-image">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img src={heroImg} alt={t("hero.imageAlt")} />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
