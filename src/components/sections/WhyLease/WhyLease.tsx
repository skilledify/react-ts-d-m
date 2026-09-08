import React from 'react';
import SectionTitle from "../../ui/SectionTitle/SectionTitle";
import whyLease1 from "../../../assets/images/why-lease-1.svg";
import whyLease2 from "../../../assets/images/why-lease-2.svg";
import whyLease3 from "../../../assets/images/why-lease-3.svg";
import whyLease4 from "../../../assets/images/why-lease-4.svg";
import styles from "./WhyLease.module.css";

interface ReasonItem {
  id: number;
  icon: string;
  title: string;
  description: string;
}

const REASONS_DATA: ReasonItem[] = [
  {
    id: 1,
    icon: whyLease1,
    title: "Top Dealers",
    description: "TrueCar Certified Dealers compete for your business by providing discounted pricing on in-stock inventory.",
  },
  {
    id: 2,
    icon: whyLease2,
    title: "Discounted Pricing",
    description: "View local inventory from the comfort of home and get access to guaranteed savings on the car of your choice.",
  },
  {
    id: 3,
    icon: whyLease3,
    title: "Lower Payments",
    description: "Get discounted pricing when you shop for a car or truck using TrueCar and save on your lease payment.",
  },
  {
    id: 4,
    icon: whyLease4,
    title: "Easy Upgrade",
    description: "Easy to upgrade to the newest vehicle model every few years if you would like to be modern and comfortable.",
  },
];

const WhyLease: React.FC = () => {
  return (
    <section className={styles.whyLease}>
      <div className="container">
        <SectionTitle className="section-title"
          title="Why Lease with D&M?"
          align="center"
          marginBottom="50px"
        />
        <ul className={styles.list}>
          {REASONS_DATA.map(({ id, icon, title, description }) => (
            <li key={id} className={styles.item}>
              <img
                src={icon}
                alt={title}
                className={styles.itemImg}
              />
              <h3 className={styles.itemTitle}>{title}</h3>
              <p className={styles.itemText}>{description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default WhyLease;