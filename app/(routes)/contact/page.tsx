import ContactCard from "@/components/contact/contact-card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NextJS Blogs Contact",
  description: `Contact page for NextJs Blogs.`
};

export default function Contact() {
  return <ContactCard />;
}
