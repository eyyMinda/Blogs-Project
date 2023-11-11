import { Metadata } from "next";
import ContactForm from "@/components/contact/form";

export const metadata: Metadata = {
  title: "NextJs Blogs Contact",
  description: `Contact page for NextJs Blogs.`
};

export default function Contact() {
  return <ContactForm />;
}
