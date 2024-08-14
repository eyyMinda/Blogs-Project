import { ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "../button";

type SubmitButton = {
  isLoading: boolean;
  loadingText?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
  children?: ReactNode;
  className?: string;
};

export default function SubmitButton({ isLoading, loadingText, variant = "default", children, className = "" }: SubmitButton) {
  const defaultText = "Send message";
  return (
    <Button type="submit" variant={variant} aria-disabled={isLoading} disabled={isLoading} className={className}>
      {isLoading ? loadingText || <Loader2 className="animate-spin" /> : children || defaultText}
    </Button>
  );
}

// <Button type="submit" variant={variant} aria-disabled={isLoading} disabled={isLoading} className={className}>
//   {isLoading ? loadingText || <Loader2 className="animate-spin" /> : text}
// </Button>
