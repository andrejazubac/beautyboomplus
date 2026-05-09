import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        plum: "rgb(var(--color-plum) / <alpha-value>)",
        wine: "rgb(var(--color-wine) / <alpha-value>)",
        rose: "rgb(var(--color-rose) / <alpha-value>)",
        lilac: "rgb(var(--color-lilac) / <alpha-value>)",
        pearl: "rgb(var(--color-pearl) / <alpha-value>)"
      },
      fontFamily: {
        display: ["Cormorant Garamond", "Bodoni 72", "Didot", "Georgia", "serif"],
        sans: ["Inter", "Satoshi", "Avenir Next", "Segoe UI", "sans-serif"]
      },
      boxShadow: {
        bloom: "0 0 80px rgb(var(--color-rose) / 0.24)"
      }
    }
  },
  plugins: []
};

export default config;
