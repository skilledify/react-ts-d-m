// import "./SectionTitle.css";

// const SectionTitle = ({ title, marginBottom, align }) => {
//   return (
//     <h2
//       className="section-title"
//       style={{
//         marginBottom: marginBottom || "0px",
//         textAlign: align || "left",
//       }}
//     >
//       {title}
//     </h2>
//   );
// };

// export default SectionTitle;
import React from 'react';

// 1. Описываем интерфейс пропсов компонента
interface SectionTitleProps {
  title: string;
  align?: 'left' | 'center' | 'right';
  marginBottom?: string;
  className?: string; // <-- Добавляем опциональный className
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  align = 'left',
  marginBottom,
  className = '',
}) => {
  return (
    <h2
      className={className}
      style={{
        textAlign: align,
        marginBottom: marginBottom,
      }}
    >
      {title}
    </h2>
  );
};

export default SectionTitle;