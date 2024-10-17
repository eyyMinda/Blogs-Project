import { Dispatch, RefObject, SetStateAction, useRef } from "react";
import { Textarea } from "../textarea";

interface CommentTextareaProps {
  commentText?: string;
  setCommentText: Dispatch<SetStateAction<string>>;
  placeholder: string;
  [key: string]: any; // To allow any other props
}

export function CommentTextarea({ commentText = "", setCommentText, placeholder = "Add a comment...", props }: CommentTextareaProps) {
  const textAreaDivRef = useRef<HTMLDivElement>(null);
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setCommentText(value);
    // Setting text value for textarea:after which is invisible to auto resize based on content
    if (textAreaDivRef.current) textAreaDivRef.current.dataset["clonedVal"] = value;
  };

  return (
    <div
      ref={textAreaDivRef}
      className="grid text-sm after:px-3.5 after:py-2.5 [&>textarea]:text-inherit
                  after:text-inherit [&>textarea]:resize-none
                  [&>textarea]:overflow-hidden [&>textarea]:[grid-area:1/1/2/2]
                  after:[grid-area:1/1/2/2] after:whitespace-pre-wrap
                  after:invisible after:border
                  after:content-[attr(data-cloned-val)_'_']">
      <Textarea placeholder={placeholder} value={commentText} onChange={handleTextAreaChange} {...props} rows={1} className="min-h-10" />
    </div>
  );
}
