import css from "./styles/post-header.module.css";
import Image from "next/image";

export default function PostHeader({ title, image }) {
  return (
    <header className={css.header}>
      <h1>{title}</h1>
      <Image src={image} alt="title" width={200} height={150} />
    </header>
  );
}
