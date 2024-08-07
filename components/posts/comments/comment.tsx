"use client";

import { timeAgo } from "@/lib/utils";
import Link from "next/link";

export function Comment({ skeleton = false, comment }: { skeleton?: boolean; comment?: CommentType }) {
  return (
    <li className={`text-left ${skeleton || !comment ? "skeleton rounded-lg" : ""}`}>
      <div className="text-right flex items-center gap-2 mb-2">
        <span className="rounded-sm">
          {comment && (
            <Link href="#">
              <p className="inline-block font-bold">{comment?.username}</p>
            </Link>
          )}
        </span>
        <span className="text-sm dark:text-gray-300 mb-1 rounded-sm">{comment && timeAgo(comment.date)[0]}</span>
      </div>

      <p className={`${skeleton ? "h-2" : ""} mb-1 rounded-sm`}>{comment?.comment}</p>
      {skeleton && (
        <>
          <p className="h-2 mb-1 rounded-sm"></p>
          <p className="h-2 mb-1 rounded-sm"></p>
        </>
      )}
    </li>
  );
}
