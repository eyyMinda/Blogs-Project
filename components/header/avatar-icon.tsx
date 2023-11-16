import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface AvatarProps {
  size?: number;
}

export function AvatarIcon(props: AvatarProps) {
  const { size = 50 } = props;
  const sizeCss = `w-[${size}px] h-[${size}px]`; //Optional resize
  const fallbackCss = `text-[${200 * 0.65}px]`; //Text size for fallback

  return (
    <Avatar className={props.size ? sizeCss : ""}>
      <AvatarImage src="/images/account/default-pic.png" alt="Profile" width={size} height={size} fetchPriority="high" />
      <AvatarFallback className={props.size ? fallbackCss : ""}>P</AvatarFallback>
    </Avatar>
  );
}
