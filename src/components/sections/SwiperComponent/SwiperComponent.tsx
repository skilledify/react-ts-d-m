
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

// Базовые стили библиотеки
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// Локальные CSS Modules
import styles from "./SwiperComponent.module.css";

import slide1 from "../../../assets/images/top-slide-img-1.jpg";
import slide2 from "../../../assets/images/top-slide-img-2.jpg";
import slide3 from "../../../assets/images/top-slide-img-3.jpg";
import slide4 from "../../../assets/images/top-slide-img-4.jpg";

interface SlideItem {
  id: number;
  src: string;
  alt: string;
}

const SLIDES: SlideItem[] = [
  { id: 1, src: slide1, alt: "Slide 1" },
  { id: 2, src: slide2, alt: "Slide 2" },
  { id: 3, src: slide3, alt: "Slide 3" },
  { id: 4, src: slide4, alt: "Slide 4" },
];

export const SwiperComponent: React.FC = () => {
  return (
    <Swiper
      modules={[Autoplay, Pagination, EffectFade]}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      effect="fade"
      className={styles.swiperContainer}
    >
      {SLIDES.map(({ id, src, alt }) => (
        <SwiperSlide key={id} className={styles.slide}>
          <img src={src} alt={alt} className={styles.slideImage} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperComponent;