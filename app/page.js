import { Fragment } from 'react';
import Hero from './components/home/hero';
import FeaturedPosts from './components/home/featured-posts';

const DUMMY_POSTS = [
  {
    slug: 'getting-started-with-nextjs',
    title: 'Getting Started with NextJS',
    image: 'getting-started-nextjs.png',
    excerpt: 'NextJS is the React framework for production it makes building fullstack React apps and sites a breeze and ships with in-built SSR.',
    date: '2022-02-10'
  },
  {
    slug: 'getting-started-with-nextjs',
    title: 'Getting Started with NextJS',
    image: 'getting-started-nextjs.png',
    excerpt: 'NextJS is the React framework for production it makes building fullstack React apps and sites a breeze and ships with in-built SSR.',
    date: '2022-02-10'
  },
  {
    slug: 'getting-started-with-nextjs',
    title: 'Getting Started with NextJS',
    image: 'getting-started-nextjs.png',
    excerpt: 'NextJS is the React framework for production it makes building fullstack React apps and sites a breeze and ships with in-built SSR.',
    date: '2022-02-10'
  }
];

export default function Home() {
  return (
    <Fragment>
      <Hero />
      <FeaturedPosts posts={DUMMY_POSTS} />
    </Fragment>
  )
}
