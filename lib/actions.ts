import { DatabasePost } from "@/app/_types/PostType";

// ============================= POSTS ====================================
export async function updatePostData(data: DatabasePost[]) {
  if (!data) return;
  const res = await fetch("/api/posts/update-posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const { err, msg } = await res.json();

  if (err) {
    throw new Error(msg || "Failed to update posts");
  }
  return msg;
}

// ============================= COMMENTS ====================================

export async function fetchComments(filter: { post_id: number; skip?: number }) {
  const res = await fetch("/api/posts/get-comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      post_id: filter.post_id || 1,
      skip: filter.skip || 0
    })
  });

  const { err, data } = await res.json();
  if (err) {
    throw new Error("Failed to fetch comments");
  }
  return data;
}

export async function PostComment(comment?: CommentType) {
  if (!comment) return;

  const res = await fetch("/api/posts/new-comment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(comment)
  });
  return res;
}

export async function UpdateComment(commentData: CommentReactionUpdateParams) {
  if (!commentData) return;

  const res = await fetch("/api/posts/update-comment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(commentData)
  });
  const { err, msg, returnData } = await res.json();
  err && console.error(msg);
  return returnData;
}

export async function UpdateCommentReply(commentData: CommentReplyUpdateParams) {
  if (!commentData) return;

  const res = await fetch("/api/posts/update-comment-reply", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(commentData)
  });
  const { err, msg, returnData } = await res.json();
  err && console.error(msg);
  return returnData;
}
