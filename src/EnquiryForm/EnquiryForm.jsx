import React, { useState, useRef, useEffect } from "react";
import styles from "./enquiryForm.module.css";

const products = [
  "Alphonso Brown Granite Slab",
  "Apple Green Granite Slab",
  "Brown Alphonso Granite Slab",
  "Brown Marquina Granite Slab",
  "Coral Pink Granite Slab",
  "Cotton Brown Granite Slab",
  "Crystal Blue Granite Slab",
  "Crystal Brown Granite Slab",
  "Desert Green Granite Slab",
  "Electro Brown Granite Slab",
  "Gem Red Granite Slab",
  "Jeerawal Granite Slab",
  "K Red Granite Slab",
  "K White Granite Slab",
  "Koliwada Granite Slab",
  "Majestic 3D Black Granite Slab",
  "Majestic Black Granite Slab",
  "Multi Red Granite Slab",
  "Ocean Black Granite Slab",
  "P White Granite",
  "Rajasthan Black Granite Slab",
  "Raw Silk Granite Slab",
  "Rosy Pink Granite Slab",
  "Star Black Granite Slab",
  "Tan Brown Granite Slab",
  "Tiger Skin Granite Slab",
  "Viscon White Granite Slab",
  "Zidane Black Granite Slab",
  "Other"
];

const EnquiryForm = () => {
  const [form, setForm] = useState({
    product: "",
    description: "",
    name: "",
    mobile: "",
    email: ""
  });

  const [filteredProducts, setFilteredProducts] = useState([]);
  const dropdownRef = useRef(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (e.target.name === "product") {
      const input = e.target.value.toLowerCase();
      const filtered = products.filter((prod) =>
        prod.toLowerCase().includes(input)
      );
      setFilteredProducts(filtered);
    }
  };

  const handleFocus = () => {
    if (!form.product) {
      setFilteredProducts(products);
    }
  };

  const handleSelectProduct = (value) => {
    setForm({ ...form, product: value });
    setFilteredProducts([]);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setFilteredProducts([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    alert("Enquiry submitted successfully!");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Get Started</h2>

      <div className={styles.row}>
        <div className={styles.inputGroup} ref={dropdownRef}>
          <label>Name of Product *</label>
          <input
            type="text"
            name="product"
            value={form.product}
            onChange={handleChange}
            onFocus={handleFocus}
            placeholder="Type to search..."
            autoComplete="off"
          />
          {filteredProducts.length > 0 && (
            <ul className={styles.dropdown}>
              {filteredProducts.map((item, idx) => (
                <li key={idx} onClick={() => handleSelectProduct(item)}>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label>Your Name *</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
          />
        </div>
      </div>

       <div className={styles.row}>
        <div className={styles.inputGroup}>
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.inputGroup}>
          <label>Mobile *</label>
          <input
            type="text"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            placeholder="Mobile number"
          />
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label>Description *</label>
        <textarea
          name="description"
          rows={4}
          value={form.description}
          onChange={handleChange}
          placeholder="Write your message"
        />
      </div>

      <button type="submit" className={styles.button}>
        Send Message
      </button>
    </form>
  );
};

export default EnquiryForm;
