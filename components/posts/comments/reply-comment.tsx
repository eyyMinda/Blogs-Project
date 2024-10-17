"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import EmojiPickerComp from "@/components/ui/custom-ui/emoji-picker";
import NotificationContext from "@/contexts/notification-context";
import defaultNotification from "@/lib/locale/default-notification";
import { UpdateCommentReply } from "@/lib/actions";
import { createNewCommentReply, formatReplyWithTag, validateReplyWithTag } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import { CommentTextarea } from "@/components/ui/custom-ui/comment-textarea";

interface newReplyProps {
  setReplyOpen: Dispatch<SetStateAction<boolean>>;
  replyDepth: boolean;
  authorUsername?: string;
  post_id: number;
  comment_id: string;
  setNewCommentPosted: Dispatch<SetStateAction<boolean>>;
}

export default function ReplyComment({ setReplyOpen, replyDepth, authorUsername, post_id, comment_id, setNewCommentPosted }: newReplyProps) {
  const { data: session } = useSession();
  const { setNotification } = useContext(NotificationContext);
  const commentBtnRef = useRef<HTMLButtonElement>(null);
  const textAreaDivRef = useRef<HTMLDivElement>(null);
  const commentAuthorTag = "@" + authorUsername;
  const [commentText, setCommentText] = useState<string>("");

  const handleCloseComment = () => {
    setReplyOpen(false);
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

    const cleanedComment = formatReplyWithTag(commentText, commentAuthorTag, replyDepth);
    const commentData = {
      comment: createNewCommentReply(post_id, comment_id, session?.user?.id, cleanedComment, authorUsername!),
      replyDepth
    };

    setNotification(defaultNotification.commentReply.pending);
    try {
      const res = await UpdateCommentReply(commentData);
      const { err, msg } = await res?.json();
      setNotification(defaultNotification.commentReply[err ? "error" : "success"](msg));
      if (!err) {
        handleCloseComment();
        setNewCommentPosted(true);
      }
    } catch (error) {
      console.log(error);
      setNotification(defaultNotification.commentReply.error(""));
    }
  };

  return (
    <div>
      <CommentTextarea placeholder="Add a reply..." textAreaDivRef={textAreaDivRef} commentText={commentText} handleTextAreaChange={handleTextAreaChange} />

      <hr className="my-2" />

      <div className="flex justify-between items-start mb-2 animate-accordion-down">
        <EmojiPickerComp setCommentText={setCommentText} />

        <div className="flex gap-2 justify-end">
          <Button variant="ghost" onClick={handleCloseComment} className="rounded-3xl">
            Cancel
          </Button>
          <Button
            variant="secondary"
            ref={commentBtnRef}
            disabled={!validateReplyWithTag(commentText, commentAuthorTag)}
            onClick={handleSubmitComment}
            className="rounded-3xl">
            Reply
          </Button>
        </div>
      </div>
    </div>
  );
}
