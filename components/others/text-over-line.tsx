export default function TextOverLine({ text }: { text?: string }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t" />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-2 bg-background text-muted-foreground">{text || "Or continue with"}</span>
      </div>
    </div>
  );
}
