import PostContent from "#components/posts/post-detail/post-content";
import { getPostData } from "@/app/_lib/posts-util";

export default function Post({ params }) {
  const postData = getPostData(params.slug);

  return <PostContent data={postData} />;
}
