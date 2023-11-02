import css from "./styles/post-item.module.css";
import Link from "next/link";
import Image from "next/image";

export default function PostItem({ post }) {
  const { title, image, date, excerpt, slug } = post;
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const linkPath = `/posts/${slug}`;
  const imagePath = image
    ? `/images${linkPath}/${image}`
    : "/images/default-blog.jpg";

  return (
    <li className={css.post}>
      <Link href={linkPath}>
        <div className={css.image}>
          <Image src={imagePath} width={300} height={200} alt={title} />
        </div>
        <div className={css.content}>
          <h3>{title}</h3>
          <time>{formattedDate}</time>
          <p>{excerpt}</p>
        </div>
      </Link>
    </li>
  );
}
