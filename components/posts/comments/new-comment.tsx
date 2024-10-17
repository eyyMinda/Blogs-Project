"use client";
import { Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { CommentTextarea } from "@/components/ui/custom-ui/comment-textarea";
import EmojiPickerComp from "@/components/ui/custom-ui/emoji-picker";
import { PostComment } from "@/lib/actions";
import { createNewComment } from "@/lib/utils";
import NotificationContext from "@/contexts/notification-context";
import defaultNotification from "@/lib/locale/default-notification";

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

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setCommentText(value);
    // Setting text value for textarea:after which is invisible to auto resize based on content
    if (textAreaDivRef.current) textAreaDivRef.current.dataset["clonedVal"] = value;
  };

  const handleSubmitComment = async () => {
    if (!session?.user) return;
    console.log(session.user);
    const commentData = createNewComment(post_id, session?.user?.id, commentText);

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
      <CommentTextarea
        placeholder="Add a comment..."
        textAreaDivRef={textAreaDivRef}
        commentText={commentText}
        handleTextAreaChange={handleTextAreaChange}
        handleFocus={handleFocus}
      />

      <hr className="my-4" />

      {commentOpen && (
        <div className="flex justify-between items-center mb-4 animate-accordion-down">
          <EmojiPickerComp setCommentText={setCommentText} />

          <div className="flex gap-2 justify-end">
            <Button variant="ghost" onClick={handleCloseComment} className="rounded-3xl">
              Cancel
            </Button>
            <Button variant="secondary" ref={commentBtnRef} disabled={!commentText} onClick={handleSubmitComment} className="rounded-3xl">
              Comment
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
