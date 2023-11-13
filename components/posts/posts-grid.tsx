import css from "./styles/posts-grid.module.css";
import PostItem from "./post-item";
import ShadItem from "./shad-item";
import { Posts } from "@/app/_types/PostType";

const PostsGrid: React.FC<Posts> = ({ posts }) => {
  return (
    //   <div className="grid grid-cols-3 gap-8"></div>
    <ul className={css.grid}>
      {posts?.map(post => (
        <ShadItem key={post.slug} post={post} />
      ))}
    </ul>
  );
};
export default PostsGrid;
