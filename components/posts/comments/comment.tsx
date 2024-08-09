"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { timeAgo } from "@/lib/utils";
import { UpdateComment } from "@/lib/actions";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useSession } from "next-auth/react";
import ReactionButton from "./reaction-btn";

export function Comment({ skeleton = false, comment }: { skeleton?: boolean; comment?: CommentType }) {
  const { data: session } = useSession();
  const { id: userId } = session?.user || {};

  const [reactionState, setReactionState] = useState<ReactionStateType>("none");
  const [counts, setCounts] = useState({
    likes: comment?.likes?.length || 0,
    dislikes: comment?.dislikes?.length || 0
  });

  useEffect(() => {
    if (userId && comment) {
      setReactionState(comment.likes.includes(userId) ? "liked" : comment.dislikes.includes(userId) ? "disliked" : "none");
    }
  }, [userId, comment]);

  const handleCommentLike = async (like: boolean) => {
    if (!session?.user || !comment?._id) return;
    const { status, likeCount, dislikeCount }: ReactionUpdateType = await UpdateComment({
      like,
      comment_id: comment._id,
      user: session.user.name as string,
      email: session.user.email as string
    });
    setReactionState(status);
    setCounts({ likes: likeCount, dislikes: dislikeCount });
  };

  return (
    <li className={`text-left ${skeleton ? "skeleton rounded-lg" : ""}`}>
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

      {userId && (
        <div className="flex items-center gap-2">
          <ReactionButton
            viewCount
            count={counts.likes}
            onClick={() => handleCommentLike(true)}
            icon={<ThumbsUp strokeWidth={reactionState === "liked" ? 2.5 : 0.5} className="w-5 h-auto" />}
          />

          <ReactionButton
            count={counts.dislikes}
            onClick={() => handleCommentLike(false)}
            icon={<ThumbsDown strokeWidth={reactionState === "disliked" ? 2.5 : 0.5} className="w-5 h-auto" />}
          />
        </div>
      )}
    </li>
  );
}
