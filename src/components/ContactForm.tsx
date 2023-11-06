import { createSignal } from 'solid-js';
import useContact from '../hooks/useContact';
import { twJoin } from 'tailwind-merge';

const ContactForm = ({ children }: { children: Element }) => {
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
      return 'Leave a request';
    }
  };

  return (
    <form
      id="contact-form"
      class="w-full rounded-gemms-medium font-arizona md:col-span-2"
      onSubmit={onSubmit}
    >
      <div class="rounded-gemms-medium bg-gemms-dark px-5 py-5 md:flex md:flex-row md:justify-between md:gap-[100px]">
        <div class="space-y-1 md:flex-1 md:space-y-3">
          {children}
          <p class="text-center text-2xl leading-[28px] text-white md:text-start md:text-[44px] md:font-medium md:leading-[48px]">
            Leave a request in a free form. Get a result in three business days
          </p>
          <p class="text-center text-sm text-white/30 md:max-w-[49ch] md:text-start md:text-xl">
            Typically, if your task is not extensive, it will take us 2-3 days
            to complete. However, if you have a larger project in mind, we will
            reach out to you and break it down into smaller tasks.
          </p>
        </div>
        <div class="mt-10 flex flex-col gap-3 text-sm md:mt-[revert] md:flex-1 md:gap-4">
          <input
            class="rounded-gemms-medium px-3 py-[13px] md:text-base"
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
            class="rounded-gemms-medium px-3 py-[13px] md:text-base"
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
            class="min-h-[132px] resize-none rounded-gemms-medium px-3 py-[13px] md:min-h-[240px] md:text-base"
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
              'mb-1 mt-1 h-[50px] w-fit cursor-pointer self-center rounded-full bg-[#11161F] px-4 py-[6px] font-bold text-gemms-dark  md:self-start md:p-4 md:text-base md:leading-4',
              sent() ? 'bg-[#11161F]' : 'bg-white'
            )}
            type="submit"
            disabled={isDisabled()}
            value={buttonMessage()}
          />
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
