import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#110712",
        plum: "#2a0b2f",
        wine: "#4b123f",
        rose: "#f3a1c8",
        lilac: "#c7a0ff",
        pearl: "#fff2fb"
      },
      fontFamily: {
        display: ["Cormorant Garamond", "Bodoni 72", "Didot", "Georgia", "serif"],
        sans: ["Inter", "Satoshi", "Avenir Next", "Segoe UI", "sans-serif"]
      },
      boxShadow: {
        bloom: "0 0 80px rgba(243, 161, 200, 0.24)"
      }
    }
  },
  plugins: []
};

export default config;
