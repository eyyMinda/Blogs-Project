import css from "./styles/post-content.module.css";
import PostHeader from "./posts-header";
import ReactMarkdown from "react-markdown";

const DUMMY_POST = {
  slug: "getting-started-with-nextjs",
  title: "Getting Started with NextJS",
  image: "getting-started-nextjs.png",
  excerpt:
    "NextJS is the React framework for production it makes building fullstack React apps and sites a breeze and ships with in-built SSR.",
  date: "2022-02-10",
  content: "# This is a first post",
};

export default function PostContent() {
  const imagePath = `/images/posts/${DUMMY_POST.slug}/${DUMMY_POST.image}`;
  return (
    <article className={css.content}>
      <PostHeader title={DUMMY_POST.title} image={imagePath} />
      <ReactMarkdown>{DUMMY_POST.content}</ReactMarkdown>
    </article>
  );
}
