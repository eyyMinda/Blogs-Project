import { Metadata } from "next";
import ContactForm from "@/components/contact/form";

export const metadata: Metadata = {
  title: "NextJs Blogs Contact",
  description: `Contact page for NextJs Blogs.`
};

export default function Contact() {
  return (
    <div>
      <h2 className="text-4xl mb-8 underline underline-offset-8">Contact    </h2>
      <ContactForm />
    </div>
  );
}
