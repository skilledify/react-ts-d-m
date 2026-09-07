import SectionTitle from "../../ui/SectionTitle/SectionTitle"

import Tabs from "../../ui/Tabs/Tabs";

import car1 from "../../../assets/images/car-1.jpg"
import car2 from "../../../assets/images/car-2.jpg"
import car3 from "../../../assets/images/car-3.jpg"
import car4 from "../../../assets/images/car-4.jpg"
import car5 from "../../../assets/images/car-5.jpg"
import car6 from "../../../assets/images/car-6.jpg"
import car7 from "../../../assets/images/car-7.jpg"
import car8 from "../../../assets/images/car-8.jpg"
import car9 from "../../../assets/images/car-9.jpg"
import car10 from "../../../assets/images/car-10.jpg"
import car11 from "../../../assets/images/car-11.jpg"
import car12 from "../../../assets/images/car-12.jpg"

// const Choose = () => {
//   return (
//     <section className="choose">
//       <div className="container">
//         <SectionTitle title="Choose your car" align="center" />
//          <div className="tabs">
//           <div className="tabs__btn">
//             <button
//               className="tabs__btn-item tabs__btn-item--active"
//               data-button="content-1"
//             >
//               Car and Minivan
//             </button>
//             <button className="tabs__btn-item" data-button="content-2">
//               Trucks
//             </button>
//             <button className="tabs__btn-item" data-button="content-3">
//               Crossovers & SUVs
//             </button>
//             <button className="tabs__btn-item" data-button="content-4">
//               Electrified
//             </button>
//           </div>
//           <div className="tabs__content">
//             <div
//               className="tabs__content-item tabs__content-item--active"
//               id="content-1"
//             >
//               <div className="card">
//                 <div className="card__img">
//                   <img src={car1} alt=" car 1" className="card__img" />
//                 </div>
//                 <h4 className="card__title">Toyota Crown 2023</h4>
//                 <p className="card__text">starting from $ 39900</p>
//                 <p className="card__price">$ 650/mo</p>
//                 <a href="#" className="card__link">
//                   see details
//                 </a>
//               </div>
//               <div className="card">
//                 <div className="card__img">
//                   <img src={car2} alt="car 2" className="card__img" />
//                 </div>
//                 <h4 className="card__title">Prius Prime 2023</h4>
//                 <p className="card__text">starting from $ 39900</p>
//                 <p className="card__price"> $ 450/mo</p>
//                 <a href="#" className="card__link">
//                   see details
//                 </a>
//               </div>
//               <div className="card">
//                 <div className="card__img">
//                   <img src={car3} alt=" car 3" className="card__img" />
//                 </div>
//                 <h4 className="card__title">Toyota Prius 2023</h4>
//                 <p className="card__text">starting from $ 39900</p>
//                 <p className="card__price"> $ 400/mo</p>
//                 <a href="#" className="card__link">
//                   see details
//                 </a>
//               </div>
//               <div className="card">
//                 <div className="card__img">
//                   <img src={car4} alt=" car 4" className="card__img" />
//                 </div>
//                 <h4 className="card__title">Hyundai Kona 2023</h4>
//                 <p className="card__text">starting from $ 39900</p>
//                 <p className="card__price">$510/mo</p>
//                 <a href="#" className="card__link">
//                   see details
//                 </a>
//               </div>

//               <div className="card">
//                 <div className="card__img">
//                   <img src={car5} alt=" car 5" className="card__img" />
//                 </div>
//                 <h4 className="card__title">Ford Explorer 2023</h4>
//                 <p className="card__text">starting from $ 39900</p>
//                 <p className="card__price">$1,013/mo</p>
//                 <a href="#" className="card__link">
//                   see details
//                 </a>
//               </div>
//               <div className="card">
//                 <div className="card__img">
//                   <img src={car6} alt=" car 6" className="card__img" />
//                 </div>
//                 <h4 className="card__title">Santa Fe 2023</h4>
//                 <p className="card__text">starting from $ 39900</p>
//                 <p className="card__price"> $739/mo</p>
//                 <a href="#" className="card__link">
//                   see details
//                 </a>
//               </div>
//               <div className="card">
//                 <div className="card__img">
//                   <img src={car7} alt=" car 7" className="card__img" />
//                 </div>
//                 <h4 className="card__title">KIA Niro 2023</h4>
//                 <p className="card__text">starting from $ 39900</p>
//                 <p className="card__price"> $554/mo</p>
//                 <a href="#" className="card__link">
//                   see details
//                 </a>
//               </div>
//               <div className="card">
//                 <div className="card__img">
//                   <img src={car8} alt=" car 8" className="card__img" />
//                 </div>
//                 <h4 className="card__title">Chevrolet Silverado</h4>
//                 <p className="card__text">starting from $ 39900</p>
//                 <p className="card__price">$1,032/mo</p>
//                 <a href="#" className="card__link">
//                   see details
//                 </a>
//               </div>

