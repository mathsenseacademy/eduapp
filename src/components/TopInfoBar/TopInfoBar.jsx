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

export default function TopInfoBar({ sentinelRef }) {
  const [visible, setVisible] = useState(true);

  // continuously watch sentinel’s position
  useEffect(() => {
    const el = sentinelRef?.current;
    if (!el) return;

    let frame;
    const loop = () => {
      const top = el.getBoundingClientRect().top;
      setVisible(top > 0);     // true while sentinel still below top of viewport
      frame = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(frame);
  }, [sentinelRef]);

  // add/remove a class on <html> if you need it elsewhere
  useEffect(() => {
    document.documentElement.classList.toggle("info-bar-visible", visible);
  }, [visible]);

  return (
    <div className={`top-info-bar ${visible ? "show" : "hide"}`}>
      <div className="bar-left">
        <FaPhoneAlt /> +91 70034 16272 | <FaEnvelope /> info@mathsenseacademy.com
      </div>
      <div className="bar-right">
        Follow us:
        <a href="https://www.facebook.com/shomesirmath/" aria-label="Facebook"><FaFacebookF/></a>
        <a href="https://x.com/ShomeSuvad79678"  aria-label="Twitter" ><FaTwitter/></a>
        <a href="https://www.instagram.com/maths_ense"  aria-label="Twitter" ><FaInstagram/></a>
        
        <a href="https://www.youtube.com/@mathsenseacademy"  aria-label="YouTube" ><FaYoutube/></a>
      </div>
    </div>
  );
}
