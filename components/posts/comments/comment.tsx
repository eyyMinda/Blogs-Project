"use client";

import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { timeAgo } from "@/lib/utils";
import { deleteCommentLocale, editCommentLocale } from "@/lib/locale/default-alerts";
import { DeleteComment, EditComment, UpdateComment } from "@/lib/actions";
import { ThumbsDown, ThumbsUp, Trash2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { EllipsisVertical } from "@/components/ui/lucide-icons/EllipsisVertical";
import { AlertDialogComp } from "@/components/ui/custom-ui/alert-dialog-comp";
import { AvatarIcon } from "@/components/ui/custom-ui/avatar-icon";
import ReactionButton from "@/components/ui/custom-ui/reaction-btn";
import ReplyComment from "./reply-comment";
import Replies from "./replies";
import { CommentTextarea } from "@/components/ui/custom-ui/comment-textarea";

const prePath = "/images/account/remix-rumble-avatars/";

interface CommentProps {
  skeleton?: boolean;
  comment?: CommentWithUserType;
  replyDepth?: boolean;
  post_id?: number;
  setNewCommentPosted: Dispatch<SetStateAction<boolean>>;
}

export function Comment({ skeleton = false, comment, replyDepth = false, post_id, setNewCommentPosted }: CommentProps) {
  const { replace } = useRouter();
  const { data: session } = useSession();
  const { id: userId } = session?.user || {};

  const [replyOpen, setReplyOpen] = useState<boolean>(false);
  const [reactionState, setReactionState] = useState<ReactionStateType>("none");
  const [counts, setCounts] = useState({
    likes: comment?.likes?.length || 0,
    dislikes: comment?.dislikes?.length || 0
  });
  const [commentText, setCommentText] = useState<string>(comment?.comment || "");

  const IsAuthorOfComment: boolean = session?.user?.name === comment?.author.name && session?.user?.email === comment?.author.email;
  const image = comment?.author.image?.startsWith("remix") ? prePath + comment?.author.image : comment?.author.image;
  const imageFallback = comment?.author.name ? comment?.author?.name[0].toUpperCase() : undefined;

  useEffect(() => {
    if (userId && comment) {
      setReactionState(comment.likes.includes(userId) ? "liked" : comment.dislikes.includes(userId) ? "disliked" : "none");
    }
  }, [userId, comment]);

  const handleCommentReaction = async (like: boolean) => {
    if (!session?.user) return replace("/login");
    if (!comment?._id) return;
    const { status, likeCount, dislikeCount }: ReactionUpdateType = await UpdateComment({
      comment: { like, author_id: session?.user?.id, comment_id: comment._id },
      replyDepth
    });
    setReactionState(status);
    setCounts({ likes: likeCount, dislikes: dislikeCount });
  };
  const handleCommentEdit = async () => {
    if (!session?.user) return replace("/login");
    if (!comment?._id) return;
    console.log(comment);
    try {
      const res = await EditComment({
        comment: { comment_id: comment._id, author_id: session?.user.id, comment: commentText },
        replyDepth
      });
      const { err, msg } = await res?.json();
      err && console.log(msg);
      !err && setNewCommentPosted(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCommentDelete = async () => {
    if (!session?.user) return replace("/login");
    if (!comment?._id) return;

    try {
      const res = await DeleteComment({
        comment: { comment_id: comment._id, author_id: session?.user.id },
        replyDepth
      });
      const { err, msg } = await res?.json();
      err && console.log(msg);
      !err && setNewCommentPosted(true);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= Comment Options =================
  const alertDialogConfigs = [
    {
      onClickFunc: handleCommentEdit,
      input: <CommentTextarea placeholder="Edit comment..." commentText={commentText} setCommentText={setCommentText} />,
      locale: editCommentLocale,
      buttonContent: (
        <Button variant="ghost" className="flex items-center gap-2 cursor-pointer py-1">
          <Pencil size={18} strokeWidth={1.4} /> Edit
        </Button>
      )
    },
    {
      onClickFunc: handleCommentDelete,
      locale: deleteCommentLocale,
      buttonContent: (
        <Button variant="ghost" className="flex items-center gap-2 cursor-pointer py-1">
          <Trash2 size={18} strokeWidth={1.4} /> Delete
        </Button>
      )
    }
  ];

  return (
    <div className="flex items-start gap-3 w-full">
      <AvatarIcon variant={replyDepth ? "mini" : "sm"} className="mt-2" path={image} fallback={imageFallback} />
      <li className={`text-left relative w-full ${skeleton ? "skeleton rounded-lg" : ""}`}>
        {!skeleton && comment && (
          <>
            <div className="flex gap-2 mb-1">
              <Link href="#">
                <p className="font-bold">{comment.author.name}</p>
              </Link>
              <span className="text-sm dark:text-gray-300">
                {timeAgo(comment.date)[0]} {comment.edited ? "(edited)" : ""}
              </span>
            </div>
            <p>{comment.comment}</p>
          </>
        )}
        {skeleton && ( // ================= Skeleton bars =================
          <>
            <p className="h-2 mb-1 rounded-sm"></p>
            <p className="h-2 mb-1 rounded-sm"></p>
          </>
        )}

        {!skeleton && ( // ================= React buttons =================
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
        {replyOpen && ( // ================= New Reply =================
          <ReplyComment
            setReplyOpen={setReplyOpen}
            replyDepth={replyDepth}
            authorUsername={comment?.author.name}
            post_id={post_id!}
            comment_id={comment?._id as string}
            setNewCommentPosted={setNewCommentPosted}
          />
        )}
        {
          // ================= Replies =================
        }
        {comment?.replies && comment?.replies?.length > 0 && <Replies replies={comment.replies} setNewCommentPosted={setNewCommentPosted} />}
        {!skeleton &&
          IsAuthorOfComment && ( // ============= Comment Options =============
            <Popover>
              <PopoverTrigger className="absolute right-0 top-1 cursor-pointer text-white/50 transition-all hover:text-white">
                <EllipsisVertical size={20} />
              </PopoverTrigger>
              <PopoverContent className="w-full text-sm rounded-lg">
                {alertDialogConfigs.map((config, index) => (
                  <AlertDialogComp key={index} onClickFunc={config.onClickFunc} input={config.input} locale={config.locale}>
                    {config.buttonContent}
                  </AlertDialogComp>
                ))}
              </PopoverContent>
            </Popover>
          )}
      </li>
    </div>
  );
}
