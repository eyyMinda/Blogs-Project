import { Comment } from "./comment"; // Assuming Comment is a default export

export default function CommentList({ comments }: { comments?: CommentType[] | null }) {
  return (
    <ul className="flex flex-col gap-2">
      {comments
        ? comments.map((comment: CommentType) => <Comment key={comment._id} skeleton={false} comment={comment} />)
        : [1, 2, 3].map((_, index) => <Comment key={index} skeleton={true} />)}
    </ul>
  );
}
