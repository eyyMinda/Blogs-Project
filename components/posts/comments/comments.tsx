"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { ArrowDownWideNarrow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import CommentList from "./comment-list";
import NewComment from "./new-comment";
import { fetchComments } from "@/lib/actions";
import { sortComments } from "@/lib/utils";

export default function Comments({ post_id }: { post_id: number }) {
  const popoverTriggerRef = useRef<HTMLButtonElement>(null);
  const { data: session } = useSession();
  const [showComments, setShowComments] = useState(false);
  const [fetchedComments, setFetchedComments] = useState<CommentType[] | null>(null);
  const [comments, setComments] = useState<CommentType[] | null>(null);
  const [newCommentPosted, setNewCommentPosted] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>("latest");

  const handleSortPopup = (option: SortOption) => {
    popoverTriggerRef.current?.click();
    setSortOption(option);
  };

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
            <Popover>
              <PopoverTrigger ref={popoverTriggerRef}>
                <ArrowDownWideNarrow />
              </PopoverTrigger>
              <PopoverContent className="flex flex-col w-auto p-1" side="left" align="start">
                {["Popular", "Latest", "Oldest"].map(option => (
                  <Button key={option} variant="ghost" onClick={() => handleSortPopup(option.toLowerCase() as SortOption)}>
                    {option}
                  </Button>
                ))}
              </PopoverContent>
            </Popover>
          </div>

          {session && <NewComment setNewCommentPosted={setNewCommentPosted} post_id={post_id} />}

          <CommentList comments={comments} />
        </>
      )}
    </div>
  );
}
