import css from "./styles/post-content.module.css";
import PostHeader from "./posts-header";
import ReactMarkdown from "react-markdown";

export default function PostContent({ data }) {
  const imagePath = data.image
    ? `/images/posts/${data.slug}/${data.image}`
    : "/images/default-blog.jpg";
  return (
    <article className={css.content}>
      <PostHeader title={data.title} image={imagePath} />
      <ReactMarkdown>{data.content}</ReactMarkdown>
    </article>
  );
}
