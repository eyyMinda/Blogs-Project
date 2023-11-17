import PostHeader from "./posts-header";
import ReactMarkdown from "react-markdown";
import { customMDComponents } from "@/lib/markdown-components";
import { PostDataObject } from "@/app/_types/PostType";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const PostContent: React.FC<PostDataObject> = ({ postData }) => {
  const { image, slug, title, content } = postData;
  const imagePath = image ? `/images/posts/${slug}/${image}` : "/images/default-blog.webp";

  return (
    <Card className="border-2 my-12">
      <CardHeader>
        <PostHeader title={title} image={imagePath} />
      </CardHeader>
      <CardContent className="markdown-content text-xl md:px-8 max-w-5xl">
        <ReactMarkdown components={customMDComponents}>{content}</ReactMarkdown>
      </CardContent>
    </Card>
  );
};
export default PostContent;
