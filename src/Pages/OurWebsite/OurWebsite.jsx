import React from "react";
import styles from "./ourWebsite.module.css";
import { ArrowBigRightDash } from "lucide-react";
import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const OurWebsite = () => {
  const productList = [
    {
      title: "Alphonso Brown Granite Slab",
      image: "https://wallpapercave.com/wp/wp2419010.jpg",
    },
    {
      title: "Coral Pink Granite Slab",
      image: "https://wallpapercave.com/wp/wp2419013.jpg",
    },
    {
      title: "Rajasthan Black Granite Slab",
      image: "https://wallpapercave.com/wp/wp2419010.jpg",
    },
    {
      title: "Electro Brown Granite Slab",
      image: "https://wallpapercave.com/wp/wp2419013.jpg",
    },
  ];

  return (
    <section className={styles.container}>
      <motion.div
        className={styles.cardContainer}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <motion.div
          className={styles.cardImage}
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img
            src="/Images/whyUs.png"
            alt="aboutIMg"
          />
        </motion.div>

        <motion.div
          className={styles.cardDescription}
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h1>Welcome to Our Website</h1>
          <p>
            JK GRANI MARMO is a trusted manufacturer, exporter and supplier of
            premium granites including 3D Black, Jeerawal, Coral Pink, Rajasthan
            Black, Tiger Skin, Viscon White and more. We deliver unmatched
            quality, variety and service to meet your architectural and interior
            needs.
          </p>
          <button className={styles.viewMoreBtn}>
            <ArrowBigRightDash size={25} className={styles.icon} />
            View More
          </button>
        </motion.div>
      </motion.div>

      <div className={styles.popularProductsContainer}>
        <div className={styles.popularProductsHero}>
            <h1 className="pageTitle"><b style={{ color: "var(--highlight-color)" }}>Popular</b> Products</h1>
        </div>
        <div className={styles.popularProductsCardContainer}>
          {productList.map((product, index) => (
            <motion.div
              key={index}
              className={styles.productCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <div className={styles.cardActions}>
                <button className={styles.enquiryBtn}>Enquiry Now</button>
                <button className={styles.viewBtn}>View More</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurWebsite;
