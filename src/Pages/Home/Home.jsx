import React, { useEffect, useRef } from "react";
import styles from "./home.module.css";

const Home = () => {
  const headingRef = useRef(null);

  useEffect(() => {
    const contentEl = headingRef.current?.closest(`.${styles.content}`);

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      if (contentEl) {
        if (scrollTop > 20) {
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
        src="https://res.cloudinary.com/dkpmhwm42/video/upload/v1753023116/homeVideo.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      <div className={styles.content}>
        <h2 ref={headingRef}>
          ✨ JK Granimarmo – where natural stone becomes soulful art
        </h2>
        <p>
          At JK Granimarmo, we breathe life into stone – offering premium
          Granite, Marble (Indian & Imported), Sandstone, and Tiles that blend
          timeless beauty with modern durability. With over 20 years of legacy,
          we are proud to be a trusted name among architects, builders, and
          homeowners across India. Whether it’s Italian elegance, Rajasthan’s
          richness, or contemporary tiles, our curated collections elevate every
          design vision. We deliver factory-direct pricing, unmatched
          craftsmanship, and end-to-end solutions for floors and walls.
        </p>
      </div>
    </div>
  );
};

export default Home;
