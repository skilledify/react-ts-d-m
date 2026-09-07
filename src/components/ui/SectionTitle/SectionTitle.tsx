import "./SectionTitle.css";

const SectionTitle = ({ title, marginBottom, align }) => {
  return (
    <h2
      className="section-title"
      style={{
        marginBottom: marginBottom || "0px",
        textAlign: align || "left",
      }}
    >
      {title}
    </h2>
  );
};

export default SectionTitle;