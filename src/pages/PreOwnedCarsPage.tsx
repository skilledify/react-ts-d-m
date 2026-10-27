import { useMemo, useState } from "react";
import { Link } from "react-router";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Main from "../components/Main/Main";
import Icon from "../components/ui/Icon/Icon";
import Reveal from "../components/ui/Reveal/Reveal";
import Accordion from "../components/ui/Accordion/Accordion";
import CtaBanner from "../components/ui/CtaBanner/CtaBanner";
import { useFavorites } from "../context/favorites";
import styles from "./PreOwnedCarsPage.module.css";

import car1 from "../assets/images/car-1.jpg";
import car3 from "../assets/images/car-3.jpg";
import car4 from "../assets/images/car-4.jpg";
import car5 from "../assets/images/car-5.jpg";
import car7 from "../assets/images/car-7.jpg";
import car8 from "../assets/images/car-8.jpg";
import car9 from "../assets/images/car-9.jpg";
import car11 from "../assets/images/car-11.jpg";
import car12 from "../assets/images/car-12.jpg";

type CarType = "All" | "SUV" | "Sedan" | "Truck" | "Electric";
type SortOption = "featured" | "price-low" | "price-high" | "mileage";

interface InventoryCar {
  id: number;
  img: string;
  name: string;
  year: number;
  mileage: string;
  mileageValue: number;
  price: string;
  priceValue: number;
  monthly: string;
  type: Exclude<CarType, "All">;
  badge: string;
}

const FILTERS: CarType[] = ["All", "SUV", "Sedan", "Truck", "Electric"];

const INVENTORY: InventoryCar[] = [
  {
    id: 1,
    img: car9,
    name: "Honda CR-V EX-L",
    year: 2022,
    mileage: "28,410 mi",
    mileageValue: 28410,
    price: "$27,950",
    priceValue: 27950,
    monthly: "$419/mo",
    type: "SUV",
    badge: "1 owner",
  },
  {
    id: 2,
    img: car5,
    name: "Ford Explorer XLT",
    year: 2021,
    mileage: "34,120 mi",
    mileageValue: 34120,
    price: "$31,400",
    priceValue: 31400,
    monthly: "$469/mo",
    type: "SUV",
    badge: "Certified",
  },
  {
    id: 3,
    img: car3,
    name: "Toyota Prius LE",
    year: 2022,
    mileage: "19,860 mi",
    mileageValue: 19860,
    price: "$24,600",
    priceValue: 24600,
    monthly: "$369/mo",
    type: "Sedan",
    badge: "Hybrid",
  },
  {
    id: 4,
    img: car8,
    name: "Chevrolet Silverado LT",
    year: 2021,
    mileage: "41,300 mi",
    mileageValue: 41300,
    price: "$36,900",
    priceValue: 36900,
    monthly: "$551/mo",
    type: "Truck",
    badge: "4WD",
  },
  {
    id: 5,
    img: car4,
    name: "Hyundai Kona Electric",
    year: 2023,
    mileage: "12,740 mi",
    mileageValue: 12740,
    price: "$25,800",
    priceValue: 25800,
    monthly: "$386/mo",
    type: "Electric",
    badge: "EV",
  },
  {
    id: 6,
    img: car1,
    name: "Toyota Crown Platinum",
    year: 2023,
    mileage: "9,120 mi",
    mileageValue: 9120,
    price: "$38,450",
    priceValue: 38450,
    monthly: "$575/mo",
    type: "Sedan",
    badge: "Like new",
  },
  {
    id: 7,
    img: car7,
    name: "KIA Niro EX",
    year: 2022,
    mileage: "22,580 mi",
    mileageValue: 22580,
    price: "$23,900",
    priceValue: 23900,
    monthly: "$357/mo",
    type: "SUV",
    badge: "Hybrid",
  },
  {
    id: 8,
    img: car12,
    name: "Jeep Wrangler Sahara",
    year: 2021,
    mileage: "37,600 mi",
    mileageValue: 37600,
    price: "$35,200",
    priceValue: 35200,
    monthly: "$526/mo",
    type: "SUV",
    badge: "4x4",
  },
  {
    id: 9,
    img: car11,
    name: "Chevrolet Equinox LT",
    year: 2022,
    mileage: "25,330 mi",
    mileageValue: 25330,
    price: "$22,400",
    priceValue: 22400,
    monthly: "$335/mo",
    type: "SUV",
    badge: "Best value",
  },
];

