import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import Footer from "../components/Footer/Footer";
import Top from "../components/sections/Top/Top"
import WhyLease from "../components/sections/WhyLease/WhyLease"
import HowDoes from "../components/sections/HowDoes/HowDoes";
import Video from "../components/sections/Video/Video"
import Important from "../components/sections/Important/Important"
import SwiperComponent from "../components/sections/SwiperComponent/SwiperComponent";



const Home = () => {
  return (
    <div className="wrapper">
      <Header />
      <Main>

           <Top/>
          <SwiperComponent/> 
          <WhyLease/>
          <HowDoes />
          <Video/>
          <Important/> 
      </Main>
      <Footer />
    </div>
  );
};

export default Home;
