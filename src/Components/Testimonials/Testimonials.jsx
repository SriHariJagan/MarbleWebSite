import React, { useState, useEffect } from "react";
import styles from "./testimonials.module.css";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sandeep Mehta",
    role: "Founder, JK Grani Marmo",
    logo: "https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-Transparent-Clip-Art-PNG.png",
    message: "JK Grani Marmo exceeded our expectations. Truly committed to quality and excellence.",
    links: {
      linkedin: "https://linkedin.com",
      website: "https://example.com",
      twitter: "https://twitter.com",
    },
  },
  {
    name: "Nand Kishore",
    role: "Co-Founder, JK Grani Marmo",
    logo: "https://www.iconpacks.net/icons/1/free-user-group-icon-296-thumb.png",
    message: "Great experience working with the team. Professional and dedicated.",
    links: {
      linkedin: "https://linkedin.com",
      website: "https://example.com",
      twitter: "https://twitter.com",
    },
  },
  {
    name: "Priya Sharma",
    role: "Client",
    logo: "https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-Transparent-Clip-Art-PNG.png",
    message: "The product quality is top-notch, and the support is outstanding. Highly recommend!",
    links: {
      linkedin: "https://linkedin.com",
      website: "https://example.com",
      twitter: "https://twitter.com",
    },
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [paused]);

  const handlePause = () => setPaused(true);
  const handleResume = () => setPaused(false);

  return (
    <div className={styles.testimonialsSection}>
      <h2 className="pageTitle">
        What <span style={{ color: "var(--highlight-color)" }}>Our Clients </span> Say
      </h2>

      <div
        className={styles.slider}
        onMouseEnter={handlePause}
        onMouseLeave={handleResume}
        onTouchStart={handlePause}
        onTouchEnd={handleResume}
      >
        {testimonials.map((t, i) => (
          <div
            className={`${styles.testimonialCard} ${i === activeIndex ? styles.active : ""}`}
            key={i}
          >
            <div className={styles.topRow}>
              <img src={t.logo} alt={t.name} className={styles.logo} />
              <div className={styles.titleBlock}>
                <h4>{t.name}</h4>
                <p className={styles.role}>{t.role}</p>
                <div className={styles.stars}>
                  {Array(5)
                    .fill(0)
                    .map((_, s) => (
                      <Star key={s} size={16} fill="#ffc107" color="#ffc107" />
                    ))}
                </div>
              </div>
            </div>

            <p className={styles.message}>“{t.message}”</p>

            <div className={styles.links}>
              <a href={t.links.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href={t.links.website} target="_blank" rel="noopener noreferrer">
                Website
              </a>
              <a href={t.links.twitter} target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.dots}>
        {testimonials.map((_, i) => (
          <span
            key={i}
            className={`${styles.dot} ${i === activeIndex ? styles.activeDot : ""}`}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
