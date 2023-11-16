import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type AvatarProps = { variant?: "mini" | "sm" };

const sizeVariants = {
  mini: { size: 50, sizeCss: "w-10 h-10", text: "text-lg" },
  sm: { size: 200, sizeCss: "w-52 h-52", text: "text-9xl" }
} as const;

export function AvatarIcon(props: AvatarProps) {
  const { variant = "mini" } = props;
  const currVariant = sizeVariants[variant];

  return (
    <Avatar className={props.variant ? currVariant.sizeCss : ""}>
      <AvatarImage src="/images/account/default-pic.png" alt="Profile" width={currVariant.size} height={currVariant.size} fetchPriority="high" />
      <AvatarFallback className={props.variant ? currVariant.text : ""}>P</AvatarFallback>
    </Avatar>
  );
}
