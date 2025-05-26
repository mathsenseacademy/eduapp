import React, { useRef } from "react";
import "./ProgramsSection.css";
import { useTranslation } from "react-i18next";

import icon1 from "../../assets/grade1-3.png";
import icon2 from "../../assets/grade4-6.png";
import icon3 from "../../assets/grade7-8.png";
import icon4 from "../../assets/highschool.png";

const COLS = 10;
const ROWS = 10;

export default function ProgramsSection() {
  const { t } = useTranslation();
  const programs = t("programs.items", { returnObjects: true });
  const icons = [icon1, icon2, icon3, icon4];

  /* build card rows (unchanged) */
  const pattern = [2, 3, 3, 2];
  let k = 0;
  const rows = pattern.map((cnt, r) => {
    const list = [];
    for (let i = 0; i < cnt && k < programs.length; i++, k++) {
      const p = programs[k];
      list.push(
        <div className="program-card" key={k}>
          <div className="program-icon-box">
            <img src={icons[k % icons.length]} alt="" className="program-icon" />
          </div>
          <div className="program-text">
            <h5 dangerouslySetInnerHTML={{ __html: p.title }} />
            <p  dangerouslySetInnerHTML={{ __html: p.description }} />
            <button className="btn btn-primary enroll-btn">Enroll&nbsp;Now</button>
          </div>
        </div>
      );
    }
    return (
      <div className={`card-row row-${r}`} key={r}>
        {list}
      </div>
    );
  });

  /* pixel-grid hover behaviour */
  const gridRef = useRef(null);
  const prevIndices = useRef([]);

  const highlight = (centerIdx) => {
    const tiles = gridRef.current.children;
    /* clear previous */
    prevIndices.current.forEach(({ i, cls }) => tiles[i]?.classList.remove(cls));
    const current = [];

    /* helper to add class if in range */
    const add = (row, col, cls) => {
      if (row >= 0 && row < ROWS && col >= 0 && col < COLS) {
        const idx = row * COLS + col;
        tiles[idx]?.classList.add(cls);
        current.push({ i: idx, cls });
      }
    };

    const row = Math.floor(centerIdx / COLS);
    const col = centerIdx % COLS;

    /* center */
    add(row, col, "glow-center");

    /* 8 neighbors */
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        add(row + dr, col + dc, "glow");
      }
    }
    prevIndices.current = current;
  };

  const handleMove = (e) => {
    const grid = gridRef.current;
    const rect = grid.getBoundingClientRect();
    const col = Math.floor(((e.clientX - rect.left) / rect.width) * COLS);
    const row = Math.floor(((e.clientY - rect.top)  / rect.height) * ROWS);
    highlight(row * COLS + col);
  };

  const clear = () => {
    prevIndices.current.forEach(({ i, cls }) =>
      gridRef.current.children[i].classList.remove(cls)
    );
    prevIndices.current = [];
  };

  const tiles = Array.from({ length: COLS * ROWS }, (_, i) => <span key={i} />);

  return (
    <section className="programs-section-wrapper">
      <div
        className="programs-section-gradient"
        onMouseMove={handleMove}
        onMouseLeave={clear}
      >
        {/* glow grid */}
        <div ref={gridRef} className="pixel-grid">{tiles}</div>

        {/* real content */}
        <h2
          className="mb-4 title"
          dangerouslySetInnerHTML={{ __html: t("programs.heading") }}
        />
        <div className="programs-container">{rows}</div>
      </div>
    </section>
  );
}
