// OurCompany.jsx
import React from 'react'
import styles from './ourCompany.module.css'
import { ArrowBigRightDash, Building, Rocket, ShieldCheck } from 'lucide-react'

const OurCompany = () => {
  const infoCards = [
    {
      icon: <Building size={32} />,
      heading: "Our Manufacturing Facility",
      description: "Our facility is equipped with the latest technology and machinery to ensure the highest quality of granite slabs."
    },
    {
      icon: <ShieldCheck size={32} />,
      heading: "Quality Assurance",
      description: "JK GRANI MARMO ensures top-tier quality using cutting-edge tools and expert supervision throughout the production process."
    },
    {
      icon: <Rocket size={32} />,
      heading: "Mission",
      description: "To provide customers with high-quality products that exceed expectations while fostering a culture of excellence."
    }
  ]

  const stats = [
    { icon: "https://www.svgrepo.com/show/532037/clouds.svg", title: "Nature of Business", value: "Manufacturers, Exporters, Supplier" },
    { icon: "https://www.svgrepo.com/show/532037/clouds.svg", title: "Number of Employees", value: "50 People" },
    { icon: "https://www.svgrepo.com/show/532037/clouds.svg", title: "Year of Establishment", value: "2022" },
    { icon: "https://www.svgrepo.com/show/532037/clouds.svg", title: "Market Covered", value: "Worldwide" },
    { icon: "https://www.svgrepo.com/show/532037/clouds.svg", title: "Name of Founder", value: "Mr. Sandeep Kumar Mehta, Mr. Nand Kishore Vaishnav" }
  ]

  return (
    <div className={styles.companySection}>
      {/* Top Info Cards */}
      <div className={styles.cardRow}>
        {infoCards.map((card, index) => (
          <div className={styles.card} key={index}>
            <span className={styles.cardIcon}>{card.icon}</span>
            <div>
              <h3>{card.heading}</h3>
              <p>{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Testimonial Section */}
      <div className={styles.testimonialBanner}>
        <p>
          <em>
            In promotion and advertising, a testimonial consists of a person’s experience in a written statement extolling the integrity of a product or services.
          </em>
        </p>
        <button className={styles.testimonialBtn}>
          Post Your Testimonials <ArrowBigRightDash className={styles.arrow} size={20} />
        </button>
      </div>

      {/* Glimpse Section */}
      <div className={styles.glimpse}>
        <h2 className="pageTitle"><span style={{ color: 'var(--highlight-color)' }}>Glimpse</span> of Our Company</h2>
        <div className={styles.statsGrid}>
          {stats.map((stat, i) => (
            <div key={i} className={styles.statBox}>
              <img src={stat.icon} alt="" className={styles.icon} />
              <h4>{stat.title}</h4>
              <p>{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OurCompany
