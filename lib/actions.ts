import { DatabasePost } from "@/app/_types/PostType";

// ============================= POSTS ====================================
export async function updatePostData(data: DatabasePost[]) {
  if (!data) return;

  const res = await fetch("/api/posts/update-posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ data: data })
  });

  const { err, msg } = await res.json();
  console.log(msg);
  if (err) {
    throw new Error(msg || "Failed to update posts");
  }
  return msg;
}

// ============================= COMMENTS ====================================

export async function fetchComments() {
  const res = await fetch("/api/posts/get-comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      post_id: 1,
      skip: 0
    })
  });

  const { err, data } = await res.json();
  if (err) {
    throw new Error("Failed to fetch comments");
  }
  return data;
}

export async function postComment(comment?: CommentType) {
  if (!comment) return;

  const res = await fetch("/api/posts/new-comment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(comment)
  });

  const { err, msg } = await res.json();
  if (err) {
    throw new Error(msg || "Failed to post comment");
  }
  return msg;
}
