import React from "react";
import "./AboutSection.css";

import aboutUs from "../../assets/aboutUs.png";
import shapeMask from "../../assets/aboulUsShape.png";

export default function AboutSection() {
  return (
    <section className="about-section">
      <div className="row gx-0 align-items-center">

        {/* TEXT SIDE */}
        <div className="col-12 col-lg-6 text-block">
          <h2 className="about-heading">
            <strong>About</strong>{" "}
            <span className="highlight">Math Senseacademy</span>
          </h2>
          <p>
            Founded with a vision to redefine math education, MathSense Academy
            empowers students from Class 1 to 12 through structured,
            curriculum-aligned online learning.
          </p>
          <p>
            Our programs combine expert-led instruction, interactive class
            formats, and adaptive learning to support students at every level—
            whether they’re building basics, preparing for school exams, or
            aiming for NTSE, NMTC, Olympiads, or JEE.
          </p>
          <p>We are committed to:</p>
          <ul>
            <li>Making math fun, logical, and relatable</li>
            <li>Providing small-group classes with focused attention</li>
            <li>Equipping learners with the skills to think, solve, and succeed</li>
          </ul>
        </div>

        {/* IMAGE SIDE (masked) */}
        <div className="col-12 col-lg-6 image-block">
          <div
            className="custom-image-wrapper"
            style={{
              backgroundImage: `url(${aboutUs})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
              backgroundSize: "cover",        // zoom the photo
              WebkitMaskImage: `url(${shapeMask})`,
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskSize: "300% 300%",         // blow up the mask
              WebkitMaskPosition: "center center",
              maskImage: `url(${shapeMask})`,
              maskRepeat: "no-repeat",
              maskSize: "300% 300%",               // blow up the mask
              maskPosition: "center center",
            }}
          />
        </div>
      </div>
    </section>
  );
}
