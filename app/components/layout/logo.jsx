import Image from "next/image";

export default function Logo() {
  return (
    <Image src="/vercel.svg" alt="Logo" width={180} height={37} priority />
  );
}
