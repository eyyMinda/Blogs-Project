import { Card, CardContent } from "@/components/ui/card";
import { customMDComponents } from "@/lib/markdown-components";
import { getPostData } from "@/lib/posts-util";
import ReactMarkdown from "react-markdown";

export default async function Terms() {
  const terms = getPostData("terms-of-service", "/");
  const currentDate = new Date().toLocaleString("en-US", { year: "numeric", month: "long" });
  const content = terms.content.replace(/\[\[Date\]\]/g, currentDate);

  return (
    <Card className="border-2 my-6">
      <CardContent className="markdown-content text-lg md:px-8 max-w-5xl">
        <ReactMarkdown components={customMDComponents}>{content}</ReactMarkdown>
      </CardContent>
    </Card>
  );
}
