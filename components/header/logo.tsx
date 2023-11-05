import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex">
      <Image
        src="/next.svg"
        alt="Logo"
        width={150}
        height={37}
        priority
        className="min-w-[100px] w-[10vw] hidden dark:block"
      />
      <Image
        src="/vercel.svg"
        alt="Logo"
        width={150}
        height={37}
        priority
        className="min-w-[100px] w-[10vw] block dark:hidden"
      />
    </Link>
  );
}
