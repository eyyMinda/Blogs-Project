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
  const dummyComment = {
    _id: 15151561561654654465,
    post_id: 1,
    username: "eyyMinda",
    email: "sublimemindrite@gmail.com",
    comment: "New Comment here",
    date: new Date().toString(),
    replies: undefined
  };
  if (!comment) return;

  const res = await fetch("/api/posts/get-comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dummyComment)
  });

  const { err, data } = await res.json();
  if (err) {
    throw new Error("Failed to fetch comments");
  }
  return data;
}
