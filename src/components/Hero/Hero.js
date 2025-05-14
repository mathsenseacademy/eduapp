// src/components/Hero/Hero.js
import React from 'react';
import './Hero.css';
import heroImg from '../../assets/hero-boy-transparent.png';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const Hero = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>{t('hero.title')}</h1>
        <p>{t('hero.description')}</p>
        <button className="hero-btn" onClick={() => navigate('/student/register')}>
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