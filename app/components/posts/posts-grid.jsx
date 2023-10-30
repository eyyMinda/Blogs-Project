import css from "./styles/posts-grid.module.css";
import PostItem from "./post-item";

export default function PostsGrid({ posts }) {
  return (
    <ul className={css.grid}>
      {posts?.map(post => (
        <PostItem key={post.id} post={post} />
      ))}
    </ul>
  );
}
