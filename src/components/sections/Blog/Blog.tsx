import blog1 from "../../../assets/images/blog-1.jpg"
import blog2 from "../../../assets/images/blog-2.jpg"

const Blog = () => {
  return (
    <section className="blog">
      <div className="container">
        <div className="blog__items">
          <div className="blog__item">
            <img src={blog1} alt="blog 1" className="blog__item-img" />
            <div className="blog__item-bottom">
              <h4 className="blog__item-title item-title">
                An easier way to buy your next Toyota
              </h4>
              <a href="#" className="blog__item-link">
                more
              </a>
            </div>
          </div>
          <div className="blog__item">
            <img src={blog2} alt="blog 2" className="blog__item-img" />
            <div className="blog__item-bottom">
              <h4 className="blog__item-title item-title">
                A Guide to Road-Tripping With Pets
              </h4>
              <a href="#" className="blog__item-link">
                more
              </a>
            </div>
          </div>
        </div>
        <a href="#" className="showmore-link">
          SHOW MORE
        </a>
      </div>
    </section>
  );
}

export default Blog