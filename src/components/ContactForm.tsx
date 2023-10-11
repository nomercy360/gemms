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
      class="w-full max-w-[600px] rounded-gemms-medium font-arizona md:px-2"
      onSubmit={onSubmit}
    >
      <div class="rounded-gemms-medium bg-[#F3F3F4] px-5 py-5">
        <div class="space-y-1">
          <p class="text-center text-xl md:text-start md:text-2xl md:font-medium">
            Be next on the list
          </p>
          <p class="text-center text-sm md:max-w-[49ch] md:text-start">
            No-bullshit, data-first, fact-checked and beautiful pitch-deck
            written in the language of numbers
          </p>
        </div>
        <div class="mt-10 flex flex-col gap-3 text-sm md:gap-4">
          <input
            class="px-3 py-[13px] md:text-base"
            type="fname"
            name="name"
            placeholder="Your name"
            value={name()}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            class="px-3 py-[13px] md:text-base"
            type="email"
            name="email"
            placeholder="E-mail, Telegram, IG, or other socials"
            value={contact()}
            onChange={(e) => {
              setContact(e.target.value);
            }}
          />
          <textarea
            class="min-h-[132px] resize-none px-3 py-[13px] md:text-base"
            placeholder="Share your vision. Tell us what you have now, and what you want to achieve."
            value={text()}
            onChange={(e) => {
              setText(e.target.value);
            }}
          ></textarea>
          <input
            class="w-fit cursor-pointer self-center rounded-full bg-black px-4 py-[6px] text-white md:mt-1 md:self-start md:p-4 md:text-base"
            type="submit"
            value="Send us a message"
            data-fires-confetti
          />
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
