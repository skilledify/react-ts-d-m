import React from "react";
import { Link } from "react-router";
import Icon from "../../ui/Icon/Icon";
import { useFavorites } from "../../../context/favorites";
import styles from "./Favorites.module.css";

const Favorites: React.FC = () => {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <section className={styles.favorites}>
      <div className="container">
        <div className={styles.head}>
          <div className={styles.headCopy}>
            <span className={styles.kicker}>
              <Icon name="heart" size={15} />
              Your shortlist
            </span>
            <h2 className={styles.title}>Saved cars</h2>
            <p className={styles.text}>
              Every car you like is kept here. Tap the heart on any listing to
              add or remove it — your shortlist is saved right in this browser.
            </p>
          </div>

          <Link to="/catalog" className={styles.browse}>
            Browse inventory
            <Icon name="arrow-right" size={17} />
          </Link>
        </div>

        {favorites.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>
              <Icon name="heart" size={30} />
            </span>
            <div className={styles.emptyCopy}>
              <h3>Nothing saved yet</h3>
              <p>
                Explore the catalog and tap the heart on a car you love — it
                will appear here and in the header.
              </p>
            </div>
            <Link to="/catalog" className={styles.emptyLink}>
              Find your car
              <Icon name="arrow-right" size={16} />
            </Link>
          </div>
        ) : (
          <ul className={styles.grid}>
            {favorites.map((car) => (
              <li key={car.id} className={styles.card}>
                <Link to={car.href} className={styles.media}>
                  <img src={car.image} alt={car.title} loading="lazy" />
                  {car.tag && <span className={styles.tag}>{car.tag}</span>}
                </Link>

                <div className={styles.body}>
                  <div className={styles.titleRow}>
                    <h3 className={styles.cardTitle}>{car.title}</h3>
                    <button
                      type="button"
                      className={styles.remove}
                      onClick={() => removeFavorite(car.id)}
                      aria-label={`Remove ${car.title} from saved cars`}
                      title="Remove from saved cars"
                    >
                      ×
                    </button>
                  </div>

                  {car.meta && <p className={styles.meta}>{car.meta}</p>}

                  <div className={styles.bottom}>
                    <strong className={styles.price}>{car.price}</strong>
                    <Link to={car.href} className={styles.details}>
                      View
                      <Icon name="arrow-up-right" size={16} />
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Favorites;
