import { createSignal, For } from 'solid-js';

const TestimonialCard = () => {
  const testimonies = [
    {
      name: 'Sergey F',
      photo: '/people/sergey_f.webp',
      testimony:
        'Working with Gemss is a great way to develop a vision for the future, bring about a revolution, and take the next step.',
    },
  ];

  const [current, setCurrent] = createSignal(0);

  const tick = () => {
    setCurrent(current() + 1 === testimonies.length ? 0 : current() + 1);
  };

  let timer = setInterval(tick, 500000);

  const changeImage = (id: number) => {
    clearInterval(timer);
    setCurrent(id);
    timer = setInterval(tick, 5000);
  };

  return (
    <div class="-mb-1 max-w-[600px] font-arizona">
      <div class="flex h-full flex-col justify-between rounded-gemms-medium bg-gemms-dark pb-8 pl-5 pr-6 pt-5">
        <div class="flex flex-row gap-1">
          <For each={testimonies}>
            {(person, idx) => {
              return (
                <img
                  src={person.photo}
                  width={80}
                  height={120}
                  onClick={() => changeImage(idx())}
                  class={`max-h-[120px] max-w-[80px] cursor-pointer rounded-gemms-medium object-cover grayscale transition-all duration-500 ${
                    current() === idx() ? 'opacity-100' : 'opacity-40'
                  }`}
                />
              );
            }}
          </For>
        </div>
        <div class="mt-16 flex flex-col gap-1">
          <p class="text-sm text-white/40 transition-all">
            {testimonies[current()].name}
          </p>
          <p class="text-lg leading-6 -tracking-[-0.006em] text-white transition-all">
            {testimonies[current()].testimony}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
