import React, { useState } from "react";
import SectionTitle from "../../ui/SectionTitle/SectionTitle";
import Tabs from "../../ui/Tabs/Tabs";
import FavoriteButton from "../../ui/FavoriteButton/FavoriteButton";
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
  tag?: string;
  note?: string;
}

const carAndMinivan: Car[] = [
  {
    id: 1,
    img: car1,
    title: "Toyota Crown 2023",
    price: "$650/mo",
    tag: "Hybrid",
    note: "42 MPG · AWD",
  },
  {
    id: 2,
    img: car2,
    title: "Prius Prime 2023",
    price: "$450/mo",
    tag: "Plug-in",
    note: "55 MPG · FWD",
  },
  {
    id: 3,
    img: car3,
    title: "Toyota Prius 2023",
    price: "$400/mo",
    tag: "Hybrid",
    note: "57 MPG · FWD",
  },
  {
    id: 4,
    img: car4,
    title: "Hyundai Kona 2023",
    price: "$510/mo",
    tag: "Compact",
    note: "32 MPG · FWD",
  },
  {
    id: 5,
    img: car5,
    title: "Ford Explorer 2023",
    price: "$1,013/mo",
    tag: "3 rows",
    note: "24 MPG · AWD",
  },
  {
    id: 6,
    img: car6,
    title: "Santa Fe 2023",
    price: "$739/mo",
    tag: "SUV",
    note: "26 MPG · AWD",
  },
  {
    id: 7,
    img: car7,
    title: "KIA Niro 2023",
    price: "$554/mo",
    tag: "Hybrid",
    note: "49 MPG · FWD",
  },
  {
    id: 8,
    img: car8,
    title: "Chevrolet Silverado",
    price: "$1,032/mo",
    tag: "Truck",
    note: "20 MPG · 4WD",
  },
  {
    id: 9,
    img: car9,
    title: "Honda CR-V 2023",
    price: "$591/mo",
    tag: "SUV",
    note: "30 MPG · AWD",
  },
  {
    id: 10,
    img: car10,
    title: "Hyundai Tucson",
    price: "$528/mo",
    tag: "SUV",
    note: "29 MPG · AWD",
  },
  {
    id: 11,
    img: car11,
    title: "Chevrolet Equinox",
    price: "$471/mo",
    tag: "Best value",
    note: "28 MPG · FWD",
  },
  {
    id: 12,
    img: car12,
    title: "Jeep Wrangler 2023",
    price: "$997/mo",
    tag: "4x4",
    note: "23 MPG · 4WD",
  },
];

const trucks: Car[] = [
  {
    id: 101,
    img: car8,
    title: "Chevrolet Silverado 2023",
    price: "$1,032/mo",
    tag: "Crew cab",
    note: "6.2L V8 · 4WD",
  },
  {
    id: 102,
    img: car5,
    title: "Ford F-150 2023",
    price: "$1,104/mo",
    tag: "Best seller",
    note: "3.5L EcoBoost · 4WD",
  },
  {
    id: 103,
    img: car12,
    title: "Jeep Gladiator 2023",
    price: "$987/mo",
    tag: "Off-road",
    note: "3.6L V6 · 4WD",
  },
  {
    id: 104,
    img: car6,
    title: "RAM 1500 2023",
    price: "$1,089/mo",
    tag: "Comfort",
    note: "5.7L HEMI · 4WD",
  },
  {
    id: 105,
    img: car4,
    title: "Toyota Tundra 2023",
    price: "$1,021/mo",
    tag: "Hybrid",
    note: "i-FORCE MAX · 4WD",
  },
  {
    id: 106,
    img: car10,
    title: "GMC Sierra 2023",
    price: "$1,076/mo",
    tag: "Premium",
    note: "5.3L V8 · 4WD",
  },
  {
    id: 107,
    img: car2,
    title: "Nissan Frontier 2023",
    price: "$743/mo",
    tag: "Value",
    note: "3.8L V6 · 4WD",
  },
];

