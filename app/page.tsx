import { Fragment } from "react";
import { getFeaturedPosts } from "../lib/posts-util";
import FeaturedPosts from "@/components/home/featured-posts";

async function fetchPosts() {
  // Prerendering (StaticProps, ServerSideProps)
  // const postsResponse = await fetch("http://localhost:3000/posts", {
  // cache: "force-cache,// SSG
  // cache: "no-store, // SSR
  // next: {
  // revalidate: 20,/// ISR
  // }
  // })

  // return postResponse.json()

  return getFeaturedPosts();
}

export default async function Home() {
  const featuredPosts = await fetchPosts();

  return (
    <Fragment>
      <FeaturedPosts posts={featuredPosts} />
    </Fragment>
  );
}
