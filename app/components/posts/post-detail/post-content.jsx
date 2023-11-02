import css from "./styles/post-content.module.css";
import PostHeader from "./posts-header";
import ReactMarkdown from "react-markdown";
import { customMDComponents } from "@/app/_lib/markdown-components";

export default function PostContent({ data }) {
  const imagePath = data.image
    ? `/images/posts/${data.slug}/${data.image}`
    : "/images/default-blog.jpg";

  return (
    <article className={css.content}>
      <PostHeader title={data.title} image={imagePath} />
      <ReactMarkdown components={customMDComponents}>
        {data.content}
      </ReactMarkdown>
    </article>
  );
}
