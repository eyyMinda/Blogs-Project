import css from "./styles/post-header.module.css";
import Image from "next/image";
import { PostHeader } from "@/app/_types/PostType";

const PostHeader = ({ title, image }: PostHeader) => {
  return (
    <header className={css.header}>
      <h1>{title}</h1>
      <Image src={image} alt="title" width={200} height={150} />
    </header>
  );
};
export default PostHeader;
