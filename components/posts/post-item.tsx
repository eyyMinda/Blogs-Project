import { PostObject } from "@/app/_types/PostType";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import Image from "next/image";

const PostItem: React.FC<PostObject> = ({ post }) => {
  const { title, image, date, excerpt, slug } = post;
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  const linkPath = `/posts/${slug}`;
  const imagePath = image ? `/images${linkPath}/${image}` : "/images/default-blog.webp";

  return (
    <li>
      <Card className="flex flex-col content-between">
        <CardHeader className="p-0">
          <Link href={linkPath}>
            <span className="sr-only">Read more</span>
            <Image src={imagePath} width={300} height={200} alt={title} priority className="w-[100%] object-cover h-48" />
          </Link>
        </CardHeader>
        <CardContent className="text-center p-[1rem_.5rem_.5rem]">
          <CardTitle className="pb-2">{title}</CardTitle>
          <CardDescription className="text-md italic">
            <time>{formattedDate}</time>
          </CardDescription>
          <p>{excerpt}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 mt-auto justify-center">
          <Link href={linkPath} className="text-purple-600 hover:text-purple-700">
            Read More
          </Link>
        </CardFooter>
      </Card>
    </li>
  );
};

export default PostItem;
