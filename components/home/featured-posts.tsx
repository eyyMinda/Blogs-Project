import PostsGrid from "../posts/posts-grid";
import { Posts } from "@/app/_types/PostType";

const FeaturedPosts: React.FC<Posts> = ({ posts }) => {
  return (
    <section className="w-[95%] max-w-7xl mx-auto my-8">
      <h1 className="three-d-title">Featured Posts</h1>

      <PostsGrid posts={posts} />
    </section>
  );
};
export default FeaturedPosts;
