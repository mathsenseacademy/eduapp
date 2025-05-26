// src/hooks/useLocoScroll.js
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

/**
 * Returns a ref you attach to the element that should scroll.
 * Handles init, route-change updates, resize updates, and cleanup.
 */
export default function useLocoScroll(loading) {
  const scrollRef  = useRef(null);   // DOM node
  const locoScroll = useRef(null);   // Locomotive instance
  const location   = useLocation();  // watch route changes

  /* ---------- initialise once loading is done ---------- */
  useEffect(() => {
    if (loading || !scrollRef.current) return;

    // give the browser one paint to ensure layout is final
    requestAnimationFrame(() => {
      locoScroll.current = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: true,
      });
    });

    // cleanup on unmount
    return () => locoScroll.current && locoScroll.current.destroy();
  }, [loading]);

  /* ---------- update when route/path changes ---------- */
  useEffect(() => {
    if (locoScroll.current) {
      locoScroll.current.scrollTo(0, { duration: 0 });
      locoScroll.current.update();
    }
  }, [location.pathname]);

  /* ---------- update on resize ---------- */
  useEffect(() => {
    const onResize = () =>
      locoScroll.current && locoScroll.current.update();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return scrollRef;
}
