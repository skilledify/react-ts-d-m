import { useState } from "react";
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
  {
    id: 3,
    image: blog1,
    title: "Top 10 Car Maintenance Tips for Summer",
    link: "#",
  },
  {
    id: 4,
    image: blog2,
    title: "Electric Vehicles: Everything You Need to Know",
    link: "#",
  },
];

const Blog = () => {
  const [visibleCount, setVisibleCount] = useState<number>(2);

  const handleShowMore = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setVisibleCount((prevCount) => prevCount + 2);
  };

  const visiblePosts = BLOG_POSTS.slice(0, visibleCount);
  const hasMore = visibleCount < BLOG_POSTS.length;

  return (
    <section className={styles.blog}>
      <div className="container">
        <div className={styles.items}>
          {visiblePosts.map((post) => (
            <article key={post.id} className={styles.item}>
              <img
                src={post.image}
                alt={post.title}
                className={styles.itemImg}
              />
              <div className={styles.itemBottom}>
                <h4 className={styles.itemTitle}>
                  {post.title}
                </h4>
                <a href={post.link} className={styles.itemLink}>
                  more
                </a>
              </div>
            </article>
          ))}
        </div>

        {hasMore && (
          <a
            href="#"
            onClick={handleShowMore}
            className={styles.showmoreLink}
          >
            SHOW MORE
          </a>
        )}
      </div>
    </section>
  );
};

export default Blog;