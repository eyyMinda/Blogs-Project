"use client";
import Header from "@/components/header/header";
import { SessionProvider } from "next-auth/react";

export function SessionContent({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Header />

      <main className="flex min-h-full flex-col items-center justify-between p-6 sm:px-16">{children}</main>
      <div id="notifications" className="w-full h-full pointer-events-none overflow-hidden"></div>
    </SessionProvider>
  );
}
