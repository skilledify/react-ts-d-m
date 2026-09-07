import SectionTitle from "../../ui/SectionTitle/SectionTitle"
import imp1 from "../../../assets/images/imp-1.jpg"
import imp2 from "../../../assets/images/imp-2.jpg"
import imp3 from "../../../assets/images/imp-3.jpg"
import imp4 from "../../../assets/images/imp-4.jpg"

const Important = () => {
  return (
    <section className="important">
      <div className="container">
        {/* <h2 className="section-title important__title">
          Important Things to Consider
        </h2> */}
        <SectionTitle title="Important Things to Consider" marginBottom="20px" align="center"/>
        <p className="important__text">
          Depending on your circumstances and what is important to you, a lease
          could be a great option for your next vehicle. Below are some
          important factors that may influence your decision.
        </p>
        <ul className="important__list">
          <li className="important__item">
            <img src={imp1} alt="imp 1" className="important__item-img" />
            <p className="important__item-text">
              Monthly payments on leases are generally 20% - 30% cheaper than
              loans
            </p>
          </li>
          <li className="important__item">
            <img src={imp2} alt="imp 2" className="important__item-img" />
            <p className="important__item-text">
              You may be eligible for a tax break if you use the leased vehicle
              for business purposes
            </p>
          </li>
          <li className="important__item">
            <img src={imp3} alt="imp 3" className="important__item-img" />
            <p className="important__item-text">
              Easy to upgrade to the newest vehicle model every few years
            </p>
          </li>
          <li className="important__item">
            <img src={imp4} alt="imp 4" className="important__item-img" />
            <p className="important__item-text">
              There are often fees charged if you drive more than your lease's
              mileage allowance
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Important