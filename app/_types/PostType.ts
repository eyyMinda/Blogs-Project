// Post Preview
export interface Post {
  title: string;
  image: string;
  date: Date;
  excerpt: string;
  slug: string;
  isFeatured: boolean;
}
export interface Posts {
  posts: Post[];
}
export interface PostObject {
  post: Post;
}

// Header
export interface PostHeaderType {
  title: string;
  image: string;
  date: Date;
}

// Header + Content
export interface PostData extends Post {
  content: string;
}
export interface PostDataObject {
  postData: PostData;
}
