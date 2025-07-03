import React, { useEffect, useRef } from "react";
import styles from "./home.module.css";

const Home = () => {
  const headingRef = useRef(null);

  useEffect(() => {
    const contentEl = headingRef.current?.parentNode;

    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;

      if (contentEl) {
        if (scrollTop > 100) {
          contentEl.classList.add(styles.hide);
        } else {
          contentEl.classList.remove(styles.hide);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={styles.heroSection}>
      <div className={styles.overlay}></div>

      <video
        className={styles.video}
        src="/Videos/homeVideo.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      <div className={styles.content}>
        <h1 ref={headingRef}>Welcome to Our Marble World</h1>
        <p>Feel Luxury in Every Stone</p>
      </div>
    </div>
  );
};

export default Home;
