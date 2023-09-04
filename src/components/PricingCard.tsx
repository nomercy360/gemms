import {createSignal, For, Show} from "solid-js";
import {twMerge} from "tailwind-merge";
import ContactField from "./ContactField";


const initial = [
    {id: 1, disabled: true, name: "Deep research", price: 240},
    {id: 2, disabled: false, name: "Math and Modeling", price: 240},
    {id: 3, disabled: false, name: "Data Gathering", price: 240},
    {id: 4, disabled: false, name: "One-pager", price: 240},
    {id: 5, disabled: false, name: "Animation", price: 240},
    {id: 6, disabled: false, name: "Presentation", price: 240},
];

const PricingCard = ({className}: { className?: string }) => {

    const [items, setItems] = createSignal(initial);

    const [selectedIds, setSelectedIds] = createSignal([1, 2]);
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
            <p class='text-white md:text-[40px] text-[20px] md:leading-[40px] leading-[24px]'>≈{formatPrice(total())} for
                a deck</p>
            <p class='text-[#6F6F6F] text-[12px] leading-[16px] mt-2'>The price might change after the interview</p>
            <ul class='mt-4 space-y-3 w-full'>
                <For each={items()}>
                    {(item, index) => (
                        <li class='flex flex-row w-full items-center justify-between'
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
                                    class='md:w-6 md:h-6 h-5 w-5 rounded border-2 border-white flex flex-row items-center justify-center'>
                                    <Show when={selectedIds().includes(item.id)}>
                                        <CheckIcon/>
                                    </Show>
                                </span>
                                <p class='text-white md:text-[16px] md:leading-[24px] text-[12px] leading-[20px]'
                                   style={{'opacity': selectedIds().includes(item.id) ? 1 : 0.5}}>
                                    {item.name}
                                </p>
                            </button>
                            <p class='text-[#6F6F6F] text-[16px] leading-[24px]'>{formatPrice(item.price)}</p>
                        </li>
                    )}
                </For>
            </ul>
            <div class='w-full h-[1px] bg-[#303030] my-5'/>
            <p class='text-[#6F6F6F] md:text-[16px] md:leading-[24px] text-[12px] leading-[20px]'>
                Money-back guarantee. Wire transfer, crypto, or PayPal are accepted.
            </p>
            <ContactField buttonText='Preorder'/>
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