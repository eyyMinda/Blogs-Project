import { Posts } from "@/lib/interfaces";
import PostsGrid from "./posts-grid";
import css from "./styles/all-posts.module.css";

const AllPosts: React.FC<Posts> = ({ posts }) => {
  return (
    <section className={css.posts}>
      <h1>AllPosts</h1>
      <PostsGrid posts={posts} />
    </section>
  );
};
export default AllPosts;
