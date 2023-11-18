import { Loader2 } from "lucide-react";
import { Button } from "./button";

type SubmitButton = {
  isLoading: boolean;
  loadingText?: string;
  text?: string;
  className?: string;
};

export default function SubmitButton({ isLoading, loadingText, text = "Send Message", className = "" }: SubmitButton) {
  <Loader2 className="animate-spin" />;
  return (
    <Button type="submit" aria-disabled={isLoading} disabled={isLoading} className={className}>
      {isLoading ? loadingText || <Loader2 className="animate-spin" /> : text}
    </Button>
  );
}
