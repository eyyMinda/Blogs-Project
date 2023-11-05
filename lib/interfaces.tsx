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

export interface PostItem {
  post: Post;
}

export interface PostContent {
  postData: PostData;
}

export interface PostData {
  title: string;
  image: string;
  date: Date;
  excerpt: string;
  slug: string;
  isFeatured: boolean;
  content: string;
}
