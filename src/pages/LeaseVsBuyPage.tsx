import { useMemo, useState } from "react";
import { Link } from "react-router";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Main from "../components/Main/Main";
import Icon from "../components/ui/Icon/Icon";
import Reveal from "../components/ui/Reveal/Reveal";
import Accordion from "../components/ui/Accordion/Accordion";
import CtaBanner from "../components/ui/CtaBanner/CtaBanner";
import styles from "./LeaseVsBuyPage.module.css";

const TERMS = [2, 3, 4, 5];

const LEASE_PROS = [
  "Lower monthly payment for the same car",
  "New vehicle every two to four years",
  "Warranty usually covers the full term",
  "No long-term resale risk",
  "Sales tax often paid monthly",
];

const LEASE_CONS = [
  "Mileage limits with excess-mile fees",
  "No ownership at the end",
  "Wear-and-tear charges on return",
  "Hard to exit early without cost",
  "Modifications are usually restricted",
];

const BUY_PROS = [
  "You own the car outright at the end",
  "No mileage restrictions",
  "Customize, modify or wrap it freely",
  "Equity you can trade or sell",
  "Drive it as long as you like",
];

const BUY_CONS = [
  "Higher monthly payment",
  "Depreciation is your risk",
  "Repairs are on you after warranty",
  "Selling or trading takes effort",
  "Bigger upfront cash commitment",
];

const COMPARISON = [
  {
    feature: "Upfront cost",
    lease: "Typically lower",
    buy: "Down payment + taxes",
    winner: "lease" as const,
  },
  {
    feature: "Monthly payment",
    lease: "20–30% lower on average",
    buy: "Higher, but builds equity",
    winner: "lease" as const,
  },
  {
    feature: "Ownership",
    lease: "Return or buy at term end",
    buy: "Yours from day one",
    winner: "buy" as const,
  },
  {
    feature: "Mileage",
    lease: "Annual cap, fees for excess",
    buy: "Unlimited",
    winner: "buy" as const,
  },
  {
    feature: "Maintenance",
    lease: "Often covered by warranty",
    buy: "Your responsibility long term",
    winner: "tie" as const,
  },
  {
    feature: "Customization",
    lease: "Limited",
    buy: "Anything goes",
    winner: "buy" as const,
  },
  {
    feature: "End of term",
    lease: "Hand back the keys",
    buy: "Keep, sell or trade",
    winner: "buy" as const,
  },
  {
    feature: "Best for",
    lease: "Low mileage, new-car lovers",
    buy: "Long keepers, high mileage",
    winner: "tie" as const,
  },
];

const QUIZ_QUESTIONS = [
  {
    question: "How many miles do you drive in a year?",
    options: [
      { label: "Under 10,000", score: 2 },
      { label: "10,000 – 15,000", score: 0 },
      { label: "More than 15,000", score: -2 },
    ],
  },
  {
    question: "How often do you like to change cars?",
    options: [
      { label: "Every 2–3 years", score: 2 },
      { label: "Every 4–5 years", score: 0 },
      { label: "I keep them until they stop", score: -2 },
    ],
  },
  {
    question: "How important is owning an asset at the end?",
    options: [
      { label: "Not important", score: 1 },
      { label: "Nice to have", score: 0 },
      { label: "Very important", score: -2 },
    ],
  },
];

const MYTHS = [
  {
    myth: "Leasing is always cheaper.",
    reality:
      "Leasing usually lowers the monthly payment, but you keep paying for as long as you lease. Buying can cost less per year if you keep a car for a decade.",
  },
  {
    myth: "Buying is always the smarter financial move.",
    reality:
      "Buying builds equity, but depreciation, repairs and a larger down payment can outweigh the benefit if you change cars every few years.",
  },
  {
    myth: "A lease means you are throwing money away.",
    reality:
      "You are paying for the depreciation you use, not for the whole car. If you value a new car every few years, that can be a fair trade.",
  },
  {
    myth: "You cannot get out of a lease early.",
    reality:
      "You can usually transfer or buy out a lease, though fees may apply. Always read the early-termination terms before signing.",
  },
];

