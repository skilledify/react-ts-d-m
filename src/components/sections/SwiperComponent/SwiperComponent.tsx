import slide1 from "../../../assets/images/top-slide-img-1.jpg"
import slide2 from "../../../assets/images/top-slide-img-2.jpg"
import slide3 from "../../../assets/images/top-slide-img-3.jpg"
import slide4 from "../../../assets/images/top-slide-img-4.jpg"

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const SwiperComponent = () => {
  return (
    <Swiper
      modules={[Autoplay, Pagination, EffectFade]}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      effect="fade"
      className="swiper"
    >
      <SwiperSlide>
        <img src={slide1} alt="Slide 1" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={slide2} alt="Slide 2" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={slide3} alt="Slide 3" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={slide4} alt="Slide 4" />
      </SwiperSlide>
    </Swiper>
  );
};

export default SwiperComponent;
