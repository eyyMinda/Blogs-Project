"use client";
import Header from "@/components/header/header";
import { SessionProvider } from "next-auth/react";

export function SessionContent({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Header />

      <main className="flex min-h-full max-w-[1920px] mx-auto flex-col items-center justify-between py-6 px-4 sm:px-16 lg:px-24 2xl:px-80">{children}</main>
      <div id="notifications" className="w-full h-full pointer-events-none overflow-hidden"></div>
    </SessionProvider>
  );
}
