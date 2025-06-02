import React, { useEffect, useState } from "react";
import "./Hero.css";
import hero1 from "../../assets/hero-boy-transparent2.png";       
import hero2 from "../../assets/hero-boy-transparent1.png";                 
import hero3 from "../../assets/humanistic_math_kid_transparent.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

const IMAGES = [hero1, hero2, hero3];          // add new images here
const SLIDE_TIME = 4500;                       // ms each slide stays visible

const Hero = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);

  /* ---------- rotate the image every SLIDE_TIME ms ---------- */
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % IMAGES.length);
    }, SLIDE_TIME);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hero">
      {/* ---------- Left: text & CTA ---------- */}
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

      {/* ---------- Right: auto-changing image ---------- */}
      <div className="hero-image">
        <AnimatePresence mode="wait">
          <motion.img
            key={IMAGES[index]}                 // re-mounts on change
            src={IMAGES[index]}
            alt={t("hero.imageAlt")}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Hero;
