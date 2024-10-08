"use client";

import { Button } from "@/components/ui/button";
import EmojiPickerComp from "@/components/ui/custom-ui/emoji-picker";
import { Textarea } from "@/components/ui/textarea";
import NotificationContext from "@/contexts/notification-context";
import { UpdateCommentReply } from "@/lib/actions";
import defaultNotification from "@/lib/locale/default-notification";
import { createNewCommentReply } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useContext, useRef, useState } from "react";

export default function ReplyComment({
  setReplyOpen,
  replyDepth,
  authorUsername,
  post_id,
  comment_id,
  setNewCommentPosted
}: {
  setReplyOpen: Dispatch<SetStateAction<boolean>>;
  replyDepth: boolean;
  authorUsername?: string;
  post_id: number;
  comment_id: string;
  setNewCommentPosted: Dispatch<SetStateAction<boolean>>;
}) {
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
    const commentData = {
      comment: createNewCommentReply(
        post_id,
        comment_id,
        session?.user?.name as string,
        session?.user?.email as string,
        replyDepth ? commentAuthorTag + " " + commentText : commentText,
        authorUsername!
      ),
      replyDepth
    };

    //TODO: Added @AuthorUsername based on if reply is to another reply or not (replyDepth true or false)

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
      <div
        ref={textAreaDivRef}
        className="grid text-sm after:px-3.5 after:py-2.5 [&>textarea]:text-inherit
                  after:text-inherit [&>textarea]:resize-none
                  [&>textarea]:overflow-hidden [&>textarea]:[grid-area:1/1/2/2]
                  after:[grid-area:1/1/2/2] after:whitespace-pre-wrap
                  after:invisible after:border
                  after:content-[attr(data-cloned-val)_'_']">
        <Textarea autoFocus placeholder="Add a reply..." value={commentText} onChange={handleTextAreaChange} rows={1} className="min-h-10" />
      </div>

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
            disabled={!commentText || commentText === commentAuthorTag}
            onClick={handleSubmitComment}
            className="rounded-3xl">
            Reply
          </Button>
        </div>
      </div>
    </div>
  );
}
