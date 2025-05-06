import React from 'react';
import './FeaturesSection.css';
import { useTranslation } from 'react-i18next';

const FeaturesSection = () => {
  const { t } = useTranslation(); // ✅

  const features = [
    {
      title: t('features.expertTutors.title'),
      description: t('features.expertTutors.description'),
      icon: '🎓',
    },
    {
      title: t('features.interactiveClasses.title'),
      description: t('features.interactiveClasses.description'),
      icon: '📚',
    },
    {
      title: t('features.flexibleScheduling.title'),
      description: t('features.flexibleScheduling.description'),
      icon: '🕒',
    },
    {
      title: t('features.personalizedLearning.title'),
      description: t('features.personalizedLearning.description'),
      icon: '📈',
    },
  ];

  return (
    <section className="features">
      <h2>{t('features.heading')}</h2>
      <div className="features-grid">
        {features.map((feature, idx) => (
          <div key={idx} className="feature-card">
            <div className="icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};


export default FeaturesSection;
