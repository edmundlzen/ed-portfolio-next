/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B0D0C",
        surface: "#111413",
        raised: "#171B19",
        line: "rgba(228,233,228,0.09)",
        fg: "#E4E9E4",
        muted: "#96A09A",
        faint: "#5C6660",
        accent: "#6EE7A0",
      },
      fontFamily: {
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      animation: {
        blink: "blink 1.1s step-end infinite",
        marquee: "marquee 10s linear infinite",
        marquee2: "marquee2 10s linear infinite",
        bg: "bg 20s ease-in-out infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
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
