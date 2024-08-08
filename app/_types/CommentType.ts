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
