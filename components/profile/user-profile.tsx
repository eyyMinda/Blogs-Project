// import { redirect } from "next/navigation";
import ProfileForm from "./profile-form";
import DisplayAvatar from "./display-avatar";
import ChooseAvatar from "./choose-avatar";
import { getFolderFileNames } from "@/lib/posts-util";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";

function UserProfile() {
  const images = getFolderFileNames("public/images/account/remix-rumble-avatars");
  // Redirect away if NOT auth
  // redirect("/login");
  function handlePopover() {}
  return (
    <section className="mx-auto my-12 text-center">
      <header className="flex flex-col items-center gap-3">
        <Popover>
          <PopoverTrigger>
            <DisplayAvatar />
          </PopoverTrigger>

          <PopoverContent className="w-[90vw] md:w-[40rem] -translate-y-56 md:-translate-y-72">
            <ChooseAvatar images={images} />
          </PopoverContent>
        </Popover>

        <h1 className="text-4xl">Your User Profile</h1>
      </header>

      <ProfileForm />
    </section>
  );
}

export default UserProfile;
