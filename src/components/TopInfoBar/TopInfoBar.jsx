import { useEffect, useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";
import "./TopInfoBar.css";

export default function TopInfoBar({ sentinelRef, forceVisible = false }) {
  const [visible, setVisible] = useState(true);

  // ── A. Immediately reset visible whenever forceVisible changes
  useEffect(() => {
    setVisible(true);
  }, [forceVisible]);

  // ── B. Scroll-driven hide/show (skipped only if forceVisible)
  useEffect(() => {
    if (forceVisible) return;
    const el = sentinelRef?.current;
    if (!el) return;

    let frame;
    const loop = () => {
      setVisible(el.getBoundingClientRect().top > 0);
      frame = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(frame);
  }, [sentinelRef, forceVisible]);

  // ── C. Combine both flags
  const shouldShow = forceVisible || visible;

  // ── D. Toggle a global html class if you like
  useEffect(() => {
    document.documentElement.classList.toggle("info-bar-visible", shouldShow);
  }, [shouldShow]);

  return (
    <div className={`top-info-bar ${shouldShow ? "show" : "hide"}`}>
      <div className="bar-left">
        <FaPhoneAlt /> +91 70034 16272 | <FaEnvelope /> info@mathsenseacademy.com
      </div>
      <div className="bar-right">
        Follow us:
        <a href="https://www.facebook.com/shomesirmath/" aria-label="Facebook">
          <FaFacebookF />
        </a>
        <a href="https://x.com/ShomeSuvad79678" aria-label="Twitter">
          <FaTwitter />
        </a>
        <a href="https://www.instagram.com/maths_ense" aria-label="Instagram">
          <FaInstagram />
        </a>
        <a
          href="https://www.youtube.com/@mathsenseacademy"
          aria-label="YouTube"
        >
          <FaYoutube />
        </a>
      </div>
    </div>
  );
}
