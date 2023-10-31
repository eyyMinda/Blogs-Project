import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';

//========================= Helpers =========================

const getFilePath = (dirOrFilename = 'getting-started-with-nextjs.md', filename = '') => {
  if (filename === '') {
    filename = dirOrFilename;
    dirOrFilename = 'posts';
  }
  return path.join(process.cwd(), dirOrFilename, filename);
};

const getFolderPath = (dir = 'posts') => path.join(process.cwd(), dir);

const getFileData = filePath => JSON.parse(fs.readFileSync(filePath, 'utf-8')); //.JSON

const getPostData = fileName => {  //.MD
  const filePath = getFilePath('posts', fileName);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  const postSlug = fileName.replace(/\.md$/, ''); //replace extention with nothing
  const postData = {
    ...data,
    slug: postSlug,
    content
  };

  return postData;
}

//========================= Read Data =========================

export function getAllPosts() {
  const postsPath = getFolderPath();
  const postsFiles = fs.readdirSync(postsPath);
  const allPosts = postsFiles.map(file => getPostData(file)).sort((a, b) => a.date > b.date ? 1 : -1);
  return allPosts
}
export function getFeaturedPosts() {
  const allPosts = getAllPosts();
  return allPosts.filter(post => post.isFeatured);
}