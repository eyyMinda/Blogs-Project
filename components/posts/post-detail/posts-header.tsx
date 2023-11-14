import Image from "next/image";
import { PostHeader } from "@/app/_types/PostType";

const PostHeader = ({ title, image }: PostHeader) => {
  return (
    <header className="flex-col-reverse sm:flex-row flex gap-4 justify-between items-center lg:items-end border-b-8 rounded-2xl border-title pb-8 mb-8">
      <h1 className="three-d-title text-4xl lg:text-5xl min-w-[15rem]">{title}</h1>
      <Image src={image} alt="title" width={200} height={150} className="min-w md:min-w-[20rem] max-h-40 object-cover" />
    </header>
  );
};
export default PostHeader;
