import PostContent from "@/components/posts/post-detail/post-content";
import { getPostData } from "@/lib/posts-util";

export default function Post({ params }: { params: { slug: string } }) {
  const postData = getPostData(params.slug);

  return <PostContent postData={postData} />;
}
