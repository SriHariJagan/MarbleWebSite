import React from 'react';
import styles from './contactPage.module.css';
import Contact from '../../Components/Contact/Contact';
import ContactInfoCards from '../../Components/ContactInfoCards/ContactInfoCards';
import Newsletter from '../../Components/ContactNewsletter/Newsletter';

const ContactPage = () => {
  return (
    <div className={styles.container}>
      <Contact />
      <ContactInfoCards />
    </div>
  );
};

export default ContactPage;
