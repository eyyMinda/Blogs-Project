import fs from "fs";
import path from "path";

import matter from "gray-matter";
import { PostData } from "../app/_types/PostType";
import { postsToDatabasePosts } from "./utils";
import { updatePostData } from "./actions";

//========================= Helpers =========================

const getFilePath = (dirOrFilename = "getting-started-with-nextjs.md", filename = "") => {
  if (filename === "") {
    filename = dirOrFilename;
    dirOrFilename = "posts";
  }
  return path.join(process.cwd(), dirOrFilename, filename);
};

const getFolderPath = (dir = "posts", extraPath = "") => path.join(process.cwd(), dir, extraPath);

const getFileData = (filePath: string) => JSON.parse(fs.readFileSync(filePath, "utf-8")); //.JSON

export const getFolderFileNames = async (folderPath: string, dir = "") => {
  const fullFolderPath = getFolderPath(dir, folderPath);
  try {
    const folderFileNames = await fs.readdirSync(fullFolderPath);
    return folderFileNames;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getPostData = (postIdentifier: string, dir?: string) => {
  //.MD
  const postSlug = postIdentifier.replace(/\.md$/, ""); //replace extention with nothing
  const filePath = getFilePath(dir || "posts", postSlug + ".md");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const { post_id, title, author, author_id, date, date_updated, image, excerpt, isFeatured } = data;
  const postData: PostData = {
    post_id,
    title,
    author,
    author_id,
    date,
    date_updated,
    image,
    excerpt,
    isFeatured,
    slug: postSlug,
    content
  };

  return postData;
};

//========================= Read Data =========================

export const getAllPosts = () => {
  const postsPath = getFolderPath();
  const postsFiles = fs.readdirSync(postsPath);
  const allPosts = postsFiles.map(file => getPostData(file)).sort((a, b) => (a.date > b.date ? 1 : -1));
  // Update Database =========================
  // const updateData = postsToDatabasePosts(allPosts);
  // updatePostData(updateData);
  // END Update Database =========================
  return allPosts;
};
export const getFeaturedPosts = () => {
  const allPosts = getAllPosts();
  return allPosts.filter(post => post.isFeatured);
};
