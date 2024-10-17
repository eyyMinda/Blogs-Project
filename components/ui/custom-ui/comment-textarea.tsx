import { ChangeEventHandler, RefObject } from "react";
import { Textarea } from "../textarea";

interface CommentTextareaProps {
  textAreaDivRef: RefObject<HTMLDivElement>;
  commentText: string;
  handleTextAreaChange: ChangeEventHandler<HTMLTextAreaElement>;
  placeholder: string;
  [key: string]: any; // To allow any other props
}

export function CommentTextarea({ textAreaDivRef, commentText, handleTextAreaChange, placeholder = "Add a comment...", props }: CommentTextareaProps) {
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
