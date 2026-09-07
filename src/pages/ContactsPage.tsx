import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"
import Main from "../components/Main/Main"
import Blog from "../components/sections/Blog/Blog"
import ContactUs from "../components/sections/ContactUs/ContactUs"


const Contacts = () => {
  return (
    <div className="wrapper">

      <Header/>
        <Main>
          <ContactUs/>
          <Blog/>
        </Main>
        <Footer/>
    </div>
  )
}

export default Contacts