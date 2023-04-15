/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#fb6710",
        "primary-light": "#ffc077",
        "primary-dark": "#c35100",
        "primary-contrast": "#ffffff",
        secondary: "#008080",
        "secondary-light": "#4ac5c5",
        "secondary-dark": "#004d4d",
        "secondary-contrast": "#ffffff",
      },
    },
  },
  plugins: [],
};
