"use client";
import Image from "next/image";
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
  const { image, name, email, createdAt, lastSignInAt } = session?.user as IUser;
  const formattedDate = createdAt && timeAgo(createdAt);
  const formattedLastSignIn = lastSignInAt && timeAgo(lastSignInAt);
  const ELAPSED_MS = 1200;

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

        <h1 className="text-3xl flex items-center gap-2">
          {formattedLastSignIn && formattedLastSignIn[1] < ELAPSED_MS && <Image src={"/svg/misc/green-sphere.svg"} alt="online-icon" width={12} height={12} />}
          {name}
        </h1>

        {formattedLastSignIn && formattedLastSignIn[1] > ELAPSED_MS && (
          <p className="text-gray-500 flex justify-center items-center gap-2">Last Online {formattedLastSignIn[0]}</p>
        )}
        {formattedDate && <p className="text-gray-500">Joined {formattedDate[0]}</p>}
      </header>

      <Settings user={session?.user} />
    </section>
  );
}

export default UserProfile;
