import { useMemo, useState } from "react";
import { Link } from "react-router";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Main from "../components/Main/Main";
import Icon from "../components/ui/Icon/Icon";
import Reveal from "../components/ui/Reveal/Reveal";
import Accordion from "../components/ui/Accordion/Accordion";
import CtaBanner from "../components/ui/CtaBanner/CtaBanner";
import styles from "./FinancePage.module.css";

const TERMS = [36, 48, 60, 72, 84];

const PATH_OPTIONS = [
  {
    id: "finance",
    icon: "bank" as const,
    label: "Finance",
    tag: "Most flexible",
    title: "Own it from day one",
    text: "Spread the cost over time, build equity and drive without mileage limits. A great fit if you keep cars for the long haul.",
    points: [
      "24 to 84 month terms",
      "No mileage restrictions",
      "Pay off early with no penalty",
    ],
    cta: "Explore auto loans",
    to: "#plans",
    tone: "blue" as const,
  },
  {
    id: "lease",
    icon: "key" as const,
    label: "Lease",
    tag: "Lowest payment",
    title: "Upgrade more often",
    text: "Drive a newer car for less per month and swap it for the latest model when your term ends. Keep it simple.",
    points: [
      "Lower monthly payments",
      "Warranty covers the term",
      "New car every 2–4 years",
    ],
    cta: "Compare lease vs buy",
    to: "/leasevsbuy",
    tone: "ink" as const,
  },
  {
    id: "cash",
    icon: "dollar" as const,
    label: "Pay cash",
    tag: "Zero interest",
    title: "Keep it simple",
    text: "Pay once, own it outright and never think about a payment again. The most straightforward route if it fits your budget.",
    points: [
      "No monthly payments",
      "No interest charges",
      "Immediate full ownership",
    ],
    cta: "Browse cars",
    to: "/catalog",
    tone: "sky" as const,
  },
];

const PLANS = [
  {
    name: "Essential",
    apr: "5.49%",
    term: "36–60 months",
    payment: "$405",
    example: "on a $24,000 loan",
    best: false,
    features: [
      "Rates from 5.49% APR",
      "Same-day decision",
      "No application fee",
      "Free payoff quote anytime",
    ],
  },
  {
    name: "Signature",
    apr: "4.99%",
    term: "48–72 months",
    payment: "$369",
    example: "on a $24,000 loan",
    best: true,
    features: [
      "Rates from 4.99% APR",
      "Priority underwriting",
      "Payment date flexibility",
      "Rate discount for autopay",
      "Dedicated finance manager",
    ],
  },
  {
    name: "Flex",
    apr: "6.29%",
    term: "60–84 months",
    payment: "$387",
    example: "on a $24,000 loan",
    best: false,
    features: [
      "Rates from 6.29% APR",
      "Longer terms for lower payments",
      "No prepayment penalty",
      "Refinance options later",
    ],
  },
];

const STEPS = [
  {
    icon: "calculator" as const,
    title: "Estimate",
    text: "Start with the calculator above. Adjust price, down payment and term until the monthly number feels right.",
  },
  {
    icon: "users" as const,
    title: "Get pre-qualified",
    text: "Answer a few questions and see your real rate. Our soft check never affects your credit score.",
  },
  {
    icon: "car" as const,
    title: "Choose your car",
    text: "Shop new or pre-owned inventory with your budget already locked in. No surprises at the dealership.",
  },
  {
    icon: "key" as const,
    title: "Sign and drive",
    text: "Review your final terms, e-sign from home and collect the keys. Most deals close within 24 hours.",
  },
];

const BENEFITS = [
  {
    icon: "lock" as const,
    title: "Your data, protected",
    text: "Bank-level encryption and a soft credit check that keeps your score untouched while you explore.",
  },
  {
    icon: "clock" as const,
    title: "Decision in minutes",
    text: "No waiting by the phone. Get a clear answer and a real rate while you are still on the page.",
  },
  {
    icon: "percent" as const,
    title: "Transparent pricing",
    text: "Every fee is shown upfront. What you see in the estimate is what appears in your contract.",
  },
  {
    icon: "refresh" as const,
    title: "Flexible refinancing",
    text: "Rates move. If they drop, you can refinance later without penalty or paperwork headaches.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "The calculator matched my final payment almost exactly. I walked in knowing the number and walked out with the keys.",
    name: "Jordan M.",
    detail: "Financed a 2023 CR-V",
  },
  {
    quote:
      "I was pre-qualified before breakfast and approved before lunch. The soft check meant I could shop without stressing my credit.",
    name: "Elena K.",
    detail: "Financed a 2022 Explorer",
  },
];

