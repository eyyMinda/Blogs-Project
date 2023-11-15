import css from "./styles/user-profile.module.css";
import { redirect } from "next/navigation";
import ProfileForm from "./profile-form";

function UserProfile() {
  // Redirect away if NOT auth
  redirect("/login");

  return (
    <section className={css.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;
