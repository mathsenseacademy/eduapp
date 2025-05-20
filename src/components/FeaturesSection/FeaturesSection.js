import React from "react";
import "./FeaturesSection.css";
import { useTranslation } from "react-i18next";

import gradIcon from "../../assets/hatIcon.png";
import bookIcon from "../../assets/bookIcon.png";
import clockIcon from "../../assets/watchIcon.png";
import graphIcon from "../../assets/graphIcon.png";
import featureIllustration from "../../assets/features-illustration-left1.png";

const FeaturesSection = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: gradIcon,
      title: t("features.expertTutors.title"),
      description: t("features.expertTutors.description"),
    },
    {
      icon: bookIcon,
      title: t("features.interactiveClasses.title"),
      description: t("features.interactiveClasses.description"),
    },
    {
      icon: clockIcon,
      title: t("features.flexibleScheduling.title"),
      description: t("features.flexibleScheduling.description"),
    },
    {
      icon: graphIcon,
      title: t("features.personalizedLearning.title"),
      description: t("features.personalizedLearning.description"),
    },
  ];

  return (
    <section className="features">
      <div className="features-container">
        <div className="features-image">
          <img src={featureIllustration} alt="Learning Illustration" />
        </div>

        <div className="features-content">
          <h2 dangerouslySetInnerHTML={{ __html: t("features.heading") }} />
          <div className="feature-cards">
            {features.map((feature, index) => (
              <div className="feature-card" key={index}>
                <img src={feature.icon} alt={`Feature ${index + 1}`} />
                <h3 dangerouslySetInnerHTML={{ __html: feature.title }} />
                <p dangerouslySetInnerHTML={{ __html: feature.description }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
