/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#63C1FF",
        secondary: "#FF9F63",
      },
      screens: {
        custom: "820px",
      },
    },
  },
  plugins: [],
};
