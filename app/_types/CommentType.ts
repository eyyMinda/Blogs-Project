interface CommentType {
  _id: string;
  username: string;
  email: string;
  post_id: string;
  comment: string;
  date: Date | string;
  replies?: Object[] | string[] | undefined;
}

interface CommentReplyType extends CommentType {
  comment_id: string;
}

interface CommentsType {
  comments?: CommentType[] | undefined;
}
