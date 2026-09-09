import React, { useState } from "react";
import SectionTitle from "../../ui/SectionTitle/SectionTitle";
import Tabs from "../../ui/Tabs/Tabs";
import styles from "./Choose.module.css";

import car1 from "../../../assets/images/car-1.jpg";
import car2 from "../../../assets/images/car-2.jpg";
import car3 from "../../../assets/images/car-3.jpg";
import car4 from "../../../assets/images/car-4.jpg";
import car5 from "../../../assets/images/car-5.jpg";
import car6 from "../../../assets/images/car-6.jpg";
import car7 from "../../../assets/images/car-7.jpg";
import car8 from "../../../assets/images/car-8.jpg";
import car9 from "../../../assets/images/car-9.jpg";
import car10 from "../../../assets/images/car-10.jpg";
import car11 from "../../../assets/images/car-11.jpg";
import car12 from "../../../assets/images/car-12.jpg";

interface Car {
  id: number;
  img: string;
  title: string;
  price: string;
}

const carsData: Car[] = [
  { id: 1, img: car1, title: "Toyota Crown 2023", price: "$650/mo" },
  { id: 2, img: car2, title: "Prius Prime 2023", price: "$450/mo" },
  { id: 3, img: car3, title: "Toyota Prius 2023", price: "$400/mo" },
  { id: 4, img: car4, title: "Hyundai Kona 2023", price: "$510/mo" },
  { id: 5, img: car5, title: "Ford Explorer 2023", price: "$1,013/mo" },
  { id: 6, img: car6, title: "Santa Fe 2023", price: "$739/mo" },
  { id: 7, img: car7, title: "KIA Niro 2023", price: "$554/mo" },
  { id: 8, img: car8, title: "Chevrolet Silverado", price: "$1,032/mo" },
  { id: 9, img: car9, title: "Honda CR-V 2023", price: "$591/mo" },
  { id: 10, img: car10, title: "Hyundai Tucson", price: "$528/mo" },
  { id: 11, img: car11, title: "Chevrolet Equinox", price: "$471/mo" },
  { id: 12, img: car12, title: "Jeep Wrangler 2023", price: "$997/mo" },
];

const Choose: React.FC = () => {
  const [displayedCars, setDisplayedCars] = useState<Car[]>(carsData);
  
  // Флаг: показывались ли дополнительные карточки
  const [hasMoreLoaded, setHasMoreLoaded] = useState<boolean>(false);

  const handleShowMore = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // Создаем 12 новых карточек с уникальными id
    const moreCars = carsData.map((car) => ({
      ...car,
      id: car.id + displayedCars.length,
    }));

    // Добавляем новые карточки в состояние
    setDisplayedCars((prevCars) => [...prevCars, ...moreCars]);
    
    // Переключаем флаг, чтобы скрылась кнопка
    setHasMoreLoaded(true);
  };

  return (
    <section className={styles.choose}>
      <div className="container">
        <SectionTitle className="section-title"
          title="Choose your car"
          marginBottom="20px"
          align="center"
        />

        <Tabs>
          <Tabs.Button label="Car and Minivan" tabId="content-1" active />
          <Tabs.Button label="Trucks" tabId="content-2" />
          <Tabs.Button label="Crossovers & SUVs" tabId="content-3" />
          <Tabs.Button label="Electrified" tabId="content-4" />

          <Tabs.Content tabId="content-1">
            <div className={styles.cards}>
              {displayedCars.map((car) => (
                <div key={car.id} className={styles.card}>
                  <div className={styles.cardImg}>
                    <img src={car.img} alt={car.title} />
                  </div>
                  <h4 className={styles.cardTitle}>{car.title}</h4>
                  <p className={styles.cardPrice}>{car.price}</p>
                  <a href="#" className={styles.cardLink}>
                    See details
                  </a>
                </div>
              ))}
            </div>
          </Tabs.Content>

          <Tabs.Content tabId="content-2">Trucks content</Tabs.Content>
          <Tabs.Content tabId="content-3">Crossovers & SUVs content</Tabs.Content>
          <Tabs.Content tabId="content-4">Electrified content</Tabs.Content>
        </Tabs>

        {/* Отображаем кнопку только если карточки еще НЕ загружались */}
        {!hasMoreLoaded && (
          <a href="#" onClick={handleShowMore} className={styles.showmoreLink}>
            SHOW MORE
          </a>
        )}
      </div>
    </section>
  );
};

export default Choose;