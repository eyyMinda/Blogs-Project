import css from "./styles/post-item.module.css";
import Link from "next/link";
import Image from "next/image";

export default function PostItem({ post }) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const linkPath = `/posts/${post.slug}`;
  const imagePath = `/images${linkPath}/${post.image}`;

  return (
    <li className={css.post}>
      <Link href={linkPath}>
        <div className={css.image}>
          <Image src={imagePath} width={300} height={200} alt={post.title} />
        </div>
        <div className={css.content}>
          <h3>{post.title}</h3>
          <time>{formattedDate}</time>
          <p>{post.excerpt}</p>
        </div>
      </Link>
    </li>
  );
}
