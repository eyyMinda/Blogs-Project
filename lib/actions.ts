import { DatabasePost } from "@/app/_types/PostType";
import { COMMENTS_PAGE_SIZE } from "./constants";

// ============================= POSTS ====================================
export async function updatePostData(data: DatabasePost[]) {
  if (!data) return;
  const res = await fetch("/api/posts/update-posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const { err, msg } = await res.json();
  if (err) throw new Error(msg || "Failed to update posts");
  return msg;
}

// ============================= COMMENTS ====================================
interface commentsFetchFilter {
  post_id: number;
  page?: number;
  pageSize?: number;
  sortOption?: SortOption;
}

export async function fetchComments(filter: commentsFetchFilter) {
  const res = await fetch("/api/posts/get-comments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      post_id: filter.post_id || 1,
      page: filter.page || 1,
      pageSize: filter.pageSize || COMMENTS_PAGE_SIZE,
      sortOption: filter.sortOption || "latest"
    })
  });

  const { err, data } = await res.json();
  if (err) throw new Error("Failed to fetch comments");
  return data;
}

export async function PostComment(comment?: CommentType) {
  if (!comment) return;

  const res = await fetch("/api/posts/new-comment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment)
  });
  return res;
}

export async function UpdateComment(commentData: { comment: CommentReactionUpdateParams; replyDepth: boolean }) {
  if (!commentData) return;

  const res = await fetch("/api/posts/update-comment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(commentData)
  });
  const { err, returnData, msg } = await res.json();
  err && console.error(msg);
  return returnData;
}

export async function UpdateCommentReply(commentData: { comment: CommentReplyUpdateParams; replyDepth: boolean }) {
  if (!commentData) return;

  const res = await fetch("/api/posts/new-reply", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(commentData)
  });
  return res;
}

export async function EditComment(commentData: { comment: CommentEditParams; replyDepth: boolean }) {
  if (!commentData) return;

  const res = await fetch("/api/posts/edit-comment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(commentData)
  });
  return res;
}

export async function DeleteComment(commentData: { comment: CommentDeleteParams; replyDepth: boolean }) {
  if (!commentData) return;

  const res = await fetch("/api/posts/delete-comment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(commentData)
  });
  return res;
}

// ============================= PROFILE ====================================

export async function ChangeUsernameApi(email: string, username: string) {
  if (!email || !username) return;
  const res = await fetch("/api/account/update", {
    method: "PATCH",
    body: JSON.stringify({ email, username })
  });
  return res;
}

export async function ChangePasswordApi(data: ChangePasswordActionParams) {
  if (!data.password || !data.email) return;
  const res = await fetch("/api/account/update", {
    method: "PATCH",
    body: JSON.stringify(data)
  });
  return res;
}

export async function ChangeAvatarApi(email: string, image: string) {
  if (!email || !image) return;
  const res = await fetch("/api/account/update", {
    method: "POST",
    body: JSON.stringify({ email, image })
  });
  return res;
}

export async function DeleteAccountApi(email: string) {
  if (!email) return;
  const res = await fetch("/api/account/delete", {
    method: "DELETE",
    body: JSON.stringify(email)
  });
  return res;
}