const BENEFITS = [
  {
    icon: "shield" as const,
    title: "172-point inspection",
    text: "Engine, brakes, electronics, safety systems and everything in between — checked by certified technicians.",
  },
  {
    icon: "refresh" as const,
    title: "7-day return window",
    text: "Not the right fit? Bring it back within seven days or 250 miles for a full refund. No hard feelings.",
  },
  {
    icon: "wrench" as const,
    title: "12-month warranty",
    text: "Every D&M certified pre-owned car leaves the lot with a comprehensive limited warranty.",
  },
  {
    icon: "key" as const,
    title: "One clear price",
    text: "No haggling, no surprise add-ons. The price you see already includes our certification.",
  },
];

const STEPS = [
  {
    icon: "search" as const,
    title: "Pick online",
    text: "Filter by budget, body style and mileage. Every listing includes real photos and a free history report.",
  },
  {
    icon: "calendar" as const,
    title: "Reserve for $99",
    text: "Lock the car you love for 72 hours. The deposit is fully refundable if plans change.",
  },
  {
    icon: "car" as const,
    title: "Test drive at home",
    text: "We bring the car to your door so you can test it on your own roads, in your own time.",
  },
  {
    icon: "key" as const,
    title: "Drive away",
    text: "Sign, trade in your old car and get the keys. Most deliveries are completed in under 48 hours.",
  },
];

const TESTIMONIALS = [
  {
    text: "I found a two-year-old CR-V with fewer miles than my old commute car. The inspection report was 14 pages long — they really do check everything.",
    name: "Megan R.",
    detail: "Honda CR-V EX-L",
  },
  {
    text: "The price online was the price I paid. No upsells, no mystery fees. My Silverado was delivered to my driveway with a full tank.",
    name: "Andre P.",
    detail: "Chevrolet Silverado LT",
  },
  {
    text: "The 7-day return promise gave me the confidence to buy without seeing the car first. I never needed it — the Kona was perfect.",
    name: "Priya S.",
    detail: "Hyundai Kona Electric",
  },
];

const FAQ_ITEMS = [
  {
    question: "What does “D&M certified” actually mean?",
    answer:
      "Every car passes a 172-point mechanical and cosmetic inspection, receives a fresh oil change and detailing, and comes with a complete vehicle history report. Anything that does not meet our standard is repaired or the car never reaches our lot.",
  },
  {
    question: "Can I buy a pre-owned car entirely online?",
    answer:
      "Yes. You can reserve, finance, trade in and sign documents online. We deliver the car to your home, and you have seven days to make sure it fits your life.",
  },
  {
    question: "Are the prices negotiable?",
    answer:
      "Our prices are already market-checked and include the certification. We keep them transparent so you do not have to spend hours haggling to get a fair deal.",
  },
  {
    question: "How does the 7-day return work?",
    answer:
      "Drive up to 250 miles within seven days. If the car is not right for you, contact us and we will collect it, then refund your payment in full.",
  },
  {
    question: "What if my credit is not perfect?",
    answer:
      "We work with a range of lenders and can run a soft pre-qualification that does not affect your credit score. You can explore estimated payments on our finance page before you apply.",
  },
  {
    question: "Do you accept trade-ins?",
    answer:
      "Absolutely. Send us your VIN and mileage for a real offer in minutes. If you accept, we will handle the paperwork and apply the value directly to your purchase.",
  },
];

