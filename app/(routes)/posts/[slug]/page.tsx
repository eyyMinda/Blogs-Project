import PostContent from "@/components/posts/post-detail/post-content";
import { getPostData } from "@/lib/posts-util";
import { kebabToCapitalized } from "@/lib/utils";
import { Metadata } from "next";

interface Props {
  params: { slug: string };
}
let excerpt: string;
let image: string;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: kebabToCapitalized(params.slug),
    description: excerpt,
    metadataBase: new URL("https://markdown-blogs.vercel.app/"),
    openGraph: {
      images: image
    }
  };
}

export default function Post({ params }: Props) {
  const postData = getPostData(params.slug);
  // for metadata
  excerpt = postData.excerpt;
  image = postData.image;

  return <PostContent postData={postData} />;
}
