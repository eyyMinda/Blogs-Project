import css from "./styles/profile-form.module.css";

function ProfileForm() {
  return (
    <form className={css.form}>
      <div className={css.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" />
      </div>
      <div className={css.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" />
      </div>
      <div className={css.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
