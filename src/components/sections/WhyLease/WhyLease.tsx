import SectionTitle from "../../ui/SectionTitle/SectionTitle"
import whyLease1 from "../../../assets/images/why-lease-1.svg"
import whyLease2 from "../../../assets/images/why-lease-2.svg"
import whyLease3 from "../../../assets/images/why-lease-3.svg"
import whyLease4 from "../../../assets/images/why-lease-4.svg"

const WhyLease = () => {
  return (
    <section className="why-lease">
      <div className="container">
        {/* <h2 className="section-title contacts__title"marginBottom ="50px" align="center">
                       "Why Lease with D&M?"
                    </h2> */}
        <SectionTitle
          className="section-title contacts__title"
          title="Why Lease with D&M?"
          align="center"
          marginBottom="50px"
        />
        <ul className="why-lease__list">
          <li className="why-lease__item">
            <img
              src={whyLease1}
              alt="why lease 1"
              className="why-lease__item-img"
            />
            <h3 className="why-lease__item-title item-title">Top Dealers</h3>
            <p className="why-lease__item-text">
              TrueCar Certified Dealers compete for your business by providing
              discounted pricing on in-stock inventory.
            </p>
          </li>
          <li className="why-lease__item">
            <img
              src={whyLease2}
              alt="why lease 2"
              className="why-lease__item-img"
            />
            <h3 className="why-lease__item-title item-title">
              Discounted Pricing
            </h3>
            <p className="why-lease__item-text">
              View local inventory from the comfort of home and get access to
              guaranteed savings on the car of your choice.
            </p>
          </li>
          <li className="why-lease__item">
            <img
              src={whyLease3}
              alt="why lease 3"
              className="why-lease__item-img"
            />
            <h3 className="why-lease__item-title item-title">Lower Payments</h3>
            <p className="why-lease__item-text">
              Get discounted pricing when you shop for a car or truck using
              TrueCar and save on your lease payment.
            </p>
          </li>
          <li className="why-lease__item">
            <img src={whyLease4} alt="why lease 4" className="why-lease__item-img" />
            <h3 className="why-lease__item-title item-title">Easy Upgrade</h3>
            <p className="why-lease__item-text">
              Easy to upgrade to the newest vehicle model every few years if you
              would like to be modern and comfortable
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default WhyLease