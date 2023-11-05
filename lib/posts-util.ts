import fs from "fs";
import path from "path";

import matter from "gray-matter";
import { Post, PostData } from "./interfaces";

//========================= Helpers =========================

const getFilePath = (
  dirOrFilename = "getting-started-with-nextjs.md",
  filename = ""
) => {
  if (filename === "") {
    filename = dirOrFilename;
    dirOrFilename = "posts";
  }
  return path.join(process.cwd(), dirOrFilename, filename);
};

const getFolderPath = (dir = "posts") => path.join(process.cwd(), dir);

const getFileData = (filePath: string) =>
  JSON.parse(fs.readFileSync(filePath, "utf-8")); //.JSON

export const getPostData = (postIdentifier: string) => {
  //.MD
  const postSlug = postIdentifier.replace(/\.md$/, ""); //replace extention with nothing
  const filePath = getFilePath("posts", postSlug + ".md");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const { title, date, image, excerpt, isFeatured } = data;
  const postData: PostData = {
    title,
    date,
    image,
    excerpt,
    isFeatured,
    slug: postSlug,
    content,
  };

  return postData;
};

//========================= Read Data =========================

export function getAllPosts() {
  const postsPath = getFolderPath();
  const postsFiles = fs.readdirSync(postsPath);
  const allPosts = postsFiles
    .map(file => getPostData(file))
    .sort((a, b) => (a.date > b.date ? 1 : -1));
  return allPosts;
}
export function getFeaturedPosts() {
  const allPosts = getAllPosts();
  return allPosts.filter(post => post.isFeatured);
}
