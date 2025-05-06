// src/components/Hero/Hero.js
import React from 'react';
import './Hero.css';
import heroImg from '../../assets/img1.png';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const Hero = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(); // ✅ Add this

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>{t('hero.title')}</h1>
        <p>{t('hero.description')}</p>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/student/register')}>
          {t('hero.registerButton')}
        </button>
      </div>
      <div className="hero-image">
        <img src={heroImg} alt={t('hero.imageAlt')} />
      </div>
    </section>
  );
};
export default Hero;
