import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import Main from "../components/Main/Main"
import Choose from "../components/sections/Choose/Choose"
import Blog from "../components/sections/Blog/Blog"


const Catalog = () => {
  return (
    <div className="wrapper">
      <Header />
        <Main>
          <Choose />   
          <Blog/>
        </Main>
       <Footer />
    </div>
  )
}

export default Catalog