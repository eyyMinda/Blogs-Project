"use client";
import Image from "next/image";
import { Github } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import AuthForm from "./auth-form";
import AgreementMessage from "../others/agreement-message";
import TextOverLine from "../others/text-over-line";
import { authTemplate } from "@/lib/locale/default-auth";

export function CardWithForm({ auth }: { auth: "register" | "login" }) {
  const currTemplate = authTemplate[auth];

  return (
    <Card className="bg-gray-black">
      <CardHeader className="text-center">
        <CardTitle>{currTemplate.title}</CardTitle>
        <CardDescription>{currTemplate.description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <AuthForm auth={auth} btnText={currTemplate.button} />
        <TextOverLine />
        <div className="grid grid-flow-col gap-6">
          <Button variant="outline">
            <Github className="w-4 h-4 mr-2" />
            Github
          </Button>
          <Button variant="outline" disabled>
            <Image src="/google.svg" width={16} height={16} alt="Google-Logo" className="mr-2" />
            Google
          </Button>
        </div>
      </CardContent>
      <CardFooter className="max-w-sm">
        <AgreementMessage />
      </CardFooter>
    </Card>
  );
}
