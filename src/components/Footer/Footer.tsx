import React from "react";
import appStore from "../../assets/images/appstore.svg";
import googlePlay from "../../assets/images/googleplay.svg";
import styles from "./Footer.module.css";

interface MenuItem {
  title: string;
  links: string[];
}

interface AppLink {
  src: string;
  alt: string;
}

const MENU_SECTIONS: MenuItem[] = [
  {
    title: "Products",
    links: ["Used", "New", "Sell your car"],
  },
  {
    title: "Resources",
    links: ["Blog", "FAQ", "Contact us"],
  },
  {
    title: "Work With TrueCar",
    links: ["Dealers", "Partners"],
  },
  {
    title: "About",
    links: ["About us", "Team", "Careers"],
  },
];

const APP_LINKS: AppLink[] = [
  { src: appStore, alt: "Download on the App Store" },
  { src: googlePlay, alt: "Get it on Google Play" },
];

const LEGAL_LINKS: string[] = [
  "Terms of Service",
  "Privacy Policy",
  "Do Not Sell My Personal Information",
];

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <nav className={styles.menu}>
          {MENU_SECTIONS.map((section) => (
            <ul key={section.title} className={styles.menuList}>
              <li className={styles.menuItem}>
                <p className={styles.menuTitle}>{section.title}</p>
              </li>
              {section.links.map((linkText) => (
                <li key={linkText} className={styles.menuItem}>
                  <a href="#" className={styles.menuLink}>
                    {linkText}
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </nav>

        <ul className={styles.app}>
          {APP_LINKS.map((app) => (
            <li key={app.alt} className={styles.appItem}>
              <a href="#" className={styles.appItemLink}>
                <img className={styles.appItemImg} src={app.src} alt={app.alt} />
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.copy}>
          <p className={styles.copyText}>
            For questions about the TrueCar Auto Buying Service please call 1-888-878-3227.
            Certified Dealers are contractually obligated by TrueCar to meet certain customer
            service requirements and complete the TrueCar Dealer Certification Program.
          </p>
          <p className={styles.copyText}>
            TrueCar does not broker, sell, or lease motor vehicles. Unless otherwise noted,
            all vehicles shown on this website are offered for sale by licensed motor vehicle dealers.
            All vehicles are subject to prior sale. By accessing this website, you agree to the TrueCar
            Terms of Service and Privacy Policy.
          </p>
        </div>

        <nav className={styles.copyNav}>
          <ul className={styles.copyNavList}>
            {LEGAL_LINKS.map((linkText) => (
              <li key={linkText} className={styles.copyNavItem}>
                <a href="#" className={styles.copyNavLink}>
                  {linkText}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;