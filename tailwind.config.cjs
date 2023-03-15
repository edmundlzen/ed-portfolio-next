/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["Cascadia Code", "monospace"],
      },
    },
  },
  plugins: [],
};

module.exports = config;
