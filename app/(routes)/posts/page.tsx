import AllPosts from "@/components/posts/all-posts";
import { getAllPosts } from "@/lib/posts-util";

async function fetchAllPosts() {
  // Prerendering
  return getAllPosts(); // function that reads files from a dir
}

export default async function Posts() {
  const posts = await fetchAllPosts();

  return <AllPosts posts={posts} />;
}
