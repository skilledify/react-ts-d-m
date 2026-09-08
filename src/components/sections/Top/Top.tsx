import styles from './Top.module.css';

const Top: React.FC = () => {
  return (
    <section className={styles.top}>
      <div className="container">
        <h1 className={styles.title}>Leasing From D&M</h1>
        <a href="#" className={styles.link}>
          FIND A CAR
        </a>
      </div>
    </section>
  );
};

export default Top;