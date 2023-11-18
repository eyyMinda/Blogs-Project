import Image from "next/image";
import { Github } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import AuthForm from "./auth-form";
import AgreementMessage from "../others/agreement-message";

export function CardWithForm() {
  return (
    <Card className="bg-gray-black">
      <CardHeader className="text-center">
        <CardTitle>Create an account</CardTitle>
        <CardDescription>Enter your email below to create your account</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <AuthForm />
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="px-2 bg-background text-muted-foreground">Or continue with</span>
          </div>
        </div>
        <div className="grid grid-flow-col gap-6">
          <Button variant="outline">
            <Github className="w-4 h-4 mr-2" />
            Github
          </Button>
          <Button variant="outline">
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
