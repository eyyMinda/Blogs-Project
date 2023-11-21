import ProfileForm from "./profile-form";
import DisplayAvatar from "./display-avatar";
import ChooseAvatar from "./choose-avatar";
import { getFolderFileNames } from "@/lib/posts-util";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";

async function UserProfile() {
  const router = useRouter();
  // Redirect away if NOT auth
  const session = await getServerSession();
  if (!session) router.replace("/login");

  const avatars = await getFolderFileNames("images/account/remix-rumble-avatars/", "public");

  return (
    <section className="mx-auto my-12 text-center">
      <header className="flex flex-col items-center gap-3">
        <Popover>
          <PopoverTrigger>
            <DisplayAvatar />
          </PopoverTrigger>

          <PopoverContent className="w-[90vw] md:w-[40rem] -translate-y-56 md:-translate-y-72">
            <ChooseAvatar avatars={avatars} />
          </PopoverContent>
        </Popover>

        <h1 className="text-4xl">Your User Profile</h1>
      </header>

      <ProfileForm />
    </section>
  );
}

export default UserProfile;
