import Image from 'next/image'
import css from './page.module.css';

export default function Home() {
  return (
    <main className={css.main}>
      <div className={css.center}>
        <Image
          className={css.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
        <h1>BLOG</h1>
      </div>
    </main>
  )
}
