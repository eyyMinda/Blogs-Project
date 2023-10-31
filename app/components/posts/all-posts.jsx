import PostsGrid from "./posts-grid";
import css from "./styles/all-posts.module.css";

export default function AllPosts({ posts }) {
  return (
    <section className={css.posts}>
      <h1>AllPosts</h1>
      <PostsGrid posts={posts} />
    </section>
  );
}
