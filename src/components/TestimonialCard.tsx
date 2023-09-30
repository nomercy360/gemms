import { createSignal, createEffect, from, For } from 'solid-js';

const TestimonialCard = () => {
  const people = ['/people/bek.png', '/people/bek.png'];

  const testimonies = [
    {
      name: 'Nikita A.',
      photo: '/people/bek.png',
      testimony:
        'Everything is under one payments. Hire a top-notch team of designers and engineers for a fixed monthly payment and work with them one-on-one.',
    },
    {
      name: 'Max Powers',
      photo: '/people/bek.png',
      testimony:
        'Gemms group is the prime example of professionalism, creativity and efficancy. You will have a hard time finding anyone better.',
    },
  ];

  const [current, setCurrent] = createSignal(0);

  const tick = () => {
    setCurrent(current() + 1 === testimonies.length ? 0 : current() + 1);
  };

  let timer = setInterval(tick, 5000);

  const changeImage = (id: number) => {
    clearInterval(timer);
    setCurrent(id);
    timer = setInterval(tick, 5000);
  };

  return (
    <div class="bg-gemms-dark rounded-gemms-medium flex flex-col justify-between pb-8 pl-5 pr-6 pt-5">
      <div class="flex flex-row gap-1">
        <For each={testimonies}>
          {(person, idx) => {
            return (
              <img
                src={person.photo}
                width={80}
                height={120}
                onClick={() => changeImage(idx())}
                class={`rounded-gemms-medium max-h-[120px] max-w-[80px] cursor-pointer object-cover transition-all duration-500 ${
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
        <p class="text-lg leading-6 text-white transition-all">
          {testimonies[current()].testimony}
        </p>
      </div>
    </div>
  );
};

export default TestimonialCard;
