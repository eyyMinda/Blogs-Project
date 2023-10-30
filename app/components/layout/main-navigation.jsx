import css from "./styles/main-navigation.module.css";
import Link from "next/link";
import Logo from "./logo";

export default function MainNavigation() {
  return (
    <header className={css.header}>
      <Link href="/">
        <Logo />
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/posts">Blogs</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
