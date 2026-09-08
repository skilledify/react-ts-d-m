import React from "react";
import SectionTitle from "../../ui/SectionTitle/SectionTitle";
import styles from "./Important.module.css";

import imp1 from "../../../assets/images/imp-1.jpg";
import imp2 from "../../../assets/images/imp-2.jpg";
import imp3 from "../../../assets/images/imp-3.jpg";
import imp4 from "../../../assets/images/imp-4.jpg";

interface ImportantItem {
  id: number;
  image: string;
  alt: string;
  text: string;
}

const IMPORTANT_ITEMS: ImportantItem[] = [
  {
    id: 1,
    image: imp1,
    alt: "Lower monthly payments",
    text: "Monthly payments on leases are generally 20% - 30% cheaper than loans",
  },
  {
    id: 2,
    image: imp2,
    alt: "Tax break benefits",
    text: "You may be eligible for a tax break if you use the leased vehicle for business purposes",
  },
  {
    id: 3,
    image: imp3,
    alt: "Vehicle upgrade",
    text: "Easy to upgrade to the newest vehicle model every few years",
  },
  {
    id: 4,
    image: imp4,
    alt: "Mileage allowance limits",
    text: "There are often fees charged if you drive more than your lease's mileage allowance",
  },
];

const Important: React.FC = () => {
  return (
    <section className={styles.important}>
      <div className="container">
        <SectionTitle className="section-title"
          title="Important Things to Consider"
          marginBottom="20px"
          align="center"
        />
        <p className={styles.text}>
          Depending on your circumstances and what is important to you, a lease
          could be a great option for your next vehicle. Below are some
          important factors that may influence your decision.
        </p>
        <ul className={styles.list}>
          {IMPORTANT_ITEMS.map(({ id, image, alt, text }) => (
            <li key={id} className={styles.item}>
              <img src={image} alt={alt} className={styles.itemImg} />
              <p className={styles.itemText}>{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Important;