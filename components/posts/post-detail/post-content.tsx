import css from "./styles/post-content.module.css";
import PostHeader from "./posts-header";
import ReactMarkdown from "react-markdown";
import { customMDComponents } from "@/lib/markdown-components";
import { PostDataObject } from "@/app/_types/PostType";

const PostContent: React.FC<PostDataObject> = ({ postData }) => {
  const { image, slug, title, content } = postData;
  const imagePath = image
    ? `/images/posts/${slug}/${image}`
    : "/images/default-blog.jpg";

  return (
    <article className={css.content}>
      <PostHeader title={title} image={imagePath} />
      <ReactMarkdown components={customMDComponents}>{content}</ReactMarkdown>
    </article>
  );
};
export default PostContent;
