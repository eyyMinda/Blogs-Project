import { PostObject } from "@/app/_types/PostType";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import Image from "next/image";

const ShadItem: React.FC<PostObject> = ({ post }) => {
  const { title, image, date, excerpt, slug } = post;
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  const linkPath = `/posts/${slug}`;
  const imagePath = image ? `/images${linkPath}/${image}` : "/images/default-blog.jpg";

  return (
    <Card className="flex flex-col content-between">
      <CardHeader className="p-0">
        <Link href={linkPath}>
          <Image src={imagePath} width={300} height={200} alt={title} priority className="w-[100%] object-cover h-56" />
        </Link>
      </CardHeader>
      <CardContent className="text-center p-4">
        <CardTitle className="pb-2">{title}</CardTitle>
        <CardDescription className="text-md italic">
          <time>{formattedDate}</time>
        </CardDescription>
        <p>{excerpt}</p>
      </CardContent>
      <CardFooter className="p-3 pt-0 mt-auto">
        <Link href={linkPath} className="text-purple-600 hover:text-purple-700">
          Read More
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ShadItem;
