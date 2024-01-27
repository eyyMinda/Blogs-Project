import { IUser } from "@/nextauth";
import { cn } from "@/lib/utils";
import NewPassword from "./(settings)/new-password";
import DeleteAccount from "./(settings)/delete-account";
import ChangeUsernameForm from "./(settings)/change-username";

export default function Settings({ user }: { user?: IUser }) {
  const { image, name, email, createdAt, needPassword } = user as IUser;

  const settingsFields = [
    {
      description: "Username",
      descriptionClass: "not-italic font-bold",
      component: <ChangeUsernameForm />
    },
    {
      description: "Selecting 'Change Password' allows you to update your account security. Be sure to remember your new credentials for future logins.",
      descriptionClass: "",
      component: <NewPassword needPassword={needPassword} />
    },
    {
      description:
        "Clicking 'Delete Account' will permanently remove your profile and associated data from our system. Please note that this action is irreversible, and you will no longer have access to your account or any related information.",
      descriptionClass: "",
      component: <DeleteAccount email={email} />
    }
  ];

  return (
    <div className="flex flex-col items-start text-start">
      <h2 className="text-3xl text-start">Account Settings</h2>
      <hr className="w-full mt-4" />

      {settingsFields.map((f, i) => (
        <div key={i} className="border-y py-4">
          <p className={cn("italic text-sm lg:text-base", f.descriptionClass)}>{f.description}</p>
          {f.component}
        </div>
      ))}
    </div>
  );
}
