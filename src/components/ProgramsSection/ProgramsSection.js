import React from "react";
import "./ProgramsSection.css";
import { Button, Typography, Grid, Paper } from "@mui/material";

import icon1 from "../../assets/grade1-3.png";
import icon2 from "../../assets/grade4-6.png";
import icon3 from "../../assets/grade7-8.png";
import icon4 from "../../assets/highschool.png";
import bannerImg from "../../assets/transparent_icon_5.png";

const programs = [
  {
    icon: icon1,
    title: "Grade 1–3 Math",
    description: "Foundations in addition, subtraction, and number sense.",
  },
  {
    icon: icon2,
    title: "Grade 4–6 Math",
    description: "Multiplication, division, and early Algebra.",
  },
  {
    icon: icon3,
    title: "Grade 7–8 Math",
    description: "Pre-Algebra and Geometry essentials.",
  },
  {
    icon: icon4,
    title: "High School Math",
    description: "Algebra, Geometry, and SAT/ACT prep.",
  },
];
const ProgramsSection = () => {
  return (
    <section className="programs-section container">
      <div className="row align-items-center">
        {/* Left: Cards */}
        <div className="col-md-6">
          <Typography variant="h4" className="mb-4 title">
            Explore Our Programs
          </Typography>
          {programs.map((program, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Paper elevation={2} className="program-card full-height">
                <img
                  src={program.icon}
                  alt={program.title}
                  className="program-icon"
                />
                <div className="program-content">
                  <Typography variant="h6">{program.title}</Typography>
                  <Typography variant="body2" className="text-muted">
                    {program.description}
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    className="enroll-btn mt-2"
                  >
                    Enroll Now
                  </Button>
                </div>
              </Paper>
            </Grid>
          ))}
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
