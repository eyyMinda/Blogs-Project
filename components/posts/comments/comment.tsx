"use client";

import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { timeAgo } from "@/lib/utils";
import { UpdateComment } from "@/lib/actions";
import { ThumbsDown, ThumbsUp, Trash2 } from "lucide-react";
import { EllipsisVertical } from "@/components/ui/lucide-icons/EllipsisVertical";
import ReactionButton from "@/components/ui/custom-ui/reaction-btn";
import ReplyComment from "./reply-comment";
import { Button } from "@/components/ui/button";
import Replies from "./replies";

export function Comment({
  skeleton = false,
  comment,
  replyDepth = false,
  post_id,
  setNewCommentPosted
}: {
  skeleton?: boolean;
  comment?: CommentType;
  replyDepth?: boolean;
  post_id?: number;
  setNewCommentPosted: Dispatch<SetStateAction<boolean>>;
}) {
  const { replace } = useRouter();
  const { data: session } = useSession();
  const { id: userId } = session?.user || {};

  const [reactionState, setReactionState] = useState<ReactionStateType>("none");
  const [counts, setCounts] = useState({
    likes: comment?.likes?.length || 0,
    dislikes: comment?.dislikes?.length || 0
  });
  const [replyOpen, setReplyOpen] = useState<boolean>(false);
  const IsAuthorOfComment: boolean = session?.user?.name === comment?.username && session?.user?.email === comment?.email;

  useEffect(() => {
    if (userId && comment) {
      setReactionState(comment.likes.includes(userId) ? "liked" : comment.dislikes.includes(userId) ? "disliked" : "none");
    }
  }, [userId, comment]);

  const handleCommentReaction = async (like: boolean) => {
    if (!session?.user) return replace("/login");
    if (!comment?._id) return;
    const { status, likeCount, dislikeCount }: ReactionUpdateType = await UpdateComment({
      comment: {
        like,
        comment_id: comment._id,
        user: session.user.name as string,
        email: session.user.email as string
      },
      replyDepth
    });
    setReactionState(status);
    setCounts({ likes: likeCount, dislikes: dislikeCount });
  };

  return (
    <li className={`text-left relative ${skeleton ? "skeleton rounded-lg" : ""}`}>
      {!skeleton && comment && (
        <>
          <div className="flex gap-2 mb-1">
            <Link href="#">
              <p className="font-bold">{comment.username}</p>
            </Link>
            <span className="text-sm dark:text-gray-300">{timeAgo(comment.date)[0]}</span>
          </div>
          <p>{comment.comment}</p>
        </>
      )}
      {skeleton && (
        <>
          <p className="h-2 mb-1 rounded-sm"></p>
          <p className="h-2 mb-1 rounded-sm"></p>
        </>
      )}

      {!skeleton && (
        <div className="flex items-center gap-2">
          <ReactionButton viewCount count={counts.likes} onClick={() => handleCommentReaction(true)}>
            {<ThumbsUp strokeWidth={reactionState === "liked" ? 2.5 : 0.5} className="w-5 h-auto" />}
          </ReactionButton>
          <ReactionButton count={counts.dislikes} onClick={() => handleCommentReaction(false)}>
            {<ThumbsDown strokeWidth={reactionState === "disliked" ? 2.5 : 0.5} className="w-5 h-auto" />}
          </ReactionButton>

          <Button variant="ghost" className="p-1 min-h-0 h-auto rounded-2xl" onClick={() => setReplyOpen(v => !v)}>
            Reply
          </Button>
        </div>
      )}
      {replyOpen && (
        <ReplyComment
          setReplyOpen={setReplyOpen}
          replyDepth={replyDepth}
          authorUsername={comment?.username}
          post_id={post_id!}
          comment_id={comment?._id as string}
          setNewCommentPosted={setNewCommentPosted}
        />
      )}
      {comment?.replies && comment?.replies?.length > 0 && <Replies replies={comment.replies} setNewCommentPosted={setNewCommentPosted} />}
      {!skeleton && IsAuthorOfComment && (
        <div className="absolute right-5 top-5 cursor-pointer text-white/50 transition-all hover:text-white">
          <EllipsisVertical size={20} />
        </div>
      )}
    </li>
  );
}
