import css from "./styles/featured-posts.module.css";
import PostsGrid from "../posts/posts-grid";
import { Posts } from "@/lib/interfaces";

const FeaturedPosts: React.FC<Posts> = ({ posts }) => {
  return (
    <section className={css.latest}>
      <h2>Featured Posts</h2>

      <PostsGrid posts={posts} />
    </section>
  );
};
export default FeaturedPosts;
