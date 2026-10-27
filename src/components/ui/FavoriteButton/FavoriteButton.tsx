import Icon from "../Icon/Icon";
import { useFavorites, type FavoriteCar } from "../../../context/favorites";
import styles from "./FavoriteButton.module.css";

interface FavoriteButtonProps {
  car: FavoriteCar;
  className?: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ car, className }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isSaved = isFavorite(car.id);

  return (
    <button
      type="button"
      className={`${styles.button} ${isSaved ? styles.active : ""} ${
        className ?? ""
      }`}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleFavorite(car);
      }}
      aria-label={
        isSaved ? `Remove ${car.title} from saved cars` : `Save ${car.title}`
      }
      aria-pressed={isSaved}
      title={isSaved ? "Remove from saved cars" : "Save to favorites"}
    >
      <Icon name="heart" size={17} strokeWidth={2} />
    </button>
  );
};

export default FavoriteButton;
