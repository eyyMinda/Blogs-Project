import ProfileForm from "./profile-form";
import DisplayAvatar from "./display-avatar";
import ChooseAvatar from "./choose-avatar";
import { getFolderFileNames } from "@/lib/posts-util";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import DeleteAccount from "./delete-account";

async function UserProfile() {
  // Redirect away if NOT auth
  const session = await getServerSession();
  if (!session) redirect("/login");
  console.log(session.user);

  const avatars = await getFolderFileNames("images/account/remix-rumble-avatars/", "public");

  return (
    <section className="mx-auto my-8 text-center">
      <header className="flex flex-col items-center gap-3 mb-10">
        <Popover>
          <PopoverTrigger>
            <DisplayAvatar image={session.user?.image || undefined} />
          </PopoverTrigger>

          <PopoverContent className="w-[90vw] md:w-[40rem] -translate-y-56 md:-translate-y-72">
            <ChooseAvatar avatars={avatars} />
          </PopoverContent>
        </Popover>

        <h1 className="text-4xl">{session.user?.name || "Your User Profile"}</h1>
      </header>

      <ProfileForm />

      <DeleteAccount email={session.user?.email || null} />
    </section>
  );
}

export default UserProfile;
