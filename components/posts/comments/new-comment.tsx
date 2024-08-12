"use client";
import { Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PostComment } from "@/lib/actions";
import { createNewComment } from "@/lib/utils";
import NotificationContext from "@/contexts/notification-context";
import defaultNotification from "@/lib/locale/default-notification";
import { useSession } from "next-auth/react";
import EmojiPickerComp from "@/components/ui/custom-ui/emoji-picker";

interface NewCommentParams {
  setNewCommentPosted: Dispatch<SetStateAction<boolean>>;
  post_id: number;
}

export default function NewComment({ setNewCommentPosted, post_id }: NewCommentParams) {
  const { data: session } = useSession();
  const { setNotification } = useContext(NotificationContext);
  const commentBtnRef = useRef<HTMLButtonElement>(null);
  const textAreaDivRef = useRef<HTMLDivElement>(null);
  const [commentText, setCommentText] = useState<string>("");
  const [commentOpen, setCommentOpen] = useState<boolean>(false);

  const handleFocus = () => setCommentOpen(true);
  const handleCloseComment = () => {
    setCommentOpen(false);
    setCommentText("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setCommentText(value);
    // Setting text value for textarea:after which is invisible to auto resize based on content
    if (textAreaDivRef.current) textAreaDivRef.current.dataset["clonedVal"] = value;
  };

  const handleSubmitComment = async () => {
    if (!session?.user) return;
    const commentData = createNewComment(post_id, session?.user?.name as string, session?.user?.email as string, commentText);

    setNotification(defaultNotification.comment.pending);
    try {
      const res = await PostComment(commentData);
      const { err, msg } = await res?.json();
      setNotification(defaultNotification.comment[err ? "error" : "success"](msg));
      if (!err) {
        setCommentText("");
        setNewCommentPosted(true);
      }
    } catch (error) {
      console.log(error);
      setNotification(defaultNotification.comment.error(""));
    }
  };

  return (
    <div>
      <div
        ref={textAreaDivRef}
        className="grid text-sm after:px-3.5 after:py-2.5 [&>textarea]:text-inherit
                  after:text-inherit [&>textarea]:resize-none
                  [&>textarea]:overflow-hidden [&>textarea]:[grid-area:1/1/2/2]
                  after:[grid-area:1/1/2/2] after:whitespace-pre-wrap
                  after:invisible after:border
                  after:content-[attr(data-cloned-val)_'_']">
        <Textarea placeholder="Add a comment..." value={commentText} onChange={handleChange} onFocus={handleFocus} rows={1} className="min-h-10" />
      </div>

      <hr className="my-4" />

      {commentOpen && (
        <div className="flex justify-between items-center mb-4 animate-accordion-down">
          <EmojiPickerComp setCommentText={setCommentText} />

          <div className="flex gap-2 justify-end">
            <Button variant="ghost" onClick={handleCloseComment}>
              Cancel
            </Button>
            <Button variant="secondary" ref={commentBtnRef} disabled={!commentText} onClick={handleSubmitComment}>
              Comment
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
