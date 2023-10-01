import { createSignal } from "solid-js";

const useContact = () => {
  const [contact, setContact] = createSignal("");
  const [sent, setSent] = createSignal(false);

  const sendContact = async () => {
    const response = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contact: contact() }),
    });

    if (response.status !== 200) {
      console.error(response);
      return;
    } else {
      setSent(true);
    }
  };

  return {
    contact,
    setContact,
    sent,
    sendContact,
  };
};

export default useContact;
