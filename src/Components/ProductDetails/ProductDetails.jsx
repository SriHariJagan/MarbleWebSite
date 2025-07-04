import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './productDetails.module.css';

import { productData } from '../../data'

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

const ProductDetails = () => {
  const { category, subcategory } = useParams();
  const product = productData?.[category]?.[subcategory];

  if (!product) {
    return <div className={styles.detailsWrapper}>Product not found.</div>;
  }

  let img = "https://wallpapercave.com/uwp/uwp4251169.jpeg"

  return (
    <div className={styles.detailsWrapper}>
      <div className={styles.mainCard}>
        <div className={styles.imageSection}>
          <img src={product.image  || img} alt={product.name} />
        </div>
        <div className={styles.infoSection}>
          <h1>{product.name}</h1>
          <p className={styles.price}>₹ {product.priceFrom} - {product.priceTo} / Sqft</p>
          <p className={styles.moq}>MOQ: {product.moq} Sqft</p>

          <div className={styles.gridDetails}>
            <div><strong>Business Type:</strong> {product.businessType}</div>
            <div><strong>Material:</strong> {product.material}</div>
            <div><strong>Shape:</strong> {product.shape}</div>
            <div><strong>Application:</strong> {product.application}</div>
            <div><strong>Feature:</strong> {product.feature}</div>
            <div><strong>Thickness:</strong> {product.thickness}</div>
            <div><strong>Surface:</strong> {product.surface}</div>
            <div><strong>Origin:</strong> {product.origin}</div>
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
              <p>₹ {item.priceFrom} - {item.priceTo}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
