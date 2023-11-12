import "./globals.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header/header";
import { NotificationProvider } from "@/lib/context/notification-context";

export const metadata: Metadata = {
  title: "NextJS Blogs",
  description: `This is a simple blog project built with Next.js 13 using App Router. It allows you to create and manage blog posts stored as Markdown files (.md) within the posts folder. These posts are dynamically loaded and displayed on your blog website.`
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={GeistSans.className} suppressHydrationWarning={true}>
        <NotificationProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Header />

            <main className="flex min-h-screen flex-col items-center justify-between p-6 sm:px-24">{children}</main>
            <div id="notifications"></div>
          </ThemeProvider>
        </NotificationProvider>
      </body>
    </html>
  );
}
