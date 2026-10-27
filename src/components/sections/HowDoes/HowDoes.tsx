import React from 'react';
import styles from './HowDoes.module.css';

const HowDoes: React.FC = () => {
  return (
    <section className={styles.howDoes}>
      <div className="container">
        <div className={styles.inner}>
          <h2 className="section-title">How Does Leasing Work?</h2>
          <p className={styles.text}>
            Leasing a vehicle is essentially entering into a long term rental
            agreement for that vehicle. Unlike a traditional car purchase, you
            don’t actually own the vehicle. Instead, a leasing company purchases
            the vehicle from the dealer on your behalf and then you make monthly
            payments to the leasing company for the duration of your lease. Some
            leases however, do provide the option to purchase the vehicle at the
            end of the lease.
          </p>
          <h3 className={`${styles.title} item-title`}>
            Similar to a short term car rental, there are rules that define:
          </h3>
          <ol className={styles.list}>
            <li className={styles.item}>
              How much you can drive, stated as annual miles (excess miles are
              charged at a specified rate)
            </li>
            <li className={styles.item}>
              Types of damage that you may be liable for at the end of your
              lease
            </li>
            <li className={styles.item}>
              The procedures and costs when you return the vehicle at the end of
              your lease
            </li>
          </ol>
          <p className={styles.text}>
            Lease contracts are a commitment and ending them early can be
            difficult and expensive so it is important to consider your
            circumstances carefully before you decide.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowDoes;