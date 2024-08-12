import "./globals.tailwind.css";
import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { GeistSans } from "geist/font";
import { ThemeProvider } from "@/components/theme-provider";
import { NotificationProvider } from "@/contexts/notification-context";
import { SessionContent } from "./SessionContent";
export const metadata: Metadata = {
  title: "NextJS Blogs",
  description: `This is a simple blog project built with Next.js 14 using App Router. It allows you to create and manage blog posts stored as Markdown files (.md) within the posts folder. These posts are dynamically loaded and displayed on your blog website.`
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${GeistSans.className} overflow-x-hidden`} suppressHydrationWarning={true}>
        <NotificationProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <SessionContent>{children}</SessionContent>
          </ThemeProvider>
        </NotificationProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
