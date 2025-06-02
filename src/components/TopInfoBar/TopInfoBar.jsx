import { useEffect, useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import "./TopInfoBar.css";

/**
 * Slim info bar that hides once the sentinel (placed right after the hero)
 * touches or crosses the top of the viewport.
 * Works with LocomotiveScroll by polling getBoundingClientRect().
 * Also flips a class on <html> so the main header can slide up/down.
 */
export default function TopInfoBar({ sentinelRef }) {
  const [visible, setVisible] = useState(true);

  /* poll sentinel every frame */
  useEffect(() => {
    const el = sentinelRef?.current;
    if (!el) return;

    let frame;
    const loop = () => {
      const top = el.getBoundingClientRect().top;
      setVisible(top > 0);      // bar visible while sentinel below header
      frame = requestAnimationFrame(loop);
    };
    loop();

    return () => cancelAnimationFrame(frame);
  }, [sentinelRef]);

  /* toggle html class so header knows bar state */
  useEffect(() => {
    document.documentElement.classList.toggle("info-bar-visible", visible);
  }, [visible]);

  return (
    <div className={`top-info-bar ${visible ? "show" : "hide"}`}>
      <div className="bar-left">
        <FaPhoneAlt /> &nbsp;+91 9062428472&nbsp;&nbsp;|&nbsp;&nbsp;
        <FaEnvelope /> &nbsp; info@mathsenseacademy.com
      </div>

      <div className="bar-right">
        Follow&nbsp;us&nbsp;:&nbsp;
        <a href="https://facebook.com" aria-label="Facebook">
          <FaFacebookF />
        </a>
        <a href="https://twitter.com" aria-label="Twitter">
          <FaTwitter />
        </a>
        <a href="https://youtube.com" aria-label="YouTube">
          <FaYoutube />
        </a>
      </div>
    </div>
  );
}
