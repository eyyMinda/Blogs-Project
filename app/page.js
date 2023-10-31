import { Fragment } from 'react';
import { DUMMY_POSTS } from '@/DUMMY_DATA';
import Hero from './components/home/hero';
import FeaturedPosts from './components/home/featured-posts';

export default function Home() {
  return (
    <Fragment>
      <Hero />
      <FeaturedPosts posts={DUMMY_POSTS} />
    </Fragment>
  )
}
