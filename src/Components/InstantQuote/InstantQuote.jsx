import React from "react";
import styles from "./instantQuote.module.css";
import { CircleX } from "lucide-react";

const InstantQuote = ({ onClose }) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          <CircleX size={24} />
        </button>
        <h2>Get Started</h2>
        <form className={styles.form}>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label htmlFor="product">Name of Product *</label>
              <input
                id="product"
                type="text"
                placeholder="Type to search..."
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="name">Your Name *</label>
              <input id="name" type="text" placeholder="Your name" required />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email *</label>
            <input id="email" type="email" placeholder="Email" required />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="mobile">Mobile *</label>
            <input
              id="mobile"
              type="tel"
              placeholder="Mobile number"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              rows="4"
              placeholder="Write your message"
              required
            />
          </div>

          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default InstantQuote;
