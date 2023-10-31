import { DUMMY_POSTS } from "@/DUMMY_DATA";
import AllPosts from "../components/posts/all-posts";

export default function Posts() {
  return (
    <div>
      <h1>All Posts</h1>
      <AllPosts posts={DUMMY_POSTS} />
    </div>
  )
}
