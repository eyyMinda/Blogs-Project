"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import CommentList from "./comment-list";
import NewComment from "./new-comment";
import { fetchComments } from "@/lib/actions";
import { sortComments } from "@/lib/utils";
import SortCommentsButton from "./sort-comments-btn";

export default function Comments({ post_id }: { post_id: number }) {
  const { data: session } = useSession();
  const [showComments, setShowComments] = useState(false);
  const [fetchedComments, setFetchedComments] = useState<CommentType[] | null>(null);
  const [comments, setComments] = useState<CommentType[] | null>(null);
  const [newCommentPosted, setNewCommentPosted] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>("latest");

  useEffect(() => {
    if (showComments) {
      const getComments = async () => {
        const fetchedComments = await fetchComments({ post_id, skip: 0 });
        setFetchedComments(fetchedComments);
        setNewCommentPosted(false);
      };
      getComments();
    }
  }, [post_id, showComments, newCommentPosted]);

  useEffect(() => {
    if (fetchedComments) {
      const sortedComments = sortComments(fetchedComments, sortOption);
      setComments(sortedComments);
    }
  }, [fetchedComments, sortOption]);

  return (
    <div className="w-full flex flex-col justify-center">
      <Button variant={showComments ? "outline" : "default"} onClick={() => setShowComments(prev => !prev)} className="self-center mb-2">
        {showComments ? "Hide" : "Show"} Comments
      </Button>

      {showComments && (
        <>
          <div className="flex justify-between mb-2">
            <h2 className="font-bold text-2xl text-start mb-2">{comments?.length ? `${comments.length} Comments` : "0 Comments"}</h2>

            {fetchedComments && <SortCommentsButton setSortOption={setSortOption} />}
          </div>

          {session && <NewComment setNewCommentPosted={setNewCommentPosted} post_id={post_id} />}

          <CommentList comments={comments} post_id={post_id} setNewCommentPosted={setNewCommentPosted} />
        </>
      )}
    </div>
  );
}
