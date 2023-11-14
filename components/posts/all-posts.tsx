import { Posts } from "@/app/_types/PostType";
import PostsGrid from "./posts-grid";

const AllPosts: React.FC<Posts> = ({ posts }) => {
  return (
    <section className="w-[95%] max-w-7xl mx-auto my-8">
      <h1 className="three-d-title">All Posts</h1>
      <PostsGrid posts={posts} />
    </section>
  );
};
export default AllPosts;
