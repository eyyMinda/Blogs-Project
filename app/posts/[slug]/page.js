import PostContent from "#components/posts/post-detail/post-content";
import { getSpecificPost } from "@/app/_lib/posts-util";

export default function Post({ params }) {
  const postData = getSpecificPost(params.slug);

  return <PostContent data={postData} />;
}