const PreOwnedCars: React.FC = () => {
  const [filter, setFilter] = useState<CarType>("All");
  const [sort, setSort] = useState<SortOption>("featured");
  const { isFavorite, toggleFavorite } = useFavorites();

  const visibleCars = useMemo(() => {
    const list = INVENTORY.filter(
      (car) => filter === "All" || car.type === filter,
    );

    if (sort === "price-low") {
      return [...list].sort((a, b) => a.priceValue - b.priceValue);
    }

    if (sort === "price-high") {
      return [...list].sort((a, b) => b.priceValue - a.priceValue);
    }

    if (sort === "mileage") {
      return [...list].sort((a, b) => a.mileageValue - b.mileageValue);
    }

    return list;
  }, [filter, sort]);

  const toggleSaved = (car: InventoryCar) => {
    toggleFavorite({
      id: `preowned-${car.id}`,
      title: car.name,
      price: car.price,
      image: car.img,
      meta: `${car.year} · ${car.mileage}`,
      tag: car.badge,
      href: "/preownedcars",
    });
  };

  return (
    <div className="wrapper">
      <Header />
      <Main>
        <section className={styles.hero}>
          <span className={styles.heroOrbOne} aria-hidden="true" />
          <span className={styles.heroOrbTwo} aria-hidden="true" />
          <span className={styles.heroGrid} aria-hidden="true" />

          <div className="container">
            <div className={styles.heroGridInner}>
              <div className={styles.heroCopy}>
                <div className={styles.eyebrow}>
                  <span className={styles.eyebrowDot} />
                  Certified pre-owned
                </div>

                <h1 className={styles.heroTitle}>
                  A great car.
                  <br />
                  <span className={styles.gradient}>A smarter chapter.</span>
                </h1>

                <p className={styles.heroText}>
                  Every D&M pre-owned car is inspected, reconditioned and backed
                  by a 7-day return promise. All the car. None of the new-car
                  drama.
                </p>

                <div className={styles.heroActions}>
                  <Link to="/catalog" className={styles.primaryBtn}>
                    Explore inventory
                    <Icon name="arrow-right" size={18} />
                  </Link>
                  <Link to="/contacts" className={styles.secondaryBtn}>
                    Book a test drive
                  </Link>
                </div>

                <ul className={styles.heroChecks}>
                  {[
                    "172-point inspection",
                    "Free vehicle history",
                    "7-day money-back promise",
                  ].map((item) => (
                    <li key={item}>
                      <span className={styles.checkIcon}>
                        <Icon name="check" size={13} strokeWidth={2.4} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.heroVisual}>
                <span className={styles.heroRing} aria-hidden="true" />
                <span className={styles.heroRingSmall} aria-hidden="true" />

                <div className={styles.heroCard}>
                  <div className={styles.heroCardTop}>
                    <span className={styles.heroCardBadge}>
                      <Icon name="shield" size={13} />
                      D&M certified
                    </span>
                    <span className={styles.heroCardPrice}>$469/mo</span>
                  </div>
                  <img
                    src={car5}
                    alt="Certified pre-owned Ford Explorer"
                    className={styles.heroCardImg}
                  />
                  <div className={styles.heroCardBottom}>
                    <div>
                      <p className={styles.heroCardName}>Ford Explorer XLT</p>
                      <p className={styles.heroCardMeta}>
                        2021 · 34,120 mi · AWD
                      </p>
                    </div>
                    <span className={styles.heroCardScore}>4.9</span>
                  </div>
                </div>

                <div className={styles.floatingCard}>
                  <span className={styles.floatingIcon}>
                    <Icon name="gauge" size={20} />
                  </span>
                  <div>
                    <p className={styles.floatingValue}>172-point</p>
                    <p className={styles.floatingLabel}>inspection passed</p>
                  </div>
                </div>

                <div className={styles.floatingPill}>
                  <span className={styles.pulseDot} />
                  Ready to drive today
                </div>
              </div>
            </div>

            <div className={styles.stats}>
              {[
                { value: "172", label: "inspection points" },
                { value: "7 days", label: "to change your mind" },
                { value: "12 mo", label: "limited warranty" },
                { value: "4.9/5", label: "from 2,400+ owners" },
              ].map((stat, index) => (
                <Reveal key={stat.label} delay={index * 80}>
                  <div className={styles.stat}>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className={styles.marquee} aria-hidden="true">
            <div className={styles.marqueeTrack}>
              {[0, 1].map((copy) => (
                <div className={styles.marqueeGroup} key={copy}>
                  {[
                    "Toyota",
                    "Honda",
                    "Ford",
                    "Hyundai",
                    "Kia",
                    "Chevrolet",
                    "Jeep",
                    "Ram",
                    "GMC",
                    "Nissan",
                  ].map((brand) => (
                    <span key={`${copy}-${brand}`} className={styles.brand}>
                      {brand}
                      <span className={styles.brandDot} />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.inventory}>
          <div className="container">
            <Reveal>
              <div className={styles.sectionHead}>
                <div>
                  <span className={styles.kicker}>Fresh arrivals</span>
                  <h2 className={styles.sectionTitle}>
                    Find a car with a story
                    <br />
                    worth continuing.
                  </h2>
                </div>
                <p className={styles.sectionText}>
                  Real photos, real mileage and a full history report on every
                  listing. Filter, sort and save your favourites — then reserve
                  in under two minutes.
                </p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className={styles.toolbar}>
                <div
                  className={styles.filters}
                  role="group"
                  aria-label="Filter cars by type"
                >
                  {FILTERS.map((item) => (
                    <button
                      key={item}
                      type="button"
                      className={`${styles.filterBtn} ${
                        filter === item ? styles.filterBtnActive : ""
                      }`}
                      onClick={() => setFilter(item)}
                      aria-pressed={filter === item}
                    >
                      {item}
                    </button>
                  ))}
                </div>

                <label className={styles.sortLabel}>
                  Sort by
                  <select
                    className={styles.sortSelect}
                    value={sort}
                    onChange={(event) =>
                      setSort(event.target.value as SortOption)
                    }
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: low to high</option>
                    <option value="price-high">Price: high to low</option>
                    <option value="mileage">Lowest mileage</option>
                  </select>
                </label>
              </div>
            </Reveal>

            <p className={styles.results}>
              Showing <strong>{visibleCars.length}</strong> of{" "}
              {INVENTORY.length} cars
              {filter !== "All" ? ` in ${filter}` : ""}
            </p>

            <div className={styles.inventoryGrid}>
              {visibleCars.map((car, index) => {
                const isSaved = isFavorite(`preowned-${car.id}`);

                return (
                  <Reveal key={car.id} delay={index * 60}>
                    <article className={styles.carCard}>
                      <div className={styles.carMedia}>
                        <img src={car.img} alt={car.name} loading="lazy" />
                        <span className={styles.carBadge}>{car.badge}</span>
                        <button
                          type="button"
                          className={`${styles.saveBtn} ${
                            isSaved ? styles.saveBtnActive : ""
                          }`}
                          onClick={() => toggleSaved(car)}
                          aria-label={
                            isSaved
                              ? `Remove ${car.name} from saved cars`
                              : `Save ${car.name}`
                          }
                          aria-pressed={isSaved}
                        >
                          <Icon name="heart" size={17} />
                        </button>
                      </div>

                      <div className={styles.carBody}>
                        <p className={styles.carMeta}>
                          {car.year} · {car.mileage} · {car.type}
                        </p>
                        <h3 className={styles.carName}>{car.name}</h3>

                        <div className={styles.carPriceRow}>
                          <div>
                            <p className={styles.carPrice}>{car.price}</p>
                            <p className={styles.carMonthly}>
                              or {car.monthly} with financing
                            </p>
                          </div>
                          <Link
                            to="/finance"
                            className={styles.carLink}
                            aria-label={`Finance ${car.name}`}
                          >
                            <Icon name="arrow-up-right" size={19} />
                          </Link>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={100}>
              <div className={styles.inventoryNote}>
                <Icon name="info" size={18} />
                Every listing includes a free vehicle history report. Prices
                exclude taxes and registration.
              </div>
            </Reveal>
          </div>
        </section>

        <section className={styles.benefits}>
          <div className="container">
            <Reveal>
              <div className={styles.centerHead}>
                <span className={styles.kicker}>Why pre-owned, why D&M</span>
                <h2 className={styles.sectionTitle}>
                  The peace of mind is included.
                </h2>
                <p className={styles.centerText}>
                  Buying used should not feel like a gamble. We built every step
                  around the things that keep you moving.
                </p>
              </div>
            </Reveal>

            <div className={styles.benefitGrid}>
              {BENEFITS.map((benefit, index) => (
                <Reveal key={benefit.title} delay={index * 90}>
                  <article className={styles.benefitCard}>
                    <span className={styles.benefitIcon}>
                      <Icon name={benefit.icon} size={24} />
                    </span>
                    <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                    <p className={styles.benefitText}>{benefit.text}</p>
                    <span className={styles.benefitIndex}>0{index + 1}</span>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.inspection}>
          <div className="container">
            <div className={styles.inspectionGrid}>
              <Reveal className={styles.inspectionVisualWrap}>
                <div className={styles.inspectionVisual}>
                  <img
                    src={car9}
                    alt="Technician inspecting a pre-owned Honda CR-V"
                    className={styles.inspectionImg}
                  />
                  <div className={styles.inspectionScore}>
                    <div className={styles.scoreRing}>
                      <span>172</span>
                      <small>checks</small>
                    </div>
                    <p>Passed with flying colours</p>
                  </div>
                  <span className={styles.passedStamp}>CERTIFIED</span>
                </div>
              </Reveal>

              <Reveal delay={120}>
                <div className={styles.inspectionCopy}>
                  <span className={styles.kicker}>The D&M standard</span>
                  <h2 className={styles.sectionTitle}>
                    We look underneath,
                    <br />
                    inside and beyond.
                  </h2>
                  <p className={styles.sectionText}>
                    Our technicians spend an average of four hours with every
                    car before it earns a D&M badge. If something is not right,
                    it gets fixed — or the car does not make the cut.
                  </p>

                  <ul className={styles.checkList}>
                    {[
                      "Full engine, transmission and brake inspection",
                      "Battery health and charging system test",
                      "Frame, underbody and flood-damage check",
                      "Software, safety and recall verification",
                      "Fresh fluids, filters and detailing",
                      "Road test on city streets and highway",
                    ].map((item) => (
                      <li key={item}>
                        <span className={styles.checkListIcon}>
                          <Icon name="check" size={14} strokeWidth={2.4} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Link to="/contacts" className={styles.textLink}>
                    Ask us about a specific car
                    <Icon name="arrow-right" size={17} />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className={styles.process}>
          <div className="container">
            <Reveal>
              <div className={styles.centerHead}>
                <span className={styles.kicker}>
                  From scroll to steering wheel
                </span>
                <h2 className={styles.sectionTitle}>
                  Four steps. Zero pressure.
                </h2>
              </div>
            </Reveal>

            <div className={styles.steps}>
              <span className={styles.stepLine} aria-hidden="true" />
              {STEPS.map((step, index) => (
                <Reveal key={step.title} delay={index * 100}>
                  <article className={styles.step}>
                    <div className={styles.stepTop}>
                      <span className={styles.stepNumber}>0{index + 1}</span>
                      <span className={styles.stepIcon}>
                        <Icon name={step.icon} size={23} />
                      </span>
                    </div>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepText}>{step.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.testimonials}>
          <span className={styles.testimonialOrb} aria-hidden="true" />
          <div className="container">
            <Reveal>
              <div className={styles.centerHead}>
                <span className={styles.kickerLight}>Owner stories</span>
                <h2 className={`${styles.sectionTitle} ${styles.lightTitle}`}>
                  The road looks good from here.
                </h2>
              </div>
            </Reveal>

            <div className={styles.testimonialGrid}>
              {TESTIMONIALS.map((item, index) => (
                <Reveal key={item.name} delay={index * 100}>
                  <figure className={styles.testimonialCard}>
                    <div className={styles.stars}>
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <Icon
                          key={starIndex}
                          name="star"
                          size={15}
                          className={styles.star}
                        />
                      ))}
                    </div>
                    <blockquote className={styles.quote}>
                      “{item.text}”
                    </blockquote>
                    <figcaption className={styles.author}>
                      <span className={styles.avatar}>
                        {item.name.charAt(0)}
                      </span>
                      <span>
                        <strong>{item.name}</strong>
                        <small>{item.detail}</small>
                      </span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.faq}>
          <div className="container">
            <div className={styles.faqGrid}>
              <Reveal>
                <div className={styles.faqCopy}>
                  <span className={styles.kicker}>Good questions</span>
                  <h2 className={styles.sectionTitle}>
                    Everything you want
                    <br />
                    to ask first.
                  </h2>
                  <p className={styles.sectionText}>
                    Still unsure about something? Our team answers every message
                    like a real human — usually within one business hour.
                  </p>
                  <Link to="/contacts" className={styles.textLink}>
                    Talk to a specialist
                    <Icon name="message" size={17} />
                  </Link>
                </div>
              </Reveal>

              <Reveal delay={120}>
                <Accordion items={FAQ_ITEMS} />
              </Reveal>
            </div>
          </div>
        </section>

        <CtaBanner
          eyebrow="Your next chapter"
          title="The right car is already waiting."
          text="Browse certified pre-owned cars with transparent pricing, a full inspection report and a return promise that actually means something."
          primary={{ label: "Browse inventory", to: "/catalog" }}
          secondary={{ label: "Get pre-qualified", to: "/finance" }}
          variant="blue"
        />
      </Main>
      <Footer />
    </div>
  );
};

export default PreOwnedCars;
