import css from "./styles/contact-form.module.css";

export default function ContactForm() {
  // const handleSubmit = e => {};

  return (
    <section className={css.contact}>
      <h1>Contact Me</h1>
      <form className={css.form}>
        <div className={css.controls}>
          <div className={css.control}>
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" />
          </div>
          <div className={css.control}>
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" />
          </div>
        </div>

        <div className={css.control}>
          <label htmlFor="message">Your Message</label>
          <textarea id="message" rows="2"></textarea>
        </div>
        <div className={css.actions}>
          <button type="submit">Send Message</button>
        </div>
      </form>
    </section>
  );
}
