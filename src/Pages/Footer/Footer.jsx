import React from "react";
import styles from "./footer.module.css";

const navLinks = [
  "Home",
  "About Us",
  "Products",
  "Testimonials",
  "Contact Us",
  "Site Map",
];

const graniteProducts = [
  "P White Granite",
  "Brown Marquina Granite Slab",
  "Raw Silk Granite Slab",
  "Majestic 3D Black Granite Slab",
  "Jeerawal Granite Slab",
  "Brown Alphonso Granite Slab",
  "Alphonso Brown Granite Slab",
  "Coral Pink Granite Slab",
  "Rajasthan Black Granite Slab",
  "Electro Brown Granite Slab",
  "Crystal Blue Granite Slab",
  "K White Granite Slab",
  "Ocean Black Granite Slab",
  "Zidane Black Granite Slab",
  "Apple Green Granite Slab",
  "Majestic Black Granite Slab",
  "Tiger Skin Granite Slab",
  "Tan Brown Granite Slab",
  "Viscon White Granite Slab",
  "Multi Red Granite Slab",
  "Gem Red Granite Slab",
  "Koliwada Granite Slab",
  "K Red Granite Slab",
  "Rosy Pink Granite Slab",
  "Crystal Brown Granite Slab",
  "Cotton Brown Granite Slab",
  "Star Black Granite Slab",
  "Desert Green Granite Slab",
];

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.navLinks}>
        {navLinks.map((link, i) => (
          <span key={i}>
            {link}
            {i < navLinks.length - 1 && <span className={styles.pipe}>|</span>}
          </span>
        ))}
      </div>

      <div className={styles.productSection}>
        {graniteProducts.map((product, index) => (
          <span key={index} className={styles.productItem}>
            {product}
          </span>
        ))}
      </div>

      <div className={styles.bottomFooter}>
        <div className={styles.bottomBar}>
          <p>
            All Rights Reserved. <strong>JK GRANI MARMO</strong>
          </p>
          <p>Developed & Managed By Weblink.In Pvt. Ltd.</p>
        </div>

        <img src="https://catalog.wlimg.com/main-common/ei.webp" alt="coptWrites"  width={120}/>
      </div>
    </footer>
  );
};

export default Footer;
