import React from "react";
import SectionTitle from "../../ui/SectionTitle/SectionTitle";
import styles from "./Video.module.css";

const Video: React.FC = () => {
  return (
    <section className={styles.video}>
      <div className="container">
        <SectionTitle className="section-title"
          title="WELCOME TO D&M LEASING" 
          marginBottom="20px" 
          align="center" 
        />
        <p className={`${styles.text} item-title`}>
          Find out how easy it is to lease from D&M
        </p>
        
        <div className={styles.wrapper}>
          <iframe
            className={styles.content}
            src="https://www.youtube.com/embed/dQrGGHM8xRo?controls=0"
            title="D&M Leasing introductory video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
};

export default Video;