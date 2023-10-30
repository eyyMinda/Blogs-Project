import css from "./styles/hero.module.css";
import Image from "next/image";

export default function Hero() {
  return (
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
  );
}
