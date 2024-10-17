import { Avatar, AvatarFallback, AvatarImage } from "../avatar";

const sizeVariants = {
  mini: { size: 15, sizeCss: "w-8 h-8", text: "text-md" },
  sm: { size: 25, sizeCss: "w-10 h-10", text: "text-lg" },
  md: { size: 50, sizeCss: "w-52 h-52", text: "text-9xl" }
} as const;

export function AvatarIcon(props: AvatarProps) {
  const { variant = "mini", path, fallback = "P", className = "" } = props;
  const currVariant = sizeVariants[variant];

  return (
    <Avatar className={`${props.variant ? currVariant.sizeCss : ""}${className && " " + className}`}>
      <AvatarImage src={path} alt="Profile" width={currVariant.size} height={currVariant.size} fetchPriority="high" />
      <AvatarFallback className={props.variant ? currVariant.text : ""}>{fallback}</AvatarFallback>
    </Avatar>
  );
}
