"use client";

import { useEffect, useState } from "react";
import CommentList from "./comment-list";
import NewComment from "./new-comment";
import { Button } from "@/components/ui/button";
import { fetchComments } from "@/lib/actions";
import { useSession } from "next-auth/react";

export default function Comments({ post_id }: { post_id: number }) {
  const { data: session } = useSession();
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<CommentType[] | null>(null);
  const [newCommentPosted, setNewCommentPosted] = useState(false);

  useEffect(() => {
    if (showComments) {
      async function getComments() {
        const filter = { post_id, skip: 0 };
        const fetchedComments = await fetchComments(filter);
        setComments(fetchedComments);
        setNewCommentPosted(false);
      }
      getComments();
    }
  }, [post_id, showComments, newCommentPosted]);

  return (
    <div className="w-full flex flex-col justify-center">
      <Button variant={showComments ? "outline" : "default"} onClick={() => setShowComments(prev => !prev)} className="self-center mb-2">
        {showComments ? "Hide" : "Show"} Comments
      </Button>

      {showComments && (
        <>
          <h2 className="font-bold text-2xl text-start mb-2">{comments && comments.length > 0 ? `${comments.length} Comments` : "No Comments"}</h2>

          {session && <NewComment setNewCommentPosted={setNewCommentPosted} post_id={post_id} />}

          <CommentList comments={comments} />
        </>
      )}
    </div>
  );
}
