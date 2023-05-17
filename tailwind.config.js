/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],

  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#ff8000"
        },
        secondary: {
          DEFAULT: '#ff9800',
        },
      },
    },
  },
  plugins: [],
};
