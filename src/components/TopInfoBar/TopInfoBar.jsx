import { useEffect, useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
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
        <FaPhoneAlt /> +91 9062428472 | <FaEnvelope /> info@mathsenseacademy.com
      </div>
      <div className="bar-right">
        Follow us:
        <a href="https://facebook.com" aria-label="Facebook"><FaFacebookF/></a>
        <a href="https://twitter.com"  aria-label="Twitter" ><FaTwitter/></a>
        <a href="https://youtube.com"  aria-label="YouTube" ><FaYoutube/></a>
      </div>
    </div>
  );
}
