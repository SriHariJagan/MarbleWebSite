import React, { useState } from "react";
import styles from "./contactForm.module.css";

const ContactForm = () => {
  const [form, setForm] = useState({
    product: "",
    name: "",
    email: "",
    phone: "",
    country: "India",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.product) newErrors.product = "Please Enter Name of Product / Service.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", form);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <input
          type="text"
          name="product"
          placeholder="Product / Service Looking for"
          value={form.product}
          onChange={handleChange}
        />
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
        />
      </div>
      {errors.product && <p className={styles.error}>{errors.product}</p>}

      <div className={styles.row}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <select name="country" value={form.country} onChange={handleChange}>
          <option value="India">India</option>
          <option value="USA">USA</option>
          <option value="UAE">UAE</option>
        </select>
      </div>

      <div className={styles.row}>
        <div className={styles.codeBox}>+91</div>
        <input
          type="text"
          name="phone"
          placeholder="Phone / Mobile"
          value={form.phone}
          onChange={handleChange}
        />
      </div>

      <textarea
        name="message"
        placeholder="Leave a Message for us"
        value={form.message}
        onChange={handleChange}
      />

      <button type="submit" className={styles.submitBtn}>
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;
