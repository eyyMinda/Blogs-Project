import PostItem from "./post-item";
import { Posts } from "@/app/_types/PostType";

const PostsGrid: React.FC<Posts> = ({ posts }) => {
  return (
    <ul className="grid gap-7 my-8 content-center list-none grid-cols-auto">
      {posts?.map(post => (
        <PostItem key={post.slug} post={post} />
      ))}
    </ul>
  );
};
export default PostsGrid;
