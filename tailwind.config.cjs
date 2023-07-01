/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["Cascadia Code", "monospace"],
      },
      animation: {
        marquee: "marquee 10s linear infinite",
        marquee2: "marquee2 10s linear infinite",
        bg: "bg 20s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "80%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "80%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(0%)" },
        },
        bg: {
          "0%": { backgroundPosition: "bottom right" },
          "50%": { backgroundPosition: "top left" },
          "100%": { backgroundPosition: "bottom right" },
        },
      },
    },
  },
  plugins: [],
};

module.exports = config;
