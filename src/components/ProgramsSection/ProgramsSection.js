import React from "react";
import "./ProgramsSection.css";
import { Button, Typography, Grid, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";

import icon1 from "../../assets/grade1-3.png";
import icon2 from "../../assets/grade4-6.png";
import icon3 from "../../assets/grade7-8.png";
import icon4 from "../../assets/highschool.png";
import bannerImg from "../../assets/transparent_icon_5.png";

const ProgramsSection = () => {
  const { t } = useTranslation();

  const programs = t("programs.items", { returnObjects: true });

  const icons = [icon1, icon2, icon3, icon4];

  return (
    <section className="programs-section container">
      <div className="row align-items-center">
        <div className="col-md-6">
          <h2
            className="mb-4 title"
            dangerouslySetInnerHTML={{ __html: t("programs.heading") }}
          />
          <Grid container spacing={3}>
  {programs.map((program, index) => (
    <Grid item xs={12} sm={6} key={index}>
      <Paper elevation={2} className="program-card">
        <div className="program-inner">
          <div className="program-icon-box">
            <img src={icons[index]} alt="Program icon" className="program-icon" />
          </div>
          <div className="program-text">
            <h3 dangerouslySetInnerHTML={{ __html: program.title }} />
            <p dangerouslySetInnerHTML={{ __html: program.description }} />
            <div className="program-btn-wrapper">
              <Button variant="contained" size="small" className="enroll-btn">
                Enroll Now
              </Button>
            </div>
          </div>
        </div>
      </Paper>
    </Grid>
  ))}
</Grid>

        </div>

        {/* Right: Banner Image */}
        <div className="col-md-6 text-center mt-4 mt-md-0">
          <img
            src={bannerImg}
            alt="Math students"
            className="img-fluid rounded"
          />
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
