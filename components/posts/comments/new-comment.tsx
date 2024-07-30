"use client";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { postComment } from "@/lib/actions";
import EmojiPickerComp from "./emoji-picker";

export default function NewComment() {
  const [commentText, setCommentText] = useState("");
  const [commentOpen, setCommentOpen] = useState(false);
  const commentBtn = useRef(null);
  const commentInput = useRef(null);

  const handleCloseComment = () => {
    setCommentOpen(false);
    setCommentText("");
  };
  const handleSubmitComment = () => {
    postComment();
  };

  return (
    <div>
      <Input
        placeholder="Add a comment..."
        ref={commentInput}
        value={commentText}
        onChange={e => setCommentText(e.target.value)}
        onFocus={() => setCommentOpen(true)}
      />

      <hr className="my-4" />

      <div className={`flex justify-between items-center mb-4 ${commentOpen ? "animate-accordion-down" : "hidden"}`}>
        <EmojiPickerComp setCommentText={setCommentText} />

        <div className="flex gap-2 justify-end">
          <Button variant="ghost" onClick={handleCloseComment}>
            Cancel
          </Button>
          <Button variant="secondary" ref={commentBtn} disabled={!commentText} onClick={handleSubmitComment}>
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
}
