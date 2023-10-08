import useContact from '../hooks/useContact';

const ContactForm = () => {
  const { contact, setContact, name, setName, sendContact, text, setText } =
    useContact();

  const onSubmit = (e: Event) => {
    e.preventDefault();

    sendContact();
  };

  return (
    <form
      id="contact-form"
      class="rounded-gemms-medium bg-[#F3F3F4] px-5 py-5"
      onSubmit={onSubmit}
    >
      <div class="space-y-1">
        <p class="text-center text-xl md:text-start md:font-medium">
          Be next on the list
        </p>
        <p class="text-center text-sm md:text-start">
          No-bullshit, data-first, fact-checked and beautiful pitch-deck written
          in the language of numbers
        </p>
      </div>
      <div class="mt-10 flex flex-col gap-3 text-sm">
        <input
          class="px-3 py-[13px]"
          type="fname"
          name="name"
          placeholder="Your name"
          value={name()}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          class="px-3 py-[13px]"
          type="email"
          name="email"
          placeholder="E-mail, Telegram, IG, or other socials"
          value={contact()}
          onChange={(e) => {
            setContact(e.target.value);
          }}
        />
        <textarea
          class="min-h-[132px] resize-none px-3 py-[13px]"
          placeholder="Share your vision. Tell us what you have now, and what you want to achieve."
          value={text()}
          onChange={(e) => {
            setText(e.target.value);
          }}
        ></textarea>
        <input
          class="w-fit self-center rounded-full bg-black px-4 py-[6px] text-white"
          type="submit"
          value="Send"
          data-fires-confetti
        />
      </div>
    </form>
  );
};

export default ContactForm;
