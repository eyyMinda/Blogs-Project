interface CommentType {
  _id: string | number;
  username: string;
  email: string;
  post_id: string | number;
  comment: string;
  date: string;
  replies?: Object[] | string[] | undefined;
}

interface CommentReplyType extends CommentType {
  comment_id: string;
}

interface CommentsType {
  comment?: CommentType[] | undefined;
}
