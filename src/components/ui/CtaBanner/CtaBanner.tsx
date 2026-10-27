import { Link } from "react-router";
import Icon from "../Icon/Icon";
import styles from "./CtaBanner.module.css";

interface CtaLink {
  label: string;
  to: string;
}

interface CtaBannerProps {
  eyebrow: string;
  title: string;
  text: string;
  primary: CtaLink;
  secondary?: CtaLink;
  variant?: "blue" | "violet" | "emerald";
}

const CtaBanner: React.FC<CtaBannerProps> = ({
  eyebrow,
  title,
  text,
  primary,
  secondary,
  variant = "blue",
}) => {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={`${styles.banner} ${styles[variant]}`}>
          <span className={styles.orbOne} aria-hidden="true" />
          <span className={styles.orbTwo} aria-hidden="true" />
          <span className={styles.grid} aria-hidden="true" />

          <div className={styles.content}>
            <span className={styles.eyebrow}>
              <Icon name="spark" size={16} />
              {eyebrow}
            </span>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.text}>{text}</p>

            <div className={styles.actions}>
              <Link to={primary.to} className={styles.primary}>
                {primary.label}
                <Icon name="arrow-right" size={18} />
              </Link>
              {secondary && (
                <Link to={secondary.to} className={styles.secondary}>
                  {secondary.label}
                </Link>
              )}
            </div>
          </div>

          <div className={styles.visual} aria-hidden="true">
            <div className={styles.ringOne} />
            <div className={styles.ringTwo} />
            <div className={styles.ringThree} />
            <div className={styles.visualIcon}>
              <Icon name="car" size={54} strokeWidth={1.2} />
            </div>
            <span className={styles.dotOne} />
            <span className={styles.dotTwo} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
