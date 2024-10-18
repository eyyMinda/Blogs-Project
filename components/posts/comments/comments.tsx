"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { COMMENTS_PAGE_SIZE } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import CommentList from "./comment-list";
import NewComment from "./new-comment";
import SortCommentsButton from "./sort-comments-btn";
import { fetchComments } from "@/lib/actions";

export default function Comments({ post_id }: { post_id: number }) {
  const { data: session } = useSession();
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<CommentWithUserType[] | null>(null);
  const [totalCommentsCount, setTotalCommentsCount] = useState(0);
  const [newCommentPosted, setNewCommentPosted] = useState(false); // Refetch comments if true;
  const [sortOption, setSortOption] = useState<SortOption>("latest");
  const [pageSize, setPageSize] = useState(10);
  const [viewMoreButton, setViewMoreButton] = useState(false);

  useEffect(() => {
    if (showComments) {
      const getComments = async () => {
        const { comments: fetchedComments, metadata } = await fetchComments({ post_id, pageSize, sortOption });
        setTotalCommentsCount(metadata.count);
        setComments(fetchedComments);
        setNewCommentPosted(false);
        setViewMoreButton(metadata.count > pageSize);
      };
      getComments();
    }
  }, [post_id, showComments, newCommentPosted, pageSize, sortOption]);

  const fetchMoreComments = async () => {
    if (totalCommentsCount < pageSize) return;
    setPageSize(v => v + COMMENTS_PAGE_SIZE);
  };

  return (
    <div className="w-full flex flex-col justify-center">
      <Button variant={showComments ? "outline" : "default"} onClick={() => setShowComments(prev => !prev)} className="self-center mb-2">
        {showComments ? "Hide" : "Show"} Comments
      </Button>

      {showComments && (
        <>
          <div className="flex justify-between mb-2">
            <h2 className="font-bold text-2xl text-start mb-2">{`${totalCommentsCount} Comments`}</h2>

            {!!totalCommentsCount && <SortCommentsButton setSortOption={setSortOption} />}
          </div>

          {session && <NewComment setNewCommentPosted={setNewCommentPosted} post_id={post_id} />}

          <CommentList comments={comments} post_id={post_id} setNewCommentPosted={setNewCommentPosted} />

          {viewMoreButton && (
            <Button variant="outline" onClick={fetchMoreComments} className="self-center rounded-3xl">
              View more
            </Button>
          )}
        </>
      )}
    </div>
  );
}
