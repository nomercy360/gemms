import {createSignal} from "solid-js";

const useContact = () => {
    const [email, setEmail] = createSignal('');
    const [sent, setSent] = createSignal(false);

    const sendEmail = async () => {
        const response = await fetch('/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email()})
        });

        if (response.status !== 200) {
            console.error(response);
            return;
        } else {
            setSent(true);
        }
    }

    return {
        email,
        setEmail,
        sent,
        sendEmail
    };
}

export default useContact;
