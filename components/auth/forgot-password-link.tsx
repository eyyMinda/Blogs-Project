import Link from "next/link";
export default function ForgotPassword({ className }: { className?: string }) {
  return (
    <Link href="/password_reset" className={`text-blue-500 text-sm hover:underline underline-offset-2${" " + className}`}>
      I forgot my password
    </Link>
  );
}
