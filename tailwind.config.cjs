/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'gemms-dark': '#11161F',
      },
      borderRadius: {
        'gemms-medium': '4px',
      },
      fontFamily: {
        arizona: '"Arizona Plus", sans-serif',
      },
    },
  },
  plugins: [],
};
