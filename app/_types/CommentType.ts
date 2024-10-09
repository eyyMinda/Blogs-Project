interface CommentType {
  _id: string | number;
  post_id: string | number;
  username: string;
  email: string;
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

interface CommentReplyUpdateParams extends CommentType {
  replied_to: string;
}

interface CommentEditParams {
  comment_id: string | number;
  comment: string;
  user: string;
  email: string;
}

interface CommentDeleteParams {
  comment_id: string | number;
  user: string;
  email: string;
}
