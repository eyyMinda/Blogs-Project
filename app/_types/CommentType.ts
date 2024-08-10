interface CommentType {
  _id: string | number;
  username: string;
  email: string;
  post_id: string | number;
  comment: string;
  date: string;
  replies?: CommentReplyType[];
  likes: string[];
  dislikes: string[];
}

interface CommentReplyType extends CommentType {}

interface CommentsType {
  comments?: CommentType[] | undefined;
}

type SortOption = "latest" | "oldest" | "popular";

type ReactionStateType = "liked" | "disliked" | "none";
interface ReactionUpdateType {
  status: ReactionStateType;
  likeCount: number;
  dislikeCount: number;
}

interface CommentReactionUpdateParams {
  like: boolean; // boolean
  comment_id: string | number;
  user: string;
  email: string;
}