const crossovers: Car[] = [
  {
    id: 201,
    img: car5,
    title: "Ford Explorer 2023",
    price: "$1,013/mo",
    tag: "3 rows",
    note: "7 seats · AWD",
  },
  {
    id: 202,
    img: car9,
    title: "Honda CR-V 2023",
    price: "$591/mo",
    tag: "Family",
    note: "5 seats · AWD",
  },
  {
    id: 203,
    img: car10,
    title: "Hyundai Tucson 2023",
    price: "$528/mo",
    tag: "Best value",
    note: "5 seats · AWD",
  },
  {
    id: 204,
    img: car6,
    title: "Santa Fe 2023",
    price: "$739/mo",
    tag: "3 rows",
    note: "7 seats · AWD",
  },
  {
    id: 205,
    img: car11,
    title: "Chevrolet Equinox 2023",
    price: "$471/mo",
    tag: "Compact",
    note: "5 seats · FWD",
  },
  {
    id: 206,
    img: car7,
    title: "KIA Niro 2023",
    price: "$554/mo",
    tag: "Hybrid",
    note: "5 seats · FWD",
  },
  {
    id: 207,
    img: car12,
    title: "Jeep Wrangler 2023",
    price: "$997/mo",
    tag: "4x4",
    note: "4 seats · 4WD",
  },
  {
    id: 208,
    img: car1,
    title: "Toyota Crown 2023",
    price: "$650/mo",
    tag: "Hybrid",
    note: "5 seats · AWD",
  },
];

const electrified: Car[] = [
  {
    id: 301,
    img: car2,
    title: "Prius Prime 2023",
    price: "$450/mo",
    tag: "Plug-in",
    note: "44 mi EV range",
  },
  {
    id: 302,
    img: car3,
    title: "Toyota Prius 2023",
    price: "$400/mo",
    tag: "Hybrid",
    note: "57 MPG combined",
  },
  {
    id: 303,
    img: car4,
    title: "Kona Electric 2023",
    price: "$564/mo",
    tag: "EV",
    note: "258 mi range",
  },
  {
    id: 304,
    img: car7,
    title: "KIA Niro EV 2023",
    price: "$598/mo",
    tag: "EV",
    note: "253 mi range",
  },
  {
    id: 305,
    img: car1,
    title: "Toyota Crown Hybrid",
    price: "$650/mo",
    tag: "Hybrid",
    note: "42 MPG combined",
  },
  {
    id: 306,
    img: car9,
    title: "CR-V Hybrid 2023",
    price: "$634/mo",
    tag: "Hybrid",
    note: "43 MPG combined",
  },
  {
    id: 307,
    img: car10,
    title: "Tucson Hybrid 2023",
    price: "$589/mo",
    tag: "Hybrid",
    note: "38 MPG combined",
  },
  {
    id: 308,
    img: car6,
    title: "Santa Fe Hybrid 2023",
    price: "$782/mo",
    tag: "Hybrid",
    note: "34 MPG combined",
  },
];

const CarCard: React.FC<{ car: Car }> = ({ car }) => (
  <article className={styles.card}>
    <div className={styles.cardImg}>
      <img src={car.img} alt={car.title} loading="lazy" />
      {car.tag && <span className={styles.cardTag}>{car.tag}</span>}
      <FavoriteButton
        className={styles.cardFavorite}
        car={{
          id: `catalog-${car.id}`,
          title: car.title,
          price: car.price,
          image: car.img,
          meta: car.note,
          tag: car.tag,
          href: "/catalog",
        }}
      />
    </div>
    <h4 className={styles.cardTitle}>{car.title}</h4>
    {car.note && <p className={styles.cardNote}>{car.note}</p>}
    <p className={styles.cardPrice}>{car.price}</p>
    <a href="#" className={styles.cardLink}>
      See details
    </a>
  </article>
);

const CarGrid: React.FC<{ cars: Car[] }> = ({ cars }) => (
  <div className={styles.cards}>
    {cars.map((car) => (
      <CarCard key={car.id} car={car} />
    ))}
  </div>
);

const Choose: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState<number>(8);

  const visibleCars = carAndMinivan.slice(0, visibleCount);
  const hasMore = visibleCount < carAndMinivan.length;

  const handleShowMore = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setVisibleCount(carAndMinivan.length);
  };

  return (
    <section className={styles.choose}>
      <div className="container">
        <SectionTitle
          className="section-title"
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
            <CarGrid cars={visibleCars} />
            {hasMore && (
              <a
                href="#"
                onClick={handleShowMore}
                className={styles.showmoreLink}
              >
                SHOW MORE
              </a>
            )}
          </Tabs.Content>

          <Tabs.Content tabId="content-2">
            <CarGrid cars={trucks} />
          </Tabs.Content>

          <Tabs.Content tabId="content-3">
            <CarGrid cars={crossovers} />
          </Tabs.Content>

          <Tabs.Content tabId="content-4">
            <CarGrid cars={electrified} />
          </Tabs.Content>
        </Tabs>
      </div>
    </section>
  );
};

export default Choose;
