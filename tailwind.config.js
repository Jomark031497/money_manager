/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],

  theme: {
    extend: {
      colors: {
        secondary: {
          DEFAULT: '#3b82f6',
          light: '#60a5fa',
          dark: '#2563eb',
        },
      },
    },
  },
  plugins: [],
};
