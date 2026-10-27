import { useState } from "react";
import Icon from "../Icon/Icon";
import styles from "./Accordion.module.css";

export interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={styles.list}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={item.question}
            className={`${styles.item} ${isOpen ? styles.open : ""}`}
          >
            <button
              type="button"
              className={styles.question}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <span>{item.question}</span>
              <span className={styles.plus} aria-hidden="true">
                <Icon name="plus" size={18} />
              </span>
            </button>

            <div className={styles.answerWrap}>
              <div className={styles.answerInner}>
                <p className={styles.answer}>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
