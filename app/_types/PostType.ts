// Post Preview
export interface Post {
  post_id?: number;
  title: string;
  author?: string;
  author_id?: number | string;
  date: string | Date;
  date_updated?: string | Date;
  image: string;
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
  date: Date | string;
}

// Header + Content
export interface PostData extends Post {
  content: string;
}
export interface PostDataObject {
  postData: PostData;
}

export interface DatabasePost {
  post_id: number;
  title: string;
  author: string;
  author_id: number | string;
  date: string | Date;
  date_updated: string | Date;
}
