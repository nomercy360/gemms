import {createSignal, For, Show} from "solid-js";
import {twMerge} from "tailwind-merge";
import ContactField from "./ContactField";

type Item = {
    id: number,
    disabled: boolean,
    name: string,
    price: number
}

const PricingCard = ({initial, className}: { initial: Item[], className?: string }) => {

    const [items, setItems] = createSignal(initial);

    const [selectedIds, setSelectedIds] = createSignal(items()
        .filter(item => item.disabled).map(item => item.id));

    const calculateTotal = () => {
        return items().filter(item => selectedIds().includes(item.id)).reduce((acc, item) => acc + item.price, 0);
    }

    const [total, setTotal] = createSignal(calculateTotal());

    // 4400 -> 4,400 200 -> 200 etc
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(price);
    }

    return (
        <div id="calculator"
             class={twMerge('flex flex-col items-start justify-start px-4 py-5 bg-white/10', className)}>
            <p class='text-white md:text-[40px] text-[20px] md:leading-[40px] leading-[24px]'>≈{formatPrice(total())}</p>
            <p class='text-[#6F6F6F] text-[12px] leading-[16px] mt-2'>The price might change after the interview</p>
            <ul class='mt-4 space-y-3 w-full'>
                <For each={items()}>
                    {(item, index) => (
                        <li class='flex flex-row w-full gap-2 items-center justify-between text-start'
                            classList={{'opacity-50': item.disabled}}>
                            <button class='flex flex-row items-center space-x-2 cursor-pointer'
                                    classList={{'cursor-not-allowed': item.disabled}}
                                    onClick={() => {
                                        if (item.disabled) return;
                                        if (selectedIds().includes(item.id)) {
                                            setSelectedIds(selectedIds().filter(id => id !== item.id));
                                        } else {
                                            setSelectedIds([...selectedIds(), item.id]);
                                        }

                                        setTotal(calculateTotal());
                                    }}>
                                <span
                                    class='md:w-5 md:h-5 h-4 w-4 rounded border-2 border-white flex flex-row items-center justify-center'
                                    style={{'opacity': selectedIds().includes(item.id) ? 1 : 0.5}}>
                                    <Show when={selectedIds().includes(item.id)}>
                                        <CheckIcon/>
                                    </Show>
                                </span>
                                <p class='text-white text-start md:text-[16px] md:leading-[24px] text-[12px] leading-[20px]'
                                   style={{'opacity': selectedIds().includes(item.id) ? 1 : 0.5}}>
                                    {item.name}
                                </p>
                            </button>
                            <p class='text-[#6F6F6F] md:text-[16px] text-[12px] md:leading-[24px] leading-[20px]'>
                                {item.disabled ? 'Included' : `+${formatPrice(item.price)}`}
                            </p>
                        </li>
                    )}
                </For>
            </ul>
            <div class='w-full h-[1px] bg-[#303030] my-5'/>
            <p class='text-[#6F6F6F] md:text-[16px] md:leading-[24px] text-[12px] leading-[20px]'>
                Money-back guarantee. Wire transfer, crypto, or PayPal are accepted.
            </p>
            <ContactField buttonText='Preorder' placeholderText='Your telegram or email'/>
        </div>
    )

}

const CheckIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill="white">
            <path
                d="m395-406.218 253.826-252.826q14.956-14.957 34.326-14.457t34.327 15.457q14.956 14.957 14.956 34.327 0 19.369-14.956 34.326l-286.87 286.87q-14.957 14.956-35.109 14.956t-35.109-14.956l-117.87-117.87q-14.956-14.957-15.239-34.326-.283-19.37 14.674-34.327 14.957-14.957 34.327-14.957 19.369 0 34.326 14.957L395-406.218Z"/>
        </svg>
    )
}

export default PricingCard;