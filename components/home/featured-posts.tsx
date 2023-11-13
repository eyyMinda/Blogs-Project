import css from "./styles/featured-posts.module.css";
import PostsGrid from "../posts/posts-grid";
import { Posts } from "@/app/_types/PostType";

const FeaturedPosts: React.FC<Posts> = ({ posts }) => {
  return (
    <section className={css.latest}>
      <h1>Featured Posts</h1>

      <PostsGrid posts={posts} />
    </section>
  );
};
export default FeaturedPosts;
