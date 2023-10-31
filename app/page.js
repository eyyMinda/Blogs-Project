import { Fragment } from 'react';
import { getFeaturedPosts } from './_lib/posts-util';
import Hero from './components/home/hero';
import FeaturedPosts from './components/home/featured-posts';

async function fetchPosts() { // Prerendering (StaticProps, ServerSideProps)
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
      <Hero />
      <FeaturedPosts posts={featuredPosts} />
    </Fragment>
  )
}