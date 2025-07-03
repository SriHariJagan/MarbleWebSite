import React, { useState } from "react";
import styles from "./contactInfoCards.module.css";
import { MapPin, Phone, Mail, Monitor } from "lucide-react";

const cards = [
  {
    icon: <MapPin size={20} />,
    label: "Location",
    value: "Kishangarh, Ajmer, Rajasthan",
  },
  {
    icon: <Phone size={20} />,
    label: "Mobile",
    value: <u>View Mobile Number</u>,
  },
  {
    icon: <Mail size={20} />,
    label: "Email",
    value: "jkgranimarmoksg@gmail.com",
  },
  {
    icon: <Monitor size={20} />,
    label: "Web",
    value: "www.jkgranimarmo.co.in",
  },
];

const ContactInfoCards = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      console.log("Subscribed with:", email);
      setEmail("");
    }
  };
  return (
    <div className={styles.contactInfoContainer}>
      <section className={styles.infoSection}>
        <div className={styles.cardsWrapper}>
          {cards.map((card, index) => (
            <div className={styles.card} key={index}>
              <div className={styles.iconWrapper}>{card.icon}</div>
              <h3>{card.label}</h3>
              <p>{card.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.newsletterSection}>
        <div>
          <h2>Newsletter</h2>
          <form className={styles.form} onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContactInfoCards;
