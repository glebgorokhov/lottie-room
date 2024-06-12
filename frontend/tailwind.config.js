import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,css}"],
  theme: {
    extend: {
      colors: {
        t: {
          bg: "rgb(var(--color-bg) / <alpha-value>)",
          text: "rgb(var(--color-text) / <alpha-value>)",
          "text-light": "rgb(var(--color-text-light) / <alpha-value>)",
          border: "rgb(var(--color-border) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["Karla", "sans-serif"],
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant("not-first", "&:not(:first-child)");
      addVariant("not-last", "&:not(:last-child)");
    }),
  ],
};
