import { Card, CardContent, CardHeader } from "../ui/card";
import ContactForm from "./contact-form";

export default function ContactCard() {
  return (
    <Card className="w-11/12 sm:w-9/12 md:w-7/12 lg:w-6/12 2xl:w-8/12 overflow-hidden">
      <CardHeader className="bg-purple-900">
        <h2 className="text-4xl">Contact</h2>
      </CardHeader>
      <CardContent className="px-3 sm:px-6 pt-6">
        <ContactForm />
      </CardContent>
    </Card>
  );
}
