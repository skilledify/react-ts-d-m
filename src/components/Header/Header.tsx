import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router";

import logo from "../../assets/images/logo.svg";
import Icon from "../ui/Icon/Icon";
import { useFavorites } from "../../context/favorites";
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
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const favoritesRef = useRef<HTMLDivElement>(null);

  const { favorites, count, removeFavorite, clearFavorites } = useFavorites();

  const toggleMenu = () => {
    setIsFavoritesOpen(false);
    setIsMenuOpen((prev) => !prev);
  };
  const closeMenu = () => setIsMenuOpen(false);
  const closeFavorites = () => setIsFavoritesOpen(false);

  useEffect(() => {
    if (!isFavoritesOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (
        favoritesRef.current &&
        !favoritesRef.current.contains(event.target as Node)
      ) {
        setIsFavoritesOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsFavoritesOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFavoritesOpen]);

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.inner}>
          <Link to="/" className={styles.logo} onClick={closeMenu}>
            <img src={logo} alt="logo" className={styles.logoImg} />
          </Link>

          <nav className={styles.nav}>
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

            <div className={styles.favorites} ref={favoritesRef}>
              <button
                type="button"
                className={`${styles.favoritesBtn} ${
                  isFavoritesOpen ? styles.favoritesBtnActive : ""
                } ${count > 0 ? styles.favoritesBtnHasItems : ""}`}
                onClick={() => {
                  setIsFavoritesOpen((prev) => !prev);
                  closeMenu();
                }}
                aria-label={`Saved cars${count > 0 ? ` (${count})` : ""}`}
                aria-expanded={isFavoritesOpen}
                aria-haspopup="dialog"
                title="Saved cars"
              >
                <Icon name="heart" size={20} />
                {count > 0 && (
                  <span className={styles.favoritesCount}>{count}</span>
                )}
              </button>

              {isFavoritesOpen && (
                <div
                  className={styles.favoritesPanel}
                  role="dialog"
                  aria-label="Saved cars"
                >
                  <div className={styles.favoritesHead}>
                    <span className={styles.favoritesTitle}>
                      <Icon name="heart" size={17} />
                      Saved cars
                    </span>
                    <span className={styles.favoritesTotal}>{count}</span>
                  </div>

                  {favorites.length === 0 ? (
                    <div className={styles.favoritesEmpty}>
                      <span className={styles.favoritesEmptyIcon}>
                        <Icon name="heart" size={26} />
                      </span>
                      <p>No saved cars yet</p>
                      <small>
                        Tap the heart on any listing to keep it here for later.
                      </small>
                      <Link
                        to="/catalog"
                        className={styles.favoritesEmptyLink}
                        onClick={closeFavorites}
                      >
                        Browse cars
                        <Icon name="arrow-right" size={15} />
                      </Link>
                    </div>
                  ) : (
                    <>
                      <ul className={styles.favoritesList}>
                        {favorites.map((car) => (
                          <li key={car.id} className={styles.favoritesItem}>
                            <Link
                              to={car.href}
                              className={styles.favoritesLink}
                              onClick={closeFavorites}
                            >
                              <img
                                src={car.image}
                                alt={car.title}
                                className={styles.favoritesThumb}
                              />
                              <span className={styles.favoritesInfo}>
                                <strong>{car.title}</strong>
                                <span>
                                  {car.price}
                                  {car.meta ? ` · ${car.meta}` : ""}
                                </span>
                              </span>
                            </Link>
                            <button
                              type="button"
                              className={styles.favoritesRemove}
                              onClick={() => removeFavorite(car.id)}
                              aria-label={`Remove ${car.title} from saved cars`}
                              title="Remove"
                            >
                              ×
                            </button>
                          </li>
                        ))}
                      </ul>

                      <div className={styles.favoritesFooter}>
                        <button
                          type="button"
                          className={styles.favoritesClear}
                          onClick={clearFavorites}
                        >
                          Clear all
                        </button>
                        <Link
                          to="/catalog"
                          className={styles.favoritesAll}
                          onClick={closeFavorites}
                        >
                          Browse cars
                          <Icon name="arrow-right" size={15} />
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