const FAQ_ITEMS = [
  {
    question: "Will checking my rate affect my credit score?",
    answer:
      "Our pre-qualification uses a soft credit inquiry, which is visible only to you and does not affect your score. A hard inquiry happens only if you choose to move forward with a specific offer.",
  },
  {
    question: "What credit score do I need to qualify?",
    answer:
      "We work with a wide range of lenders. Strong credit usually unlocks our lowest advertised rates, but we also have options for buyers who are rebuilding credit or have limited history.",
  },
  {
    question: "How much should I put down?",
    answer:
      "A down payment of 10–20% is a comfortable starting point. It lowers your monthly payment and the total interest you pay. Use the calculator to compare a few scenarios side by side.",
  },
  {
    question: "Can I pay off my loan early?",
    answer:
      "Yes. There is no prepayment penalty on any D&M loan. Pay extra when you can, or settle the balance in full at any time.",
  },
  {
    question: "Do you finance pre-owned cars?",
    answer:
      "Absolutely. Certified pre-owned vehicles qualify for the same lender network. Some banks offer even better rates on newer used cars with low mileage.",
  },
  {
    question: "What documents will I need?",
    answer:
      "A valid driver's license, proof of income, proof of insurance and your current address. For a trade-in, add the title or lien information for your existing car.",
  },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

const Finance: React.FC = () => {
  const [price, setPrice] = useState(32000);
  const [downPayment, setDownPayment] = useState(4000);
  const [term, setTerm] = useState(60);
  const [apr, setApr] = useState(6.9);

  const estimate = useMemo(() => {
    const principal = Math.max(price - downPayment, 0);
    const monthlyRate = apr / 100 / 12;
    const monthlyPayment =
      monthlyRate === 0 || term === 0
        ? principal / Math.max(term, 1)
        : (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));
    const totalPaid = monthlyPayment * term;
    const totalInterest = Math.max(totalPaid - principal, 0);
    const interestShare = totalPaid > 0 ? (totalInterest / totalPaid) * 100 : 0;

    return {
      principal,
      monthlyPayment,
      totalInterest,
      totalPaid,
      interestShare,
      principalShare: 100 - interestShare,
    };
  }, [price, downPayment, term, apr]);

  return (
    <div className="wrapper">
      <Header />
      <Main>
        <section className={styles.hero}>
          <span className={styles.orbOne} aria-hidden="true" />
          <span className={styles.orbTwo} aria-hidden="true" />
          <span className={styles.heroGrid} aria-hidden="true" />

          <div className="container">
            <div className={styles.heroGridInner}>
              <div className={styles.heroCopy}>
                <div className={styles.eyebrow}>
                  <span className={styles.eyebrowDot} />
                  Financing made human
                </div>

                <h1 className={styles.heroTitle}>
                  A payment plan
                  <br />
                  <span className={styles.gradient}>that fits your life.</span>
                </h1>

                <p className={styles.heroText}>
                  No mystery rates, no pressure and no impact on your credit
                  score to see your options. Move the sliders, find your number
                  and drive with confidence.
                </p>

                <div className={styles.heroActions}>
                  <a href="#plans" className={styles.primaryBtn}>
                    See today&apos;s rates
                    <Icon name="arrow-right" size={18} />
                  </a>
                  <Link to="/contacts" className={styles.secondaryBtn}>
                    Talk to a specialist
                  </Link>
                </div>

                <ul className={styles.heroChecks}>
                  {[
                    "Soft credit check only",
                    "No hidden fees",
                    "Decision in minutes",
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
                <span className={styles.calcRing} aria-hidden="true" />
                <span className={styles.calcRingSmall} aria-hidden="true" />

                <div className={styles.calculator}>
                  <div className={styles.calcHeader}>
                    <span className={styles.calcBadge}>
                      <Icon name="calculator" size={14} />
                      Payment estimator
                    </span>
                    <span className={styles.calcLive}>
                      <span className={styles.liveDot} />
                      Live
                    </span>
                  </div>

                  <div className={styles.calcResult}>
                    <p className={styles.calcLabel}>
                      Estimated monthly payment
                    </p>
                    <div className={styles.calcValueRow}>
                      <span
                        key={Math.round(estimate.monthlyPayment)}
                        className={styles.calcValue}
                      >
                        {formatCurrency(estimate.monthlyPayment)}
                      </span>
                      <span className={styles.calcPer}>/mo</span>
                    </div>
                    <p className={styles.calcSub}>
                      {term} months · {apr.toFixed(1)}% APR ·{" "}
                      {formatCurrency(downPayment)} down
                    </p>
                  </div>

                  <div className={styles.calcBar}>
                    <span
                      className={styles.calcBarPrincipal}
                      style={{ width: `${estimate.principalShare}%` }}
                    />
                    <span
                      className={styles.calcBarInterest}
                      style={{ width: `${estimate.interestShare}%` }}
                    />
                  </div>

                  <div className={styles.calcLegend}>
                    <span>
                      <i className={styles.legendPrincipal} />
                      Principal {formatCurrency(estimate.principal)}
                    </span>
                    <span>
                      <i className={styles.legendInterest} />
                      Interest {formatCurrency(estimate.totalInterest)}
                    </span>
                  </div>

                  <div className={styles.calcFields}>
                    <label className={styles.calcField}>
                      <span className={styles.fieldLabel}>
                        Vehicle price
                        <strong>{formatCurrency(price)}</strong>
                      </span>
                      <input
                        type="range"
                        min={10000}
                        max={80000}
                        step={1000}
                        value={price}
                        onChange={(event) => {
                          const nextPrice = Number(event.target.value);
                          setPrice(nextPrice);
                          setDownPayment((current) =>
                            Math.min(current, nextPrice),
                          );
                        }}
                        className={styles.range}
                      />
                    </label>

                    <label className={styles.calcField}>
                      <span className={styles.fieldLabel}>
                        Down payment
                        <strong>{formatCurrency(downPayment)}</strong>
                      </span>
                      <input
                        type="range"
                        min={0}
                        max={Math.min(20000, price)}
                        step={500}
                        value={downPayment}
                        onChange={(event) =>
                          setDownPayment(Number(event.target.value))
                        }
                        className={styles.range}
                      />
                    </label>

                    <label className={styles.calcField}>
                      <span className={styles.fieldLabel}>
                        Estimated APR
                        <strong>{apr.toFixed(1)}%</strong>
                      </span>
                      <input
                        type="range"
                        min={2}
                        max={14}
                        step={0.1}
                        value={apr}
                        onChange={(event) => setApr(Number(event.target.value))}
                        className={styles.range}
                      />
                    </label>
                  </div>

                  <div
                    className={styles.termGroup}
                    role="group"
                    aria-label="Loan term"
                  >
                    {TERMS.map((months) => (
                      <button
                        key={months}
                        type="button"
                        className={`${styles.termBtn} ${
                          term === months ? styles.termBtnActive : ""
                        }`}
                        onClick={() => setTerm(months)}
                        aria-pressed={term === months}
                      >
                        {months} mo
                      </button>
                    ))}
                  </div>

                  <div className={styles.calcFooter}>
                    <span>
                      <Icon name="lock" size={14} />
                      Soft credit check only
                    </span>
                    <a href="#plans">
                      See plans
                      <Icon name="arrow-right" size={14} />
                    </a>
                  </div>
                </div>

                <div className={styles.approvedChip}>
                  <span className={styles.approvedIcon}>
                    <Icon name="shield" size={20} />
                  </span>
                  <div>
                    <p className={styles.approvedValue}>Pre-qualified</p>
                    <p className={styles.approvedLabel}>in under 60 seconds</p>
                  </div>
                </div>

                <div className={styles.aprChip}>
                  <Icon name="spark" size={15} />
                  APR from 4.99%
                </div>
              </div>
            </div>

            <div className={styles.stats}>
              {[
                { value: "4.9/5", label: "average customer rating" },
                { value: "60 sec", label: "to see your estimate" },
                { value: "0", label: "impact on your credit score" },
                { value: "1,200+", label: "buyers financed monthly" },
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
        </section>

        <section className={styles.paths}>
          <div className="container">
            <Reveal>
              <div className={styles.centerHead}>
                <span className={styles.kicker}>Pick your route</span>
                <h2 className={styles.sectionTitle}>
                  Three ways to get moving.
                </h2>
                <p className={styles.centerText}>
                  There is no single right answer — only the one that fits your
                  budget, your habits and how long you like to keep a car.
                </p>
              </div>
            </Reveal>

            <div className={styles.pathGrid}>
              {PATH_OPTIONS.map((option, index) => (
                <Reveal key={option.id} delay={index * 100}>
                  <article
                    className={`${styles.pathCard} ${styles[option.tone]}`}
                  >
                    <div className={styles.pathTop}>
                      <span className={styles.pathIcon}>
                        <Icon name={option.icon} size={24} />
                      </span>
                      <span className={styles.pathTag}>{option.tag}</span>
                    </div>
                    <p className={styles.pathLabel}>{option.label}</p>
                    <h3 className={styles.pathTitle}>{option.title}</h3>
                    <p className={styles.pathText}>{option.text}</p>
                    <ul className={styles.pathPoints}>
                      {option.points.map((point) => (
                        <li key={point}>
                          <Icon name="check" size={14} strokeWidth={2.4} />
                          {point}
                        </li>
                      ))}
                    </ul>
                    {option.to.startsWith("#") ? (
                      <a href={option.to} className={styles.pathLink}>
                        {option.cta}
                        <Icon name="arrow-right" size={16} />
                      </a>
                    ) : (
                      <Link to={option.to} className={styles.pathLink}>
                        {option.cta}
                        <Icon name="arrow-right" size={16} />
                      </Link>
                    )}
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.plans} id="plans">
          <div className={styles.plansOrb} aria-hidden="true" />
          <div className="container">
            <Reveal>
              <div className={styles.plansHead}>
                <div>
                  <span className={styles.kickerLight}>Rates & plans</span>
                  <h2 className={`${styles.sectionTitle} ${styles.lightTitle}`}>
                    A plan for every budget.
                  </h2>
                </div>
                <p className={styles.plansIntro}>
                  Representative rates for qualified buyers. Your final APR
                  depends on credit, term and vehicle. No fees until you sign.
                </p>
              </div>
            </Reveal>

            <div className={styles.planGrid}>
              {PLANS.map((plan, index) => (
                <Reveal key={plan.name} delay={index * 100}>
                  <article
                    className={`${styles.planCard} ${
                      plan.best ? styles.planFeatured : ""
                    }`}
                  >
                    {plan.best && (
                      <span className={styles.planBadge}>Most popular</span>
                    )}
                    <p className={styles.planName}>{plan.name}</p>
                    <div className={styles.planRate}>
                      <span>{plan.apr}</span>
                      <small>APR from</small>
                    </div>
                    <p className={styles.planTerm}>{plan.term}</p>
                    <div className={styles.planPayment}>
                      <strong>{plan.payment}</strong>
                      <span>/mo</span>
                    </div>
                    <p className={styles.planExample}>{plan.example}</p>
                    <ul className={styles.planFeatures}>
                      {plan.features.map((feature) => (
                        <li key={feature}>
                          <span className={styles.planCheck}>
                            <Icon name="check" size={12} strokeWidth={2.6} />
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link to="/contacts" className={styles.planBtn}>
                      Get pre-qualified
                      <Icon name="arrow-right" size={16} />
                    </Link>
                  </article>
                </Reveal>
              ))}
            </div>

            <p className={styles.plansNote}>
              <Icon name="info" size={15} />
              Example payment assumes a $24,000 loan over 60 months. Rates shown
              are representative and subject to change.
            </p>
          </div>
        </section>

        <section className={styles.process}>
          <div className="container">
            <Reveal>
              <div className={styles.centerHead}>
                <span className={styles.kicker}>How it works</span>
                <h2 className={styles.sectionTitle}>
                  From estimate to keys
                  <br />
                  in four easy steps.
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

        <section className={styles.credit}>
          <div className="container">
            <div className={styles.creditGrid}>
              <Reveal>
                <div className={styles.creditCopy}>
                  <span className={styles.kicker}>Your credit, your pace</span>
                  <h2 className={styles.sectionTitle}>
                    Explore first.
                    <br />
                    Commit later.
                  </h2>
                  <p className={styles.sectionText}>
                    Seeing your options should never cost you a credit inquiry.
                    Start with a soft check, compare real offers and decide when
                    you are ready.
                  </p>

                  <div className={styles.creditItems}>
                    {[
                      {
                        icon: "lock" as const,
                        title: "Soft check, zero impact",
                        text: "Your score stays exactly where it is while you explore.",
                      },
                      {
                        icon: "users" as const,
                        title: "21 lending partners",
                        text: "We compare banks and credit unions to find your best fit.",
                      },
                      {
                        icon: "message" as const,
                        title: "A real human, always",
                        text: "A finance specialist walks you through every line item.",
                      },
                    ].map((item) => (
                      <div key={item.title} className={styles.creditItem}>
                        <span className={styles.creditIcon}>
                          <Icon name={item.icon} size={20} />
                        </span>
                        <div>
                          <h3>{item.title}</h3>
                          <p>{item.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link to="/contacts" className={styles.textLink}>
                    Start my soft check
                    <Icon name="arrow-right" size={17} />
                  </Link>
                </div>
              </Reveal>

              <Reveal delay={120}>
                <div className={styles.scoreVisual}>
                  <div className={styles.scoreCard}>
                    <div className={styles.scoreTop}>
                      <span className={styles.scoreBadge}>
                        <Icon name="gauge" size={14} />
                        Credit snapshot
                      </span>
                      <span className={styles.scoreStatus}>Excellent</span>
                    </div>

                    <div className={styles.scoreGauge}>
                      <div className={styles.scoreInner}>
                        <strong>742</strong>
                        <span>Your score</span>
                      </div>
                    </div>

                    <div className={styles.scoreScale}>
                      <span>300</span>
                      <span>580</span>
                      <span>670</span>
                      <span>740</span>
                      <span>850</span>
                    </div>

                    <div className={styles.scoreNote}>
                      <Icon name="trend" size={17} />
                      <span>
                        <strong>+18 points</strong> since your last check
                      </span>
                    </div>
                  </div>

                  <div className={styles.softChip}>
                    <span className={styles.softChipIcon}>
                      <Icon name="shield" size={18} />
                    </span>
                    <span>
                      <strong>Soft inquiry</strong>
                      <small>Does not affect your score</small>
                    </span>
                  </div>

                  <div className={styles.scoreOrbOne} aria-hidden="true" />
                  <div className={styles.scoreOrbTwo} aria-hidden="true" />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className={styles.benefits}>
          <div className="container">
            <Reveal>
              <div className={styles.centerHead}>
                <span className={styles.kicker}>Built on clarity</span>
                <h2 className={styles.sectionTitle}>
                  The boring stuff,
                  <br />
                  handled properly.
                </h2>
              </div>
            </Reveal>

            <div className={styles.benefitGrid}>
              {BENEFITS.map((benefit, index) => (
                <Reveal key={benefit.title} delay={index * 80}>
                  <article className={styles.benefitCard}>
                    <span className={styles.benefitIcon}>
                      <Icon name={benefit.icon} size={22} />
                    </span>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.testimonials}>
          <div className="container">
            <div className={styles.testimonialGrid}>
              <Reveal>
                <div className={styles.testimonialIntro}>
                  <span className={styles.kicker}>
                    Real numbers, real people
                  </span>
                  <h2 className={styles.sectionTitle}>
                    Financing stories
                    <br />
                    worth passing on.
                  </h2>
                  <div className={styles.ratingRow}>
                    <div className={styles.stars}>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Icon
                          key={index}
                          name="star"
                          size={16}
                          className={styles.star}
                        />
                      ))}
                    </div>
                    <span>4.9 out of 5 · 2,400+ reviews</span>
                  </div>
                </div>
              </Reveal>

              {TESTIMONIALS.map((item, index) => (
                <Reveal key={item.name} delay={(index + 1) * 100}>
                  <figure className={styles.testimonialCard}>
                    <Icon
                      name="message"
                      size={28}
                      className={styles.quoteIcon}
                    />
                    <blockquote>“{item.quote}”</blockquote>
                    <figcaption>
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
            <Reveal>
              <div className={styles.centerHead}>
                <span className={styles.kicker}>Before you apply</span>
                <h2 className={styles.sectionTitle}>Questions, answered.</h2>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <Accordion items={FAQ_ITEMS} />
            </Reveal>
          </div>
        </section>

        <CtaBanner
          eyebrow="Ready when you are"
          title="Know your number before you choose your car."
          text="Get pre-qualified in under a minute, with no impact on your credit score. Then shop with a budget you can actually trust."
          primary={{ label: "Get pre-qualified", to: "/contacts" }}
          secondary={{ label: "Compare lease vs buy", to: "/leasevsbuy" }}
          variant="blue"
        />
      </Main>
      <Footer />
    </div>
  );
};

export default Finance;
