import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useState } from "react";
import CommentList from "./comment-list";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Replies({ replies, setNewCommentPosted }: { replies: CommentReplyType[]; setNewCommentPosted: Dispatch<SetStateAction<boolean>> }) {
  const [repliesOpen, setRepliesOpen] = useState<boolean>(false);
  const repliesLength = replies.length;
  return (
    <>
      <Button variant="ghost" onClick={() => setRepliesOpen(v => !v)} className="flex items-center p-2 h-auto pr-4 gap-1 text-red-500 rounded-3xl">
        {repliesOpen ? <ChevronUp /> : <ChevronDown />}
        {repliesLength} {repliesLength > 1 ? "replies" : "reply"}
      </Button>

      {repliesOpen && <CommentList comments={replies} replyDepth={true} className="ml-8" setNewCommentPosted={setNewCommentPosted} />}
    </>
  );
}
