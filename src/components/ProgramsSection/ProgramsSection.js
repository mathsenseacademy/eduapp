// // ProgramsSection.js


// import React from "react";
// import "./ProgramsSection.css";
// import cardImage from "../../assets/class1-2.png";
// import heroImage from "../../assets/our-programs-hero.png";

// const programs = Array.from({ length: 9 }, (_, idx) => ({
//   title: "Wander and Wonder",
//   grade: "Class 10",
//   image: cardImage,
//   bgColor: idx % 3 === 0 ? "#dabcf9" : idx % 3 === 1 ? "#fc884f" : "#8dd4c0",
// }));

// export default function ProgramsSection() {
//   return (
//     <section className="programs-section ">
//       <h2 className="section-heading">
//         <span className="star-badge spin">★</span> Our Programs
//       </h2>

//       <div className="row">
//         {/* Left side image col-6 */}
//         <div className="col-md-6 d-flex justify-content-center">
//           <img
//             src={heroImage}
//             alt="Our Program Hero"
//             className="img-fluid programs-hero-img"
//           />
//         </div>

//         {/* Right side stacked 3 cards in col-2 */}
//         <div className="col-md-6 d-flex flex-column">
//           {programs.slice(0, 4).map((p, i) => (
//             <div
//               className="program-card mb-3"
//               key={i}
//               style={{ backgroundColor: p.bgColor }}
//             >
//               <div className="card-image">
//                 <img src={p.image} alt={p.title} />
//               </div>
//               <div className="card-text">
//                 <h4>{p.title}</h4>
//                 <p>{p.grade}</p>
//               </div>
//               <div className="card-arrow">→</div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="row mt-3">
//         {/* Remaining 6 cards in col-2s */}
//         {programs.slice(3).map((p, i) => (
//           <div className="col-md-6 mb-3" key={i}>
//             <div
//               className="program-card"
//               style={{ backgroundColor: p.bgColor }}
//             >
//               <div className="card-image">
//                 <img src={p.image} alt={p.title} />
//               </div>
//               <div className="card-text">
//                 <h4>{p.title}</h4>
//                 <p>{p.grade}</p>
//               </div>
//               <div className="card-arrow">→</div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="text-center mt-4">
//         <button className="more-btn">More Courses Here</button>
//       </div>
//     </section>
//   );
// }


import React from "react";
import "./ProgramsSection.css";
import cardImage from "../../assets/class1-2.png";
import heroImage from "../../assets/our-programs-hero.png";

// 1) import your JSON
import en from "../../i18n/en.json";

export default function ProgramsSection() {
  // 2) pull items array
  const programs = en.programs.items;

  return (
    <section className="programs-section">
      <h2 className="section-heading">
        <span className="star-badge spin">★</span> Our Programs
      </h2>

      <div className="row">
        {/* Left hero */}
        <div className="col-md-6 d-flex justify-content-center">
          <img
            src={heroImage}
            alt="Our Program Hero"
            className="img-fluid programs-hero-img"
          />
        </div>

        {/* First 4 cards stacked */}
        <div className="col-md-6 d-flex flex-column">
          {programs.slice(0, 4).map((p, i) => {
            const bg = i % 3 === 0
              ? "#dabcf9"
              : i % 3 === 1
              ? "#fc884f"
              : "#8dd4c0";
            return (
              <div
                key={i}
                className="program-card mb-3"
                style={{ backgroundColor: bg }}
              >
                <div className="card-image">
                  <img src={cardImage} alt={p.title} />
                </div>
                <div className="card-text">
                  <h4
  className="card-title"
  dangerouslySetInnerHTML={{ __html: p.title }}
/>
<p
  className="focus-area"
  dangerouslySetInnerHTML={{ __html: p.focusArea }}
/>
<p
  className="description"
  dangerouslySetInnerHTML={{ __html: p.description }}
/>

                </div>
                <div className="card-arrow">→</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="row mt-3">
        {/* Remaining cards */}
        {programs.slice(4).map((p, i) => {
          const idx = i + 4; // for correct color rotation
          const bg = idx % 3 === 0
            ? "#dabcf9"
            : idx % 3 === 1
            ? "#fc884f"
            : "#8dd4c0";
          return (
            <div className="col-md-6 mb-3" key={idx}>
              <div
                className="program-card"
                style={{ backgroundColor: bg }}
              >
                <div className="card-image">
                  <img src={cardImage} alt={p.title} />
                </div>
                <div className="card-text">
                 <h4
  className="card-title"
  dangerouslySetInnerHTML={{ __html: p.title }}
/>
<p
  className="focus-area"
  dangerouslySetInnerHTML={{ __html: p.focusArea }}
/>
<p
  className="description"
  dangerouslySetInnerHTML={{ __html: p.description }}
/>

                </div>
                <div className="card-arrow">→</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-4">
        <button className="more-btn">More Courses Here</button>
      </div>
    </section>
  );
}