//               <div className="card">
//                 <div className="card__img">
//                   <img src={car9} alt=" car 9" className="card__img" />
//                 </div>
//                 <h4 className="card__title">Honda CR-V 2023</h4>
//                 <p className="card__text">starting from $ 39900</p>
//                 <p className="card__price">$591/mo</p>
//                 <a href="#" className="card__link">
//                   see details
//                 </a>
//               </div>
//               <div className="card">
//                 <div className="card__img">
//                   <img src={car10} alt=" car 10" className="card__img" />
//                 </div>
//                 <h4 className="card__title">Hyundai Tucson</h4>
//                 <p className="card__text">starting from $ 39900</p>
//                 <p className="card__price"> $528/mo</p>
//                 <a href="#" className="card__link">
//                   see details
//                 </a>
//               </div>
//               <div className="card">
//                 <div className="card__img">
//                   <img src={car11} alt=" car 11" className="card__img" />
//                 </div>
//                 <h4 className="card__title">Chevrolet Equinox </h4>
//                 <p className="card__text">starting from $ 39900</p>
//                 <p className="card__price"> $471/mo</p>
//                 <a href="#" className="card__link">
//                   see details
//                 </a>
//               </div>
//               <div className="card">
//                 <div className="card__img">
//                   <img src={car12} alt=" car 12" className="card__img" />
//                 </div>
//                 <h4 className="card__title">Jeep Wrangler 2023</h4>
//                 <p className="card__text">starting from $ 39900</p>
//                 <p className="card__price">$997/mo</p>
//                 <a href="#" className="card__link">
//                   see details
//                 </a>
//               </div>
//             </div>
//             <div className="tabs__content-item" id="content-2">
//               2
//             </div>
//             <div className="tabs__content-item" id="content-3">
//               3
//             </div>
//             <div className="tabs__content-item" id="content-4">
//               4
//             </div>
//           </div>
//         </div> 


//         <a href="#" className="showmore-link">
//           SHOW MORE
//         </a>
//       </div>
//     </section>
//   );
// }

// export default Choose




const carsData = [
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

const Choose = () => {
  return (
    <section className="choose">
      <div className="container">
        <SectionTitle title="Choose your car" marginBottom="20px" align="center" />
        <Tabs>
          <Tabs.Button label="Car and Minivan" tabId="content-1" active />
          <Tabs.Button label="Trucks" tabId="content-2" />
          <Tabs.Button label="Crossovers & SUVs" tabId="content-3" />
          <Tabs.Button label="Electrified" tabId="content-4" />

          <Tabs.Content tabId="content-1">
            <div className="cards">
              {carsData.map((car) => (
                <div key={car.id} className="card">
                  <div className="card__img">
                    <img src={car.img} alt={car.title} className="card__img" />
                  </div>
                  <h4 className="card__title">{car.title}</h4>
                  <p className="card__price">{car.price}</p>
                  <a href="#" className="card__link">
                    See details
                  </a>
                </div>
              ))}
            </div>
          </Tabs.Content>

          <Tabs.Content tabId="content-2">Trucks content</Tabs.Content>
          <Tabs.Content tabId="content-3">
            Crossovers & SUVs content
          </Tabs.Content>
          <Tabs.Content tabId="content-4">Electrified content</Tabs.Content>
        </Tabs>
        <a href="#" className="showmore-link">
          SHOW MORE
        </a>
      </div>
    </section>
  );
};

export default Choose;
