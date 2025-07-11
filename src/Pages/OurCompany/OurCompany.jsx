// OurCompany.jsx
import React from "react";
import styles from "./ourCompany.module.css";
import {
  ArrowBigRightDash,
  Building,
  Rocket,
  ShieldCheck,
  Briefcase,
  Users,
  CalendarDays,
  Globe2,
  BadgeInfo,
} from "lucide-react";
import Testimonials from "../../Components/Testimonials/Testimonials";

const OurCompany = () => {
  const infoCards = [
    {
      icon: <Building size={32} />,
      heading: "Our Manufacturing Facility",
      description:
        "Our facility is equipped with the latest technology and machinery to ensure the highest quality of granite slabs.",
    },
    {
      icon: <ShieldCheck size={32} />,
      heading: "Quality Assurance",
      description:
        "JK GRANI MARMO ensures top-tier quality using cutting-edge tools and expert supervision throughout the production process.",
    },
    {
      icon: <Rocket size={32} />,
      heading: "Mission",
      description:
        "To provide customers with high-quality products that exceed expectations while fostering a culture of excellence.",
    },
  ];

 const stats = [
  {
    icon: <Briefcase size={40} strokeWidth={1.5} />,
    title: "Nature of Business",
    value: "Manufacturers, Exporters, Supplier",
  },
  {
    icon: <Users size={40} strokeWidth={1.5} />,
    title: "Number of Employees",
    value: "50 People",
  },
  {
    icon: <CalendarDays size={40} strokeWidth={1.5} />,
    title: "Year of Establishment",
    value: "2022",
  },
  {
    icon: <Globe2 size={40} strokeWidth={1.5} />,
    title: "Market Covered",
    value: "Worldwide",
  },
  {
    icon: <BadgeInfo size={40} strokeWidth={1.5} />,
    title: "Name of Founder",
    value: "Mr. Sandeep Kumar Mehta, Mr. Nand Kishore Vaishnav",
  },
];


  const clients = [
    {
      name: "Google",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    },
    {
      name: "Accenture",
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Accenture_Logo.svg",
    },
    {
      name: "Microsoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    },
    {
      name: "Amazon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    },
    {
      name: "Facebook",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png",
    },
    {
      name: "Apple",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    },
  ];

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
            In promotion and advertising, a testimonial consists of a person’s
            experience in a written statement extolling the integrity of a
            product or services.
          </em>
        </p>
        <button className={styles.testimonialBtn}>
          Post Your Testimonials{" "}
          <ArrowBigRightDash className={styles.arrow} size={20} />
        </button>
      </div>

      {/* Glimpse Section */}
      <div className={styles.glimpse}>
        <h2 className="pageTitle">
          <span style={{ color: "var(--highlight-color)" }}>Glimpse</span> of
          Our Company
        </h2>
        <div className={styles.statsGrid}>
          {stats.map((stat, i) => (
            <div key={i} className={styles.statBox}>
              <div className={styles.icon}>{stat.icon}</div>
              <h4>{stat.title}</h4>
              <p>{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Our Clients Scrolling Marquee */}
      <div className={styles.clientScrollerWrapper}>
        <h2 className="pageTitle" style={{ marginBottom: "3rem" }}>
          <span style={{ color: "var(--highlight-color)" }}>Our</span> Clients
        </h2>

        <div className={styles.clientScroller}>
          <div className={styles.clientTrack}>
            {/* Repeat sample logos or placeholders here */}
            {[...clients, ...clients].map((client, i) => (
              <div className={styles.clientLogo} key={i}>
                <img src={client.logo} alt={client.name} title={client.name} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Testimonials />
    </div>
  );
};

export default OurCompany;
