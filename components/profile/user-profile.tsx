// import { redirect } from "next/navigation";
import ProfileForm from "./profile-form";
import { AvatarIcon } from "../header/avatar-icon";

function UserProfile() {
  // Redirect away if NOT auth
  // redirect("/login");

  return (
    <section className="mx-auto my-12 text-center text-">
      <header className="flex flex-col items-center gap-3">
        <AvatarIcon variant="sm" />
        <h1 className="text-4xl">Your User Profile</h1>
      </header>

      <ProfileForm />
    </section>
  );
}

export default UserProfile;