const FAQ_ITEMS = [
  {
    question: "Can I buy the car at the end of a lease?",
    answer:
      "Yes. Most leases include a buyout price stated in your contract. If the car is worth more than that price, buying it can be a smart move. If not, you can simply return it.",
  },
  {
    question: "What happens if I go over my mileage limit?",
    answer:
      "You pay an agreed per-mile fee for the excess, usually between $0.15 and $0.30 per mile. If you expect to drive more, ask for a higher mileage allowance upfront — it is often cheaper than paying later.",
  },
  {
    question: "Is a down payment required for a lease?",
    answer:
      "Not always, but a down payment lowers the monthly payment. Be aware that if the car is stolen or totaled, that upfront cash is generally not refunded by the lease company.",
  },
  {
    question: "Who pays for maintenance on a leased car?",
    answer:
      "Routine maintenance is usually your responsibility, though many leases include scheduled service. Major repairs are typically covered by the factory warranty during the lease term.",
  },
  {
    question: "Does leasing help my credit?",
    answer:
      "Yes, consistently making on-time lease payments can strengthen your credit history just like a loan. Missing payments hurts in the same way.",
  },
  {
    question: "Can I lease a used car?",
    answer:
      "You can, though new-car leasing is more common. Certified pre-owned leases exist and can be a good middle ground, with lower payments than a new lease and more warranty than a private used purchase.",
  },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

const LeaseVsBuy: React.FC = () => {
  const [price, setPrice] = useState(42000);
  const [downPercent, setDownPercent] = useState(10);
  const [years, setYears] = useState(3);
  const [answers, setAnswers] = useState<(number | null)[]>(
    QUIZ_QUESTIONS.map(() => null),
  );

  const comparison = useMemo(() => {
    const months = years * 12;

    // Lease: depreciation + rent charge (money factor 0.0015 ≈ 3.6% APR)
    const residualRate = 0.78 - 0.075 * years;
    const residual = price * residualRate;
    const leaseDepreciation = price - residual;
    const leaseRent = price * 0.0015 * months;
    const leaseMonthly = (leaseDepreciation + leaseRent) / months;
    const leaseUpfront = (price * downPercent) / 100 + 895;
    const leaseTotal = leaseUpfront + leaseMonthly * months;

    // Buy: 60-month loan at 6.8% APR
    const buyDown = (price * downPercent) / 100;
    const principal = price - buyDown;
    const monthlyRate = 0.068 / 12;
    const loanMonths = 60;
    const buyMonthly =
      (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -loanMonths));

    let balance = principal;
    for (let month = 0; month < months; month += 1) {
      balance = balance * (1 + monthlyRate) - buyMonthly;
    }
    balance = Math.max(balance, 0);

    const resaleValue = price * Math.max(0.35, 1 - 0.11 * years);
    const equity = Math.max(resaleValue - balance, 0);
    const buyCashOut = buyDown + buyMonthly * months;
    const buyNetCost = Math.max(buyCashOut - equity, 0);

    return {
      months,
      leaseMonthly,
      leaseUpfront,
      leaseTotal,
      residual,
      buyMonthly,
      buyDown,
      equity,
      buyCashOut,
      buyNetCost,
      resaleValue,
    };
  }, [price, downPercent, years]);

  const answeredCount = answers.filter((answer) => answer !== null).length;
  const quizComplete = answeredCount === QUIZ_QUESTIONS.length;

  const quizScore = useMemo(
    () =>
      answers.reduce<number>(
        (total, answer) => total + (answer === null ? 0 : answer),
        0,
      ),
    [answers],
  );

  const quizResult = useMemo(() => {
    if (!quizComplete) return null;

    if (quizScore > 0) {
      return {
        icon: "key" as const,
        label: "Your lean: lease",
        title: "Flexibility looks like your priority.",
        text: "Low mileage, a taste for newer cars and less interest in long-term ownership all point toward leasing. You get lower payments and a fresh car every few years.",
        primary: { label: "Explore leasing", to: "/finance" },
        secondary: { label: "Browse cars", to: "/catalog" },
      };
    }

    if (quizScore < 0) {
      return {
        icon: "bank" as const,
        label: "Your lean: buy",
        title: "Ownership looks like your priority.",
        text: "Higher mileage, longer ownership and a preference for building equity point toward buying. You get unlimited miles and an asset at the end.",
        primary: { label: "Explore financing", to: "/finance" },
        secondary: { label: "Browse cars", to: "/catalog" },
      };
    }

    return {
      icon: "scale" as const,
      label: "It is a genuine tie",
      title: "Both routes could work for you.",
      text: "Your answers are balanced. The next step is comparing real numbers for the car you want — monthly payment, term and total cost. A specialist can model both in minutes.",
      primary: { label: "Talk to a specialist", to: "/contacts" },
      secondary: { label: "See finance plans", to: "/finance" },
    };
  }, [quizComplete, quizScore]);

  const handleAnswer = (questionIndex: number, score: number) => {
    setAnswers((current) => {
      const next = [...current];
      next[questionIndex] = score;
      return next;
    });
  };

  const leaseCheaper = comparison.leaseMonthly < comparison.buyMonthly;
  const maxTotal = Math.max(comparison.leaseTotal, comparison.buyNetCost, 1);

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
                  Lease vs buy
                </div>

                <h1 className={styles.heroTitle}>
                  Two smart ways to drive.
                  <br />
                  <span className={styles.gradient}>
                    One right answer for you.
                  </span>
                </h1>

                <p className={styles.heroText}>
                  Monthly payment or long-term ownership? A new car every few
                  years or the same one for a decade? Compare the real numbers,
                  then take the 60-second quiz.
                </p>

                <div className={styles.heroActions}>
                  <a href="#compare" className={styles.primaryBtn}>
                    Compare side by side
                    <Icon name="arrow-right" size={18} />
                  </a>
                  <a href="#quiz" className={styles.secondaryBtn}>
                    Take the quiz
                  </a>
                </div>

                <ul className={styles.heroChecks}>
                  {[
                    "Real numbers, not sales talk",
                    "No credit check to explore",
                    "A recommendation in 60 seconds",
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

                <div className={styles.duel}>
                  <div className={`${styles.duelCard} ${styles.leaseCard}`}>
                    <span className={styles.duelTag}>Lease</span>
                    <span className={styles.duelIcon}>
                      <Icon name="key" size={22} />
                    </span>
                    <p className={styles.duelLabel}>From</p>
                    <p className={styles.duelPrice}>
                      $389<span>/mo</span>
                    </p>
                    <p className={styles.duelMeta}>New car every 3 years</p>
                    <ul className={styles.duelList}>
                      <li>
                        <Icon name="check" size={12} />
                        Lower payment
                      </li>
                      <li>
                        <Icon name="check" size={12} />
                        Warranty covered
                      </li>
                    </ul>
                  </div>

                  <div className={`${styles.duelCard} ${styles.buyCard}`}>
                    <span className={styles.duelTag}>Buy</span>
                    <span className={styles.duelIcon}>
                      <Icon name="car" size={22} />
                    </span>
                    <p className={styles.duelLabel}>From</p>
                    <p className={styles.duelPrice}>
                      $612<span>/mo</span>
                    </p>
                    <p className={styles.duelMeta}>Yours after 60 months</p>
                    <ul className={styles.duelList}>
                      <li>
                        <Icon name="check" size={12} />
                        Unlimited miles
                      </li>
                      <li>
                        <Icon name="check" size={12} />
                        Builds equity
                      </li>
                    </ul>
                  </div>

                  <span className={styles.vsBadge}>VS</span>
                </div>

                <div className={styles.heroChip}>
                  <span className={styles.heroChipIcon}>
                    <Icon name="scale" size={19} />
                  </span>
                  <span>
                    <strong>No universal winner</strong>
                    <small>It depends on how you drive</small>
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.stats}>
              {[
                { value: "3 min", label: "to compare real numbers" },
                { value: "2–4 yrs", label: "typical lease term" },
                { value: "60 mo", label: "typical auto loan" },
                { value: "4.9/5", label: "from 2,400+ drivers" },
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

        <section className={styles.compare} id="compare">
          <div className="container">
            <Reveal>
              <div className={styles.centerHead}>
                <span className={styles.kicker}>Run the numbers</span>
                <h2 className={styles.sectionTitle}>
                  Same car. Two very
                  <br />
                  different budgets.
                </h2>
                <p className={styles.centerText}>
                  Move the sliders to see how price, cash down and term change
                  the monthly cost — and what you actually walk away with.
                </p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className={styles.controls}>
                <label className={styles.controlField}>
                  <span className={styles.controlLabel}>
                    Vehicle price
                    <strong>{formatCurrency(price)}</strong>
                  </span>
                  <input
                    type="range"
                    min={20000}
                    max={90000}
                    step={1000}
                    value={price}
                    onChange={(event) => setPrice(Number(event.target.value))}
                    className={styles.range}
                  />
                </label>

                <label className={styles.controlField}>
                  <span className={styles.controlLabel}>
                    Cash down
                    <strong>{downPercent}%</strong>
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={30}
                    step={5}
                    value={downPercent}
                    onChange={(event) =>
                      setDownPercent(Number(event.target.value))
                    }
                    className={styles.range}
                  />
                </label>

                <div className={styles.termField}>
                  <span className={styles.controlLabel}>Compare over</span>
                  <div
                    className={styles.termGroup}
                    role="group"
                    aria-label="Comparison term"
                  >
                    {TERMS.map((term) => (
                      <button
                        key={term}
                        type="button"
                        className={`${styles.termBtn} ${
                          years === term ? styles.termBtnActive : ""
                        }`}
                        onClick={() => setYears(term)}
                        aria-pressed={years === term}
                      >
                        {term} yrs
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <div className={styles.compareGrid}>
              <Reveal delay={60}>
                <article className={styles.resultCard}>
                  <div className={styles.resultTop}>
                    <span className={styles.resultIcon}>
                      <Icon name="key" size={21} />
                    </span>
                    <span className={styles.resultTag}>Lease</span>
                  </div>

                  <p className={styles.resultLabel}>Estimated monthly</p>
                  <p className={styles.resultValue}>
                    {formatCurrency(comparison.leaseMonthly)}
                    <span>/mo</span>
                  </p>

                  <dl className={styles.resultList}>
                    <div>
                      <dt>Due at signing</dt>
                      <dd>{formatCurrency(comparison.leaseUpfront)}</dd>
                    </div>
                    <div>
                      <dt>Total over {years} years</dt>
                      <dd>{formatCurrency(comparison.leaseTotal)}</dd>
                    </div>
                    <div>
                      <dt>At the end</dt>
                      <dd>Return the keys</dd>
                    </div>
                  </dl>

                  <div className={styles.resultBar}>
                    <span
                      style={{
                        width: `${(comparison.leaseTotal / maxTotal) * 100}%`,
                      }}
                    />
                  </div>

                  <p className={styles.resultNote}>
                    Lower payment, but no equity. Excess mileage and wear
                    charges may apply at return.
                  </p>
                </article>
              </Reveal>

              <Reveal delay={140}>
                <article className={`${styles.resultCard} ${styles.buyResult}`}>
                  {leaseCheaper && (
                    <span className={styles.deltaBadge}>
                      {formatCurrency(
                        comparison.buyMonthly - comparison.leaseMonthly,
                      )}{" "}
                      more per month
                    </span>
                  )}

                  <div className={styles.resultTop}>
                    <span className={styles.resultIcon}>
                      <Icon name="car" size={21} />
                    </span>
                    <span className={styles.resultTag}>Buy</span>
                  </div>

                  <p className={styles.resultLabel}>Estimated monthly</p>
                  <p className={styles.resultValue}>
                    {formatCurrency(comparison.buyMonthly)}
                    <span>/mo</span>
                  </p>

                  <dl className={styles.resultList}>
                    <div>
                      <dt>Cash due at signing</dt>
                      <dd>{formatCurrency(comparison.buyDown)}</dd>
                    </div>
                    <div>
                      <dt>Total cash over {years} years</dt>
                      <dd>{formatCurrency(comparison.buyCashOut)}</dd>
                    </div>
                    <div>
                      <dt>Estimated equity</dt>
                      <dd className={styles.equityValue}>
                        {formatCurrency(comparison.equity)}
                      </dd>
                    </div>
                  </dl>

                  <div className={styles.resultBar}>
                    <span
                      className={styles.buyBar}
                      style={{
                        width: `${(comparison.buyNetCost / maxTotal) * 100}%`,
                      }}
                    />
                  </div>

                  <p className={styles.resultNote}>
                    Higher payment, but you keep an asset. Net cost after
                    estimated resale: {formatCurrency(comparison.buyNetCost)}.
                  </p>
                </article>
              </Reveal>
            </div>

            <Reveal delay={100}>
              <div className={styles.compareSummary}>
                <div className={styles.summaryIcon}>
                  <Icon name="info" size={19} />
                </div>
                <p>
                  <strong>
                    {leaseCheaper ? "Leasing " : "Buying "}
                    is cheaper month to month in this scenario
                  </strong>{" "}
                  — but after equity, the picture can flip. Buying nets an
                  estimated {formatCurrency(comparison.equity)} in value after{" "}
                  {years} years, while the lease returns nothing at the end.
                </p>
              </div>
            </Reveal>

            <p className={styles.disclaimer}>
              Illustrative estimate only. Lease assumes a money factor of 0.0015
              and {formatCurrency(comparison.residual)} residual. Buy assumes a
              60-month loan at 6.8% APR. Taxes, fees and insurance are not
              included.
            </p>
          </div>
        </section>

        <section className={styles.duelSection}>
          <div className="container">
            <Reveal>
              <div className={styles.centerHead}>
                <span className={styles.kicker}>The honest version</span>
                <h2 className={styles.sectionTitle}>
                  What each one gives you.
                  <br />
                  And what it costs.
                </h2>
              </div>
            </Reveal>

            <div className={styles.duelGrid}>
              <Reveal>
                <article className={`${styles.duelPanel} ${styles.leasePanel}`}>
                  <div className={styles.panelHead}>
                    <span className={styles.panelIcon}>
                      <Icon name="key" size={24} />
                    </span>
                    <div>
                      <p className={styles.panelLabel}>Lease</p>
                      <h3 className={styles.panelTitle}>Rent the experience</h3>
                    </div>
                  </div>

                  <ul className={styles.panelList}>
                    {LEASE_PROS.map((item) => (
                      <li key={item} className={styles.proItem}>
                        <span className={styles.proIcon}>
                          <Icon name="check" size={13} strokeWidth={2.5} />
                        </span>
                        {item}
                      </li>
                    ))}
                    {LEASE_CONS.map((item) => (
                      <li key={item} className={styles.conItem}>
                        <span className={styles.conIcon}>–</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Link to="/finance" className={styles.panelLink}>
                    Explore lease payments
                    <Icon name="arrow-right" size={16} />
                  </Link>
                </article>
              </Reveal>

              <Reveal delay={100}>
                <article className={`${styles.duelPanel} ${styles.buyPanel}`}>
                  <div className={styles.panelHead}>
                    <span className={styles.panelIcon}>
                      <Icon name="car" size={24} />
                    </span>
                    <div>
                      <p className={styles.panelLabel}>Buy</p>
                      <h3 className={styles.panelTitle}>Own the asset</h3>
                    </div>
                  </div>

                  <ul className={styles.panelList}>
                    {BUY_PROS.map((item) => (
                      <li key={item} className={styles.proItem}>
                        <span className={styles.proIcon}>
                          <Icon name="check" size={13} strokeWidth={2.5} />
                        </span>
                        {item}
                      </li>
                    ))}
                    {BUY_CONS.map((item) => (
                      <li key={item} className={styles.conItem}>
                        <span className={styles.conIcon}>–</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Link to="/finance" className={styles.panelLink}>
                    Explore auto loans
                    <Icon name="arrow-right" size={16} />
                  </Link>
                </article>
              </Reveal>
            </div>
          </div>
        </section>

        <section className={styles.tableSection}>
          <div className="container">
            <Reveal>
              <div className={styles.centerHead}>
                <span className={styles.kicker}>Side by side</span>
                <h2 className={styles.sectionTitle}>The full comparison.</h2>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th scope="col">Feature</th>
                      <th scope="col">
                        <span className={styles.thLease}>
                          <Icon name="key" size={15} />
                          Lease
                        </span>
                      </th>
                      <th scope="col">
                        <span className={styles.thBuy}>
                          <Icon name="car" size={15} />
                          Buy
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON.map((row) => (
                      <tr key={row.feature}>
                        <th scope="row">{row.feature}</th>
                        <td
                          className={
                            row.winner === "lease" ? styles.winnerCell : ""
                          }
                        >
                          {row.winner === "lease" && (
                            <span className={styles.winnerDot} />
                          )}
                          {row.lease}
                        </td>
                        <td
                          className={
                            row.winner === "buy" ? styles.winnerCell : ""
                          }
                        >
                          {row.winner === "buy" && (
                            <span className={styles.winnerDot} />
                          )}
                          {row.buy}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </section>

        <section className={styles.quiz} id="quiz">
          <span className={styles.quizOrbOne} aria-hidden="true" />
          <span className={styles.quizOrbTwo} aria-hidden="true" />
          <div className="container">
            <Reveal>
              <div className={styles.quizHead}>
                <span className={styles.kickerLight}>60-second quiz</span>
                <h2 className={`${styles.sectionTitle} ${styles.lightTitle}`}>
                  Which one actually fits
                  <br />
                  the way you drive?
                </h2>
                <p className={styles.quizIntro}>
                  Three questions. No email, no credit check. Just a straight
                  answer based on your priorities.
                </p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className={styles.quizCard}>
                <div className={styles.quizProgress}>
                  <div className={styles.quizProgressTop}>
                    <span>
                      Question{" "}
                      {Math.min(answeredCount + 1, QUIZ_QUESTIONS.length)} of{" "}
                      {QUIZ_QUESTIONS.length}
                    </span>
                    <span>
                      {Math.round(
                        (answeredCount / QUIZ_QUESTIONS.length) * 100,
                      )}
                      %
                    </span>
                  </div>
                  <div className={styles.quizBar}>
                    <span
                      style={{
                        width: `${
                          (answeredCount / QUIZ_QUESTIONS.length) * 100
                        }%`,
                      }}
                    />
                  </div>
                </div>

                <div className={styles.questions}>
                  {QUIZ_QUESTIONS.map((question, questionIndex) => (
                    <div
                      key={question.question}
                      className={styles.questionBlock}
                    >
                      <h3 className={styles.questionTitle}>
                        <span>{questionIndex + 1}</span>
                        {question.question}
                      </h3>
                      <div className={styles.options}>
                        {question.options.map((option) => {
                          const isSelected =
                            answers[questionIndex] === option.score;

                          return (
                            <button
                              key={option.label}
                              type="button"
                              className={`${styles.option} ${
                                isSelected ? styles.optionActive : ""
                              }`}
                              onClick={() =>
                                handleAnswer(questionIndex, option.score)
                              }
                              aria-pressed={isSelected}
                            >
                              <span className={styles.optionDot} />
                              {option.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {quizResult && (
                  <div className={styles.quizResult}>
                    <span className={styles.quizResultIcon}>
                      <Icon name={quizResult.icon} size={26} />
                    </span>
                    <div className={styles.quizResultBody}>
                      <p className={styles.quizResultLabel}>
                        {quizResult.label}
                      </p>
                      <h3 className={styles.quizResultTitle}>
                        {quizResult.title}
                      </h3>
                      <p className={styles.quizResultText}>{quizResult.text}</p>
                      <div className={styles.quizResultActions}>
                        <Link
                          to={quizResult.primary.to}
                          className={styles.quizPrimary}
                        >
                          {quizResult.primary.label}
                          <Icon name="arrow-right" size={16} />
                        </Link>
                        <Link
                          to={quizResult.secondary.to}
                          className={styles.quizSecondary}
                        >
                          {quizResult.secondary.label}
                        </Link>
                        <button
                          type="button"
                          className={styles.quizReset}
                          onClick={() =>
                            setAnswers(QUIZ_QUESTIONS.map(() => null))
                          }
                        >
                          Start over
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </section>

        <section className={styles.myths}>
          <div className="container">
            <Reveal>
              <div className={styles.centerHead}>
                <span className={styles.kicker}>Myth busting</span>
                <h2 className={styles.sectionTitle}>
                  Four things people
                  <br />
                  get wrong.
                </h2>
              </div>
            </Reveal>

            <div className={styles.mythGrid}>
              {MYTHS.map((item, index) => (
                <Reveal key={item.myth} delay={index * 90}>
                  <article className={styles.mythCard}>
                    <div className={styles.mythTop}>
                      <span className={styles.mythLabel}>Myth</span>
                      <span className={styles.mythCross}>×</span>
                    </div>
                    <p className={styles.mythText}>{item.myth}</p>
                    <div className={styles.realityTop}>
                      <span className={styles.realityLabel}>Reality</span>
                      <Icon name="check" size={15} />
                    </div>
                    <p className={styles.realityText}>{item.reality}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.faq}>
          <div className="container">
            <Reveal>
              <div className={styles.centerHead}>
                <span className={styles.kicker}>Still deciding?</span>
                <h2 className={styles.sectionTitle}>
                  Lease and buy questions,
                  <br />
                  answered plainly.
                </h2>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <Accordion items={FAQ_ITEMS} />
            </Reveal>
          </div>
        </section>

        <CtaBanner
          eyebrow="Your call, informed"
          title="Drive the decision. Not the doubt."
          text="Run your own numbers, compare the trade-offs and talk to a specialist who has no reason to push you one way or the other."
          primary={{ label: "Talk to a specialist", to: "/contacts" }}
          secondary={{ label: "Browse inventory", to: "/catalog" }}
          variant="blue"
        />
      </Main>
      <Footer />
    </div>
  );
};

export default LeaseVsBuy;
