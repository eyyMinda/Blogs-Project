"use client";
import { IUser } from "@/nextauth";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { timeAgo } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import DisplayAvatar from "./display-avatar";
import ChooseAvatar from "./(settings)/choose-avatar";
import Settings from "./settings";

function UserProfile({ avatars }: { avatars: string[] }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "loading") {
    return <Loader2 className="animate-spin" />;
  } else if (!session) {
    router.replace("/");
    router.refresh();
    return;
  }
  const { image, name, email, createdAt, needPassword } = session?.user as IUser;
  let formattedDate = createdAt && timeAgo(createdAt);

  return (
    <section className="mx-auto my-8 text-center w-full">
      <header className="flex flex-col items-center gap-3 mb-10">
        <Popover>
          <PopoverTrigger>
            <DisplayAvatar image={image} />
          </PopoverTrigger>

          <PopoverContent className="w-[90vw] md:w-[40rem] -translate-y-56 md:-translate-y-72">
            <ChooseAvatar avatars={avatars} email={email} />
          </PopoverContent>
        </Popover>

        <h1 className="text-3xl">{name}</h1>
        {formattedDate && <p className="text-gray-500">Joined {formattedDate}</p>}
      </header>

      <Settings user={session?.user} />
    </section>
  );
}

export default UserProfile;
