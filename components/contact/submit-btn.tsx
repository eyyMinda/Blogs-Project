import { Button } from "../ui/button";

export default function SubmitButton({ isLoading }: { isLoading: boolean }) {
  return (
    <Button type="submit" aria-disabled={isLoading} disabled={isLoading}>
      {isLoading ? "Sending..." : "Send Message"}
    </Button>
  );
}
