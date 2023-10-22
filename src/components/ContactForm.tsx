import { createSignal } from 'solid-js';
import useContact from '../hooks/useContact';
import { twJoin } from 'tailwind-merge';
import confetti from 'canvas-confetti';

const ContactForm = () => {
  const {
    contact,
    setContact,
    name,
    setName,
    sendContact,
    text,
    setText,
    sent,
  } = useContact();

  const [isLoading, setIsLoading] = createSignal(false);

  const onSubmit = (e: Event) => {
    e.preventDefault();
    if (!sent()) {
      setIsLoading(true);
      sendContact().finally(() => {
        setIsLoading(false);
      });
    }

    if (sent()) {
      confetti({
        particleCount: 1000,
        spread: 90,
        origin: { y: 0, x: 0.5 },
      });
    }
  };

  console.log(text());

  const isDisabled = () => {
    return (
      isLoading() ||
      name().length < 2 ||
      contact().length < 2 ||
      text().length < 2
    );
  };

  const buttonMessage = () => {
    if (sent()) {
      return "Thank you! We'll get in contact with you soon.";
    }

    if (isLoading()) {
      return 'Sending...';
    } else {
      return 'Send us a message';
    }
  };

  return (
    <form
      id="contact-form"
      class="w-full max-w-[600px] rounded-gemms-medium font-arizona"
      onSubmit={onSubmit}
    >
      <div class="rounded-gemms-medium bg-[#F3F3F4] px-5 py-5">
        <div class="space-y-1">
          <p class="text-center text-xl md:text-start md:text-2xl md:font-medium">
            Share your idea
          </p>
          <p class="text-center text-sm opacity-30 md:max-w-[49ch] md:text-start md:text-base">
            We will contact you within the next 24 hours
          </p>
        </div>
        <div class="mt-10 flex flex-col gap-3 text-sm md:gap-4">
          <input
            class="px-3 py-[13px] md:text-base"
            type="fname"
            name="name"
            placeholder="Your name"
            value={name()}
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            class="px-3 py-[13px] md:text-base"
            type="email"
            name="email"
            placeholder="E-mail"
            value={contact()}
            required
            onChange={(e) => {
              setContact(e.target.value);
            }}
          />
          <textarea
            class="min-h-[132px] resize-none px-3 py-[13px] md:text-base"
            placeholder="Share your vision. Tell us what you have now, and what you want to achieve."
            value={text()}
            maxLength={1000}
            required
            onChange={(e) => {
              setText(e.target.value);
            }}
          ></textarea>
          <input
            class={twJoin(
              'w-fit h-[50px] bg-[#11161F] cursor-pointer self-center rounded-full px-4 py-[6px] font-bold text-white mt-1 mb-1 md:self-start md:p-4 md:text-base',
              sent() ? 'bg-[#11161F]' : 'bg-black'
            )}
            type="submit"
            disabled={isDisabled()}
            value={buttonMessage()}
            data-fires-confetti
          />
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
