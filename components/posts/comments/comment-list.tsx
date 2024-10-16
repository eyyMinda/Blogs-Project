import { Dispatch, SetStateAction } from "react";
import { Comment } from "./comment";

export default function CommentList({
  comments,
  replyDepth = false,
  className,
  post_id,
  setNewCommentPosted
}: {
  comments?: CommentWithUserType[] | null;
  replyDepth?: boolean;
  className?: string;
  post_id?: number;
  setNewCommentPosted: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <ul className={`flex flex-col gap-2 ${className}`}>
      {comments
        ? comments.map((comment: CommentWithUserType) => (
            <Comment key={comment._id} skeleton={false} comment={comment} replyDepth={replyDepth} post_id={post_id} setNewCommentPosted={setNewCommentPosted} />
          ))
        : [1, 2, 3].map((_, index) => <Comment key={index} skeleton={true} setNewCommentPosted={setNewCommentPosted} />)}
    </ul>
  );
}
