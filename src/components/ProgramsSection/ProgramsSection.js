import React from "react";
import "./ProgramsSection.css";
import { useTranslation } from "react-i18next";

import icon1 from "../../assets/grade1-3.png";
import icon2 from "../../assets/grade4-6.png";
import icon3 from "../../assets/grade7-8.png";
import icon4 from "../../assets/highschool.png";
import bannerImg from "../../assets/transparent_icon_6.png"; // transparent boy

const ProgramsSection = () => {
  const { t } = useTranslation();
  const programs = t("programs.items", { returnObjects: true });
  const icons = [icon1, icon2, icon3, icon4];

  return (
    <section className="programs-section-wrapper">
      <div className="container-fluid programs-section">
        <div className="row align-items-center">
          {/* Left: Cards */}
          <div className="col-md-6">
            <h2
              className="mb-4 title"
              dangerouslySetInnerHTML={{ __html: t("programs.heading") }}
            />
            <div className="row g-4">
              {programs.map((program, index) => (
                <div className="col-12 col-sm-6" key={index}>
                  <div className="card h-100 program-card d-flex flex-column justify-content-between">
                    <div className="d-flex gap-3 align-items-start">
                      <div className="program-icon-box">
                        <img
                          src={icons[index]}
                          alt="icon"
                          className="program-icon"
                        />
                      </div>
                      <div className="program-text flex-grow-1">
                        <h5
                          dangerouslySetInnerHTML={{ __html: program.title }}
                        />
                        <p
                          dangerouslySetInnerHTML={{
                            __html: program.description,
                          }}
                        />
                      </div>
                    </div>
                    <div className="mt-3 text-center">
                      <button
                        type="button"
                        className="btn btn-primary enroll-btn"
                      >
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Banner Image */}
          <div className="col-md-6 text-center">
            <img
              src={bannerImg}
              alt="Math students"
              className="img-fluid rounded"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
