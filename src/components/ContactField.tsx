import {createSignal, Match, onCleanup, Switch} from "solid-js";
import useContact from "../hooks/useContact.ts";

const ContactField = ({buttonText}: { buttonText: string }) => {
    const {email, setEmail, sent, sendEmail} = useContact();

    return (
        <form class="flex flex-row items-center justify-between rounded-[52px] bg-[#121212] py-2.5 pr-2.5 pl-4 mt-8 w-full"
              onSubmit={(e) => {
                  e.preventDefault();
                  sendEmail();
              }}>
            <input placeholder='Your telegram or email'
                   onInput={(e) => setEmail(e.currentTarget.value)}
                   class="bg-transparent placeholder:text-[#A6A6A6] w-full text-white text-[16px] leading-[20px] focus:outline-none"/>
            <Switch>
                <Match when={sent()}>
                    <div
                        class="flex flex-row items-center justify-center gap-2 text-[#528F30] text-[16px] leading-[20px] rounded-[50px] focus:outline-none bg-[#7ED94B] px-3 h-[36px]">
                        Sent
                        <CheckMark/>
                    </div>
                </Match>
                <Match when={!sent()}>
                    <button class="rounded-[50px] bg-white/5 text-white px-3 h-[36px] backdrop-blur-md"
                            onClick={sendEmail}
                            type="submit">
                        {buttonText}
                    </button>
                </Match>
            </Switch>
        </form>
    );
}

const CheckMark = () => {
    return (
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M17.2835 0.701364C17.5722 0.96985 17.5722 1.40515 17.2835 1.67364L6.93569 11.2986C6.64704 11.5671 6.17905 11.5671 5.8904 11.2986L0.716486 6.48614C0.427838 6.21765 0.427838 5.78235 0.716486 5.51386C1.00513 5.24538 1.47313 5.24538 1.76177 5.51386L6.41304 9.84023L16.2382 0.701364C16.5269 0.432879 16.9949 0.432879 17.2835 0.701364Z"
                  fill="#528F30"/>
        </svg>
    )
}

export default ContactField;