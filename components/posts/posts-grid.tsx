import css from "./styles/posts-grid.module.css";
import PostItem from "./post-item";
import { Posts } from "@/app/_types/PostType";

const PostsGrid: React.FC<Posts> = ({ posts }) => {
  return (
    <ul className={css.grid}>
      {posts?.map(post => (
        <PostItem key={post.slug} post={post} />
      ))}
    </ul>
  );
};
export default PostsGrid;
