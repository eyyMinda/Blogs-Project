"use client";
import { useRef, useState } from "react";
import { Smile } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EmojiPicker from "emoji-picker-react";
import { postComment } from "@/lib/actions";

export default function NewComment() {
  const [commentText, setCommentText] = useState("");
  const [commentOpen, setCommentOpen] = useState(false);
  const commentBtn = useRef(null);
  const commentInput = useRef(null);

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

      <div className={`flex justify-between items-center ${commentOpen ? "animate-accordion-down" : "hidden"}`}>
        <Popover>
          <PopoverTrigger>
            <Smile />
          </PopoverTrigger>
          <PopoverContent>
            <EmojiPicker open={true} onEmojiClick={(e: EmojiObject) => setCommentText(v => v + e.emoji)} />
          </PopoverContent>
        </Popover>

        <div className="mt-2 flex gap-2 justify-end">
          <Button variant="ghost" onClick={() => setCommentOpen(false)}>
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
