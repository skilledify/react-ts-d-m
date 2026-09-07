import appStore from "../../assets/images/appstore.svg"
import googlePlay from "../../assets/images/googleplay.svg"
                                                                                                       

// Определение типов для данных меню
interface MenuItem {
  title: string;
  links: string[];
}

interface AppLink {
  src: string;
  alt: string;
}

// Данные для секций меню
const MENU_SECTIONS: MenuItem[] = [
  {
    title: "Products",
    links: ["Used", "New", "Sell your car"],
  },
  {
    title: "Resources",
    links: ["Blog", "FAQ", "Contact us"],
  },
  {
    title: "Work With TrueCar",
    links: ["Dealers", "Partners"],
  },
  {
    title: "About",
    links: ["About us", "Team", "Careers"],
  },
];

// Данные для ссылок на приложения
const APP_LINKS: AppLink[] = [
  { src: appStore, alt: "appstore" },
  { src: googlePlay, alt: "googleplay" },
];

// Данные для нижних правовых ссылок
const LEGAL_LINKS: string[] = [
  "Terms of Service",
  "Privacy Policy",
  "Do Not Sell My Personal Information",
];

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <nav className="footer__menu">
          {MENU_SECTIONS.map((section, index) => (
            <ul key={index} className="footer__menu-list">
              <li className="footer__menu-item">
                <p className="footer__menu-title">{section.title}</p>
              </li>
              {section.links.map((linkText, linkIndex) => (
                <li key={linkIndex} className="footer__menu-item">
                  <a href="#" className="footer__menu-link">
                    {linkText}
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </nav>

        <ul className="app">
          {APP_LINKS.map((app, index) => (
            <li key={index} className="app__item">
              <a href="#" className="app__item-link">
                <img className="app__item-img" src={app.src} alt={app.alt} />
              </a>
            </li>
          ))}
        </ul>

        <div className="footer__copy">
          <p className="footer__copy-text">
            For questions about the TrueCar Auto Buying Service please call 1-888-878-3227.
            Certified Dealers are contractually obligated by TrueCar to meet certain customer
            service requirements and complete the TrueCar Dealer Certification Program.
          </p>
          <p className="footer__copy-text">
            TrueCar does not broker, sell, or lease motor vehicles. Unless otherwise noted,
            all vehicles shown on this website are offered for sale by licensed motor vehicle dealers.
            All vehicles are subject to prior sale. By accessing this website, you agree to the TrueCar
            Terms of Service and Privacy Policy.
          </p>
        </div>

        <nav className="copy__nav">
          <ul className="copy__nav-list">
            {LEGAL_LINKS.map((linkText, index) => (
              <li key={index} className="copy__nav-item">
                <a href="#" className="copy__nav-link">
                  {linkText}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
