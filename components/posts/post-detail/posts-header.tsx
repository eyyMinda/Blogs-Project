import Image from "next/image";
import { PostHeaderType } from "@/app/_types/PostType";

const PostHeader = ({ title, image, date }: PostHeaderType) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  return (
    <header className="flex-col-reverse sm:flex-row flex gap-4 justify-between items-center lg:items-end border-b-8 rounded-2xl border-gray-400 pb-8 mb-8">
      <div>
        <time dateTime={new Date(date).toISOString()} className="block text-md text-muted-foreground">
          Published on {formattedDate}
        </time>
        <h1 className="text-start three-d-title text-4xl lg:text-5xl min-w-[15rem] mt-2">{title}</h1>
      </div>
      <Image src={image} alt="title" width={200} height={150} className="md:min-w-[20rem] max-h-40 object-cover" />
    </header>
  );
};
export default PostHeader;
