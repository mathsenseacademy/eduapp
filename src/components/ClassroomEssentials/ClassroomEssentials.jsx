// src/components/ClassroomEssentials/ClassroomEssentials.jsx
import React, { useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import "./ClassroomEssentials.css";

const ITEMS = [
  {
    key: "school",
    title: "School Maths",
    content: `We cover all your in-school maths topics—fractions, algebra, geometry and
      more—so you’re rock-solid on the curriculum.`,
  },
  {
    key: "mental",
    title: "Mental Maths",
    content: `Sharpen your head-math skills: quick sums, number bonds, puzzles and tricks
      to wow friends (and beat the clock!).`,
  },
  {
    key: "real",
    title: "Real-life maths application",
    content: `Learn to apply maths to everyday life—budgeting, measurements, data in
      graphs—so you see the numbers behind the world around you.`,
  },
  {
    key: "competitive",
    title: "Competitive Maths",
    content: `We offer a lot of advanced maths content. The student can work on
      out-of-school topics like number series and parity to ace competitive tests.`,
  },
];

export default function ClassroomEssentials() {
  // keep track of which panel is open
  const [openKey, setOpenKey] = useState(null);

  const toggle = (key) =>
    setOpenKey((current) => (current === key ? null : key));

  return (
    <section className="ce-container">
      <h1 className="ce-title">Classroom essentials</h1>
      <div className="ce-subtitle">
        A 360° approach for excellence in school & beyond
      </div>

      <div className="ce-panels">
        {ITEMS.map((item, i) => {
          const isOpen = openKey === item.key;
          // choose one of three background-SVGs
          const svgIndex = i % 3; // 0,1,2,0,1,2,...
          return (
            <div
              key={item.key}
              className={`ce-panel ce-panel--${svgIndex}`}
            >
              <div
                className="ce-header"
                onClick={() => toggle(item.key)}
              >
                <span>{item.title}</span>
                {isOpen ? (
                  <AiOutlineUp className="ce-icon" />
                ) : (
                  <AiOutlineDown className="ce-icon" />
                )}
              </div>
              {isOpen && (
                <div className="ce-body">
                  <p>{item.content}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
