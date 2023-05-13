/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],

  theme: {
    extend: {
      colors: {
        primary: '#fb6710',
        'primary-light': '#ffc077',
        'primary-dark': '#c35100',
        'primary-contrast': '#ffffff',
      },
    },
  },
  plugins: [],
};
