import React from "react";
import "./ProgramsSection.css";
import { useTranslation } from "react-i18next";

import icon1 from "../../assets/grade1-3.png";
import icon2 from "../../assets/grade4-6.png";
import icon3 from "../../assets/grade7-8.png";
import icon4 from "../../assets/highschool.png";
import bannerImg from "../../assets/transparent_icon_6.png";

const ProgramsSection = () => {
  const { t } = useTranslation();
  const programs = t("programs.items", { returnObjects: true });
  const icons = [icon1, icon2, icon3, icon4];

  const layoutPattern = [2, 3, 3, 2];
  let currentIndex = 0;

  const rows = layoutPattern.map((count, rowIdx) => {
    const rowCards = [];
    for (let i = 0; i < count; i++) {
      if (currentIndex >= programs.length) break;
      const program = programs[currentIndex];
      rowCards.push(
        <div className={`program-card`} key={currentIndex}>
          <div className="program-icon-box">
            <img
              src={icons[currentIndex % icons.length]}
              alt="icon"
              className="program-icon"
            />
          </div>
          <div className="program-text">
            <h5 dangerouslySetInnerHTML={{ __html: program.title }} />
            <p dangerouslySetInnerHTML={{ __html: program.description }} />
            <button className="btn btn-primary enroll-btn">Enroll Now</button>
          </div>
        </div>
      );
      currentIndex++;
    }

    return (
      <div className={`card-row row-${rowIdx}`} key={`row-${rowIdx}`}>
        {rowCards}
      </div>
    );
  });

  return (
    <section className="programs-section-wrapper">
      <h2
        className="mb-4 title"
        dangerouslySetInnerHTML={{ __html: t("programs.heading") }}
      />
      <div className="programs-container">
        <div className="cards-with-image">
          <div className="cards-left">{rows}</div>
          <div className="image-right">
            <img src={bannerImg} alt="Math student" className="banner-img" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
