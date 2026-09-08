import { useState } from "react";
import { Link, NavLink } from "react-router";

import logo from "../../assets/images/logo.svg";
import styles from "./Header.module.css";

const MENU_LINKS = [
  { to: "/catalog", label: "NEW CARS" },
  { to: "/preownedcars", label: "PRE-OWNED CARS" },
  { to: "/finance", label: "FINANCE" },
  { to: "/leasevsbuy", label: "LEASE VS BUY" },
  { to: "/contacts", label: "CONTACT US" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.inner}>
          <Link to="/" className={styles.logo} onClick={closeMenu}>
            <img src={logo} alt="logo" className={styles.logoImg} />
          </Link>

          <nav>
            <button
              type="button"
              className={styles.menuBtn}
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <span className={styles.menuBtnClose}>&times;</span>
              ) : (
                <>
                  <span className={styles.menuBtnSpan} />
                  <span className={styles.menuBtnSpan} />
                  <span className={styles.menuBtnSpan} />
                </>
              )}
            </button>

            <ul
              className={`${styles.menuList} ${
                isMenuOpen ? styles.menuListActive : ""
              }`}
            >
              {MENU_LINKS.map(({ to, label }) => (
                <li key={to} className={styles.menuItem}>
                  <NavLink
                    to={to}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      isActive
                        ? `${styles.menuLink} ${styles.menuLinkActive}`
                        : styles.menuLink
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;