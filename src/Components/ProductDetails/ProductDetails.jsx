import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./productDetails.module.css";
import { productData } from "../../data"; // make sure this file exports the object you shared

const similarProducts = [
  {
    name: "Black Galaxy Granite",
    image: "https://wallpapercave.com/wp/wp15184729.webp",
    priceFrom: 70,
    priceTo: 95,
  },
  {
    name: "Steel Grey Granite",
    image: "https://wallpapercave.com/wp/wp15184727.webp",
    priceFrom: 60,
    priceTo: 85,
  },
];

// Loading Skeleton
const Skeleton = () => (
  <div className={styles.detailsWrapper}>
    <div className={styles.mainCard}>
      <div className={`${styles.imageSection} ${styles.skeletonBox}`} />
      <div className={styles.infoSection}>
        <div className={styles.skeletonTitle} />
        <div className={styles.skeletonLine} />
        <div className={styles.skeletonLine} />
        <div className={styles.gridDetails}>
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <div key={i} className={styles.skeletonLineSmall} />
            ))}
        </div>
        <div className={styles.actions}>
          <div className={styles.skeletonBtn} />
          <div className={styles.skeletonBtn} />
          <div className={styles.skeletonBtn} />
        </div>
      </div>
    </div>
  </div>
);

const ProductDetails = () => {
  const { category, subcategory } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const imageBase = "https://res.cloudinary.com/dkpmhwm42/image/upload";

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      const fetchedProduct = productData?.[category]?.[subcategory];

      if (fetchedProduct) {
        const imageSlug = `${subcategory}-1`;
        setProduct({
          ...fetchedProduct,
          image: `${imageBase}/${imageSlug}`,
        });
      } else {
        setProduct(null);
      }

      setLoading(false);
    }, 700); // simulate fetch
  }, [category, subcategory]);

  if (loading) return <Skeleton />;
  if (!product)
    return <div className={styles.detailsWrapper}>Product not found.</div>;

  return (
    <div className={styles.detailsWrapper}>
      <div className={styles.mainCard}>
        <div className={styles.imageSection}>
          <img
            src={product.image}
            alt={product.name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/Images/imgNotFound.avif";
            }}
          />
        </div>
        <div className={styles.infoSection}>
          <h1>{product.name}</h1>
          <p className={styles.price}>
            ₹ {product.priceFrom} - {product.priceTo} / Sqft
          </p>
          <p className={styles.moq}>MOQ: {product.moq} Sqft</p>

          <div className={styles.gridDetails}>
            <div>
              <strong>Business Type:</strong> {product.businessType || "N/A"}
            </div>
            <div>
              <strong>Material:</strong> {product.material || "N/A"}
            </div>
            <div>
              <strong>Shape:</strong> {product.shape || "N/A"}
            </div>
            <div>
              <strong>Application:</strong> {product.application || "N/A"}
            </div>
            <div>
              <strong>Feature:</strong> {product.feature || "N/A"}
            </div>
            <div>
              <strong>Thickness:</strong> {product.thickness || "N/A"}
            </div>
            <div>
              <strong>Surface:</strong> {product.surface || "N/A"}
            </div>
            <div>
              <strong>Origin:</strong> {product.origin || "N/A"}
            </div>
          </div>

          <div className={styles.actions}>
            <button className={styles.primaryBtn}>Get Best Price</button>
            <button className={styles.secondaryBtn}>Request to Call</button>
            <button className={styles.secondaryBtn}>Send Enquiry</button>
          </div>
        </div>
      </div>

      <div className={styles.similarWrapper}>
        <h2>Similar Products</h2>
        <div className={styles.carousel}>
          {similarProducts.map((item, index) => (
            <div key={index} className={styles.productCard}>
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
              <p>
                ₹ {item.priceFrom} - {item.priceTo}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
