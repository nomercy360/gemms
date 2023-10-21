import { createSignal } from "solid-js";
import confetti from 'canvas-confetti';

const useContact = () => {
  const [contact, setContact] = createSignal("");
  const [name, setName] = createSignal("");
  const [text, setText] = createSignal("");

  const [sent, setSent] = createSignal(false);

  const sendContact = async () => {
    const response = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contact: contact(), name: name(), text: text() }),
    });

    if (response.status !== 200) {
      return;
    } else {
      setSent(true);
      confetti({
        particleCount: 1000,
        spread: 180,
        origin: { y: 0, x: 0.5 }
      });
    }
  };

  return {
    contact,
    setContact,
    name,
    setName,
    text,
    setText,
    sent,
    sendContact,
  };
};

export default useContact;
