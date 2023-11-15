import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function AvatarIcon() {
  return (
    <Avatar>
      <AvatarImage src="/images/account/default-pic.png" alt="Profile" width={50} height={50} />
      <AvatarFallback>P</AvatarFallback>
    </Avatar>
  );
}
