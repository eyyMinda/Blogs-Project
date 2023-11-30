import { Loader2 } from "lucide-react";
import { Button } from "../button";

type SubmitButton = {
  isLoading: boolean;
  loadingText?: string;
  text?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
  className?: string;
};

export default function SubmitButton({ isLoading, loadingText, text = "Send Message", variant = "default", className = "" }: SubmitButton) {
  <Loader2 className="animate-spin" />;
  return (
    <Button type="submit" variant={variant} aria-disabled={isLoading} disabled={isLoading} className={className}>
      {isLoading ? loadingText || <Loader2 className="animate-spin" /> : text}
    </Button>
  );
}
