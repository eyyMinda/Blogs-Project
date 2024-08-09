"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { timeAgo } from "@/lib/utils";
import { UpdateComment } from "@/lib/actions";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useSession } from "next-auth/react";
import ReactionButton from "./reaction-btn";
import { useRouter } from "next/navigation";

export function Comment({ skeleton = false, comment }: { skeleton?: boolean; comment?: CommentType }) {
  const { replace } = useRouter();
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

  const handleCommentReaction = async (like: boolean) => {
    if (!session?.user) return replace("/login");
    if (!comment?._id) return;
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

      {!skeleton && (
        <div className="flex items-center gap-2">
          <ReactionButton
            viewCount
            count={counts.likes}
            onClick={() => handleCommentReaction(true)}
            icon={<ThumbsUp strokeWidth={reactionState === "liked" ? 2.5 : 0.5} className="w-5 h-auto" />}
          />

          <ReactionButton
            count={counts.dislikes}
            onClick={() => handleCommentReaction(false)}
            icon={<ThumbsDown strokeWidth={reactionState === "disliked" ? 2.5 : 0.5} className="w-5 h-auto" />}
          />
        </div>
      )}
    </li>
  );
}
