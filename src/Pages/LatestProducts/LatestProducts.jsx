import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "./latestProducts.module.css";
import { ChevronsRight } from "lucide-react";

const products = [
  {
    name: "P White Granite",
    image: "https://wallpapercave.com/wp/wp2419010.jpg",
    form: "Big Slab",
    thickness: "16 MM To 20 MM",
    origin: "India",
    crackResistance: "Yes",
    shape: "Rectangular",
  },
  {
    name: "Brown Marquina Granite Slab",
    image: "https://wallpapercave.com/wp/wp2419013.jpg",
    form: "Big Slab",
    thickness: "16 MM To 20 MM",
    origin: "India",
    crackResistance: "Yes",
    shape: "Rectangular",
  },
  {
    name: "Raw Silk Granite Slab",
    image: "https://wallpapercave.com/wp/wp2419010.jpg",
    form: "Big Slab",
    thickness: "16 MM To 20 MM",
    origin: "India",
    crackResistance: "Yes",
    shape: "Rectangular",
  },
  {
    name: "P White Granite",
    image: "https://wallpapercave.com/wp/wp2419013.jpg",
    form: "Big Slab",
    thickness: "16 MM To 20 MM",
    origin: "India",
    crackResistance: "Yes",
    shape: "Rectangular",
  },
  {
    name: "Brown Marquina Granite Slab",
    image: "https://wallpapercave.com/wp/wp2419010.jpg",
    form: "Big Slab",
    thickness: "16 MM To 20 MM",
    origin: "India",
    crackResistance: "Yes",
    shape: "Rectangular",
  },
  {
    name: "Raw Silk Granite Slab",
    image: "https://wallpapercave.com/wp/wp2419013.jpg",
    form: "Big Slab",
    thickness: "16 MM To 20 MM",
    origin: "India",
    crackResistance: "Yes",
    shape: "Rectangular",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const LatestProducts = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleCardTap = (index) => {
    // If tapping the same card again, close it
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.container}>
      <h1 className="pageTitle">Latest Products</h1>
      <motion.div
        className={styles.wrapper}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {products.map((product, index) => (
          <motion.div
            className={styles.card}
            key={index}
            custom={index}
            variants={cardVariants}
          >
            <div className={styles.imageWrapper}>
              <img src={product.image} alt={product.name} />
              <motion.div
                className={styles.detailsOverlay}
                initial={{ opacity: 0 }}
                animate={
                  activeIndex === index ? { opacity: 1 } : { opacity: 0 }
                }
                whileHover={{ opacity: 1 }}
                onClick={() => handleCardTap(index)}
                transition={{ duration: 0.3 }}
              >
                <h3>{product.name}</h3>
                <p>
                  <strong>Stone Form:</strong> {product.form}
                </p>
                <p>
                  <strong>Thickness:</strong> {product.thickness}
                </p>
                <p>
                  <strong>Country of Origin:</strong> {product.origin}
                </p>
                <p>
                  <strong>Crack Resistance:</strong> {product.crackResistance}
                </p>
                <p>
                  <strong>Shape:</strong> {product.shape}
                </p>
                <div className={styles.buttons}>
                  <button className={`${styles.btn} ${styles.secondary}`}>
                    Enquiry Now
                  </button>
                  <button className={`${styles.btn} ${styles.primary}`}>
                    View More
                  </button>
                </div>
              </motion.div>
            </div>
            <div className={styles.productName}>{product.name}</div>
          </motion.div>
        ))}
      </motion.div>

      <div className={styles.pageEnd}>
        <h2>We will send you the <b>Best Price Possible </b></h2>
        <button>Get Intannt Quota <ChevronsRight className={styles.icon}/></button>
      </div>
    </div>
  );
};

export default LatestProducts;
