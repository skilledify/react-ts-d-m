import blog1 from "../../../assets/images/blog-1.jpg";
import blog2 from "../../../assets/images/blog-2.jpg";
import styles from "./Blog.module.css";

interface BlogPost {
  id: number;
  image: string;
  title: string;
  link: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    image: blog1,
    title: "An easier way to buy your next Toyota",
    link: "#",
  },
  {
    id: 2,
    image: blog2,
    title: "A Guide to Road-Tripping With Pets",
    link: "#",
  },
];

const Blog = () => {
  return (
    <section className={styles.blog}>
      {/* Предполагается, что container глобальный class. Если он тоже из модуля, используйте styles.container */}
      <div className="container">
        <div className={styles.items}>
          {BLOG_POSTS.map((post) => (
            <article key={post.id} className={styles.item}>
              <img
                src={post.image}
                alt={post.title}
                className={styles.itemImg}
              />
              <div className={styles.itemBottom}>
                <h4 className={`${styles.itemTitle} item-title`}>
                  {post.title}
                </h4>
                <a href={post.link} className={styles.itemLink}>
                  more
                </a>
              </div>
            </article>
          ))}
        </div>
        <a href="#" className={styles.showmoreLink}>
          SHOW MORE
        </a>
      </div>
    </section>
  );
};

export default Blog;