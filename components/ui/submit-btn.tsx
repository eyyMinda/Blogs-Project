import { Loader2 } from "lucide-react";
import { Button } from "./button";

type SubmitButton = {
  isLoading: boolean;
  loadingText?: string;
  text?: string;
};

export default function SubmitButton({ isLoading, loadingText, text = "Send Message" }: SubmitButton) {
  <Loader2 className="animate-spin" />;
  return (
    <Button type="submit" aria-disabled={isLoading} disabled={isLoading}>
      {isLoading ? loadingText || <Loader2 className="animate-spin" /> : text}
    </Button>
  );
}
