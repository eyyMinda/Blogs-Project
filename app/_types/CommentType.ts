interface CommentType {
  _id: string | number;
  post_id: string | number;
  author_id: string;
  comment: string;
  date: string;
  edited?: boolean;
  replies?: CommentReplyType[];
  likes: string[];
  dislikes: string[];
}

interface CommentWithUserType extends CommentType {
  author: { name: string; email: string; image: string };
}
interface CommentReplyType extends CommentWithUserType {}

interface CommentsType {
  comments?: CommentType[] | CommentWithUserType[] | undefined;
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
  author_id: string;
}

interface CommentReplyUpdateParams extends CommentType {
  replied_to: string;
}

interface CommentEditParams {
  comment_id: string | number;
  comment: string;
  author_id: string;
}

interface CommentDeleteParams {
  comment_id: string | number;
  author_id: string;
}
